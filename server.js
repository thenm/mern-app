const express = require('express');
const mongoose = require('mongoose');

const books = require('./routes/api/books.js')
const users = require('./routes/api/users.js')
const auth = require('./routes/api/auth.js')
const app = express();
const config = require('config');

app.use(express.json());

// Database Configuration
const db = config.get('mongoURI')

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Mongo Connected.....👍'))
    .catch((err)=> console.log(err));

// API routes
app.use('/api/books', books);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port + '👍'))