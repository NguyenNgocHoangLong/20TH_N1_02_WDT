const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const comicRoutes = require('./routes/comic');
const genreRoutes = require('./routes/genre');
const authRoutes = require('./routes/auth');
app.use(authRoutes);
app.use(comicRoutes);
app.use(genreRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'CK/images')));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
