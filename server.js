const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const books = require('./routes/api/books.js')

const app = express();

app.use(bodyParser.json());

// Database Configuration
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Mongo Connected.....👍'))
    .catch((err)=> console.log(err));

// API routes
app.use('/api/books', books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port + '👍'))