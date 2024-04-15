const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');

// Display form for adding comic
router.get('/add_comic', (req, res) => {
    res.render('add_comic');
});

// CK/routes/comic.js
router.get('/list_comic/:id', (req, res) => {
    console.log(req.params.id); // Check if ID is correctly received
    Comic.findById(req.params.id)
        .then(comic => {
            if (!comic) {
                return res.status(404).send('Comic not found.');
            }
            res.render('comic_info', { comic });
        })
        .catch(err => {
            console.error('Error while fetching comic:', err);
            res.status(500).send('Error: ' + err);
        });
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

module.exports = router;
