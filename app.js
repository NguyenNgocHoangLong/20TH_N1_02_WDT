const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Import routes
const comicRoutes = require('./routes/comic');
const genreRoutes = require('./routes/genre');
const authRoutes = require('./routes/auth');
app.use(authRoutes);
app.use(comicRoutes);
app.use(genreRoutes);
// Add a new route for the root URL
app.get('/', (req, res) => {
    // Redirect to the add comic page
    //res.redirect('/add_comic');
    res.redirect('/list_comic');
    //res.redirect('/list_genre');
    //res.send('Welcome to the Comic Book Store! <a href="/list_comic">View Comics</a>');
    //res.send('Welcome to the Comic Book Store! <a href="/comics">Xem Truyện Tranh</a>');
    // Or just render a simple welcome message
    //res.send('Welcome to the Comic Book Store!');
    
});
app.use(express.static('CK/images'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
