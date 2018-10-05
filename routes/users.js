const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();

//Get user
router.get('/', (req, res, next) => {
	User.find()
		.exec()
		.then(d => {
			res.status(201).json({
				users: d
			});
		})
		.catch(err => {
			res.status(404).json({
				message: 'no records available'
			});
		});
});

router.get('/:userId', (req, res, next) => {
	const id = req.params.userId;
	User.findOne({
			_id: id
		})
		.exec()
		.then(d => {
			if (d === null) {
				res.status(201).json({
					message: 'no user available'
				});
			} else {
				res.status(201).json({
					users: d
				});
			}
		})
		.catch(err => {
			res.status(404).json({
				message: 'something went wrong'
			});
		});
});

// Add user
router.post('/', (req, res, next) => {
	const data = req.body;
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		firstName: data.firstName,
		lastName: data.lastName,
		userName: data.userName
	});
	User.findOne({
			userName: data.userName
		})
		.exec()
		.then(d => {
			if (d) {
				res.status(400).json({
					message: 'username already used'
				});
			} else {
				user
					.save()
					.then(result => {
						res.status(201).json({
							message: 'User created successfully!..',
							user: user
						});
					})
			}
		})
		.catch(e => {
			res.status(404).json({
				message: err
			});
		})
});

// Delete user
router.delete('/:userId', (req, res, next) => {
	const id = req.params.userId;
	User.findById(id)
		.exec()
		.then(d => {
			if (d === null) {
				res.status(404).json({
					message: 'User not Found'
				});
			} else {
				User.deleteOne({
						_id: id
					})
					.exec()
					.then(d => {
						res.status(200).json({
							message: 'user deleted with id ' + id
						});
					})
					.catch(err => {
						console.log(err);
						res.status(200).json({
							message: err
						});
					});
			}
		})
		.catch(err => {
			res.status(404).json({
				message: err
			});
		});
});

// update user
router.patch('/:username', (req, res, next) => {
	const username = req.params.username;
	console.log(username);
	User.findOne({
			userName: username.toLowerCase()
		})
		.exec()
		.then(d => {
			if (d) {
				res.status(404).json({
					message: 'username already used'
				});
			} else {
				res.status(404).json({
					message: 'username not found'
				});
			}
		})
		.catch(err => {
			res.status(404).json({
				message: err
			});
		})
})
module.exports = router;