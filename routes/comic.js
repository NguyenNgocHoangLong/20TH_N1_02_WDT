const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');
const Comment = require('../models/Comment');


// Display form for adding comic
router.get('/add_comic', (req, res) => {
    res.render('add_comic');
});

// CK/routes/comic.js
router.get('/list_comic/:id', async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).send('Comic not found.');
        }
        const comments = await Comment.find({ comicId: comic._id }).sort({ createdAt: -1 });
        res.render('comic_info', { comic, comments });
    } catch (err) {
        console.error('Error while fetching comic or comments:', err);
        res.status(500).send('Error: ' + err);
    }
});



// Handle comic addition
router.post('/add_comic', (req, res) => {
    const { title, description, image, views } = req.body;
    const newComic = new Comic({ title, description, image, views });

    newComic.save()
        .then(() => res.redirect('/add_comic?inserted=true'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// List comics
router.get('/list_comic', (req, res) => {
    Comic.find()
        .then(comics => {
            console.log(comics); // Add this line to see what is being passed to the view
            res.render('list_comic', { comics });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/comment/:comicId', async (req, res) => {
    try {
        const { comment } = req.body;
        const { comicId } = req.params;

        const newComment = new Comment({
            comicId,
            text: comment,
            createdAt: new Date()
        });

        await newComment.save();
        res.redirect(`/list_comic/${comicId}`);
    } catch (error) {
        console.error('Failed to save comment:', error);
        res.status(500).send('Error in saving comment.');
    }
});

router.post('/add_comment', async (req, res) => {
    try {
        const { comicId, text } = req.body;
        const newComment = new Comment({ comicId, text });
        await newComment.save();
        res.redirect('/list_comic/' + comicId); // Quay lại trang của truyện đó
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Error: ' + err);
    }
});

module.exports = router;
