const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

router.get('/list_genre', (req, res) => {
    Genre.find()
        .then(genres => {
            res.render('list_genre', { genres });
        })
        .catch(err => {
            console.error('Error while fetching genres:', err);
            res.status(500).json('Error: ' + err);
        });
});

module.exports = router;
