const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const app = express();

// mongoose
// mongoose.connect('localhost:27017/restapi', {
// 	useNewUrlParser: true
// });

mongoose.connect('mongodb://localhost:27017/restapi', {
	useNewUrlParser: true
});

// morgan
app.use(morgan('dev'));

// body parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// setting headers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === 'OPTIONS') {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
		next();
	}
})

// api calls
app.use('/api/v1/users', userRoute);

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	})
})


module.exports = app;