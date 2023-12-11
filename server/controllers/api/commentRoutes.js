const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            date_posted: req.body.date_posted,
            author: req.session.user_id,
            associatedPost: req.body.associatedPost,
        });
        res.redirect('/feed');
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
