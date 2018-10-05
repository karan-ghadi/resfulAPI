const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res, next) => {
	User.find()
		.exec()
		.then(d => {
			res.status(201).json({
				users: d
			});
		})
		.catch(e => {
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
		.catch(e => {
			res.status(404).json({
				message: 'something went wrong'
			});
		});
});

router.post('/', (req, res, next) => {
	var data = req.body;
	var user = new User({
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
					.catch(err => {
						res.status(404).json({
							message: err
						});
					});
			}
		})
		.catch(e => {
			res.status(404).json({
				message: err
			});
		})
});

router.delete('/:userId', (req, res, next) => {
	const id = req.params.userId;
	User.findById(id)
		.exec()
		.then(result => {
			if (result === null) {
				res.status(404).json({
					message: 'User not Found'
				});
			} else {
				User.deleteOne({
						_id: id
					})
					.exec()
					.then(result => {
						console.log(result);
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

module.exports = router;