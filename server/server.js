const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// handle parsing request body
app.use(express.json()); // parses body EXCEPT html
app.use(express.urlencoded({ extended: true })); // parses html

// handle static serve
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// serve index.html on the route for /create
app.get('/create', (req, res) => {
	return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

// handle api router
app.use('/api', apiRouter);

// handle all route handler error for reqs (404)
app.use((req, res) => res.status(404).send('this is not the right page'));

// global error
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// listen for port & connect mongoose db
app.listen(3000, async () => {
	console.log('Server started listening on port: 3000');
	try {
		// console.log(process.env.MONGO_URI);
		await mongoose.connect(process.env.MONGO_URI, {});
		console.log('Connected to Mongo DB.');
	} catch (error) {
		console.log(error);
	}
});

module.exports = app;
