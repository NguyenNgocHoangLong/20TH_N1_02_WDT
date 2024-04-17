const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');
const Comment = require('../models/Comment');
const fs = require('fs');
const path = require('path');

router.get('/add_comic', (req, res) => {
    res.render('add_comic');
});

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

router.get('/comic/:id/chapter/:chapter', async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).send('Comic not found');
        }
        const chapterPath = path.join(__dirname, '../CK/images', comic.title.replace(/ /g, ''), 'chap' + req.params.chapter);
        fs.readdir(chapterPath, (err, files) => {
            if (err) {
                return res.status(500).send('Failed to load images');
            }
            res.render('chapter', { images: files.map(file => path.join('/images', comic.title.replace(/ /g, ''), 'chap' + req.params.chapter, file)), title: comic.title });
        });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.post('/add_comic', (req, res) => {
    const { title, description, image, views } = req.body;
    const newComic = new Comic({ title, description, image, views });

    newComic.save()
        .then(() => res.redirect('/add_comic?inserted=true'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.get('/list_comic', (req, res) => {
    Comic.find()
        .then(comics => {
            console.log(comics);
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
        res.redirect('/list_comic/' + comicId);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Error: ' + err);
    }
});

module.exports = router;
