const mongoose = require('../db');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
