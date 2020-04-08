const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//const auth = require('../../middleware/auth');

// VUser Model

const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // SImple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // Check for existing user // email is the same as email: email
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password
            });
            
            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({ 
                                        // 'api/users' endpoint payload:
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
});

/*router.get('/:user', (req, res) => {
    const

    User.findOne({ user })
        .then(user => user.remove())
})

// Delete user
router.delete('/:user', (req, res) => {
    User.find
})*/
  

module.exports = router;