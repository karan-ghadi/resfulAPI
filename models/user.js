const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	userName: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	}
});

module.exports = mongoose.model('User', userSchema);