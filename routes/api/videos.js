const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Video Model

const Video = require('../../models/Video');

// @route GET api/videos
// @desc GET All Videos
// @access Public
router.get('/', (req, res) => {
    Video.find()
        .sort({ date: -1 })
        .then(videos => res.json(videos))
});

// @route POST api/videos
// @desc Create A Video
// @access Private
router.post('/', auth, (req, res) => {
    const newVideo = new Video({
        videoId: req.body.videoId,
        user: req.body.user
    });

    newVideo.save().then(video => res.json(video));
});

// @route DELETE api/videos
// @desc Delete A Video
//@access Private
router.delete('/:id', auth, (req, res) => {
    Video.findById(req.params.id)
        .then(video => video.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});
        

module.exports = router;