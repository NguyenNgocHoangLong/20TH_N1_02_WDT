const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/ql_trang_truyen';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err));

module.exports = mongoose;
