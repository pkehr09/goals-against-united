const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

// VUser Model

const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // SImple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    // Check for existing user // email is the same as email: email
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

        
            
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(404).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 1209600 },
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
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});
  

module.exports = router;