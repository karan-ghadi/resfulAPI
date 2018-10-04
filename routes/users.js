const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'user get request'
	});
});

router.post('/', (req, res, next) => {
	var data = req.body;
	var user = new User({
		_id: new mongoose.Types.ObjectId(),
		firstName: data.firstName,
		lastName: data.lastName,
		userName: data.userName
	})

	user.save().then((result => {
		res.status(201).json({
			message: 'User created successfully!..',
			user: user
		});
	})).catch((err) => {
		res.status(404).json({
			message: err
		});
	})

});

router.delete('/:userId', (req, res, next) => {
	res.status(200).json({
		message: 'user deleted'
	});
});

module.exports = router;