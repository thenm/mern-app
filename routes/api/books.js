const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Book = require('../../models/Book');

router.get('/', (req, res)=> {
    Book.find()
        .sort({ date: -1 })
        .then(books => res.json(books));
})

router.post('/', auth, (req, res)=> {
    const newBook = new Book({
        name: req.body.name
    });
    newBook.save().then(book => res.json(book));
})

router.delete('/:id', (req, res)=> {
    Book.findById(req.params.id)
        .then(book => book.remove().then(()=> res.json({success: true})))
        .catch(err => {
            console.log(err);
            return res.status(404).json({ succes: false });
        });
})
module.exports = router;