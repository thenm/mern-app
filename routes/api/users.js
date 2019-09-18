const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

router.post('/', (req, res) => {
	const { name, email, password } = req.body;

	// Fields check
	if (!name || !email || !password) {
		return res.bcryptstatus(400).json({ msg: 'Please enter all fields' });
	}

	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ msg: 'User already exists' });
		const newUser = new User({
			name,
			email,
			password
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then(user => {
					jwt.sign(
						{ id: user.id },
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									name: user.name,
									email: user.email
								}
							});
						}
					);
				});
			});
		});
	});
});

// router.post('/', (req, res)=> {
//     const newBook = new Book({
//         name: req.body.name
//     });
//     newBook.save().then(book => res.json(book));
// })

// router.delete('/:id', (req, res)=> {
//     Book.findById(req.params.id)
//         .then(book => book.remove().then(()=> res.json({success: true})))
//         .catch(err => {
//             console.log(err);
//             return res.status(404).json({ succes: false });
//         });
// })
module.exports = router;
