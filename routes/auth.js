// CK/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Route to show registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to show login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Username not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        res.send('Logged in successfully <a href="/list_comic">View Comics</a>');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
