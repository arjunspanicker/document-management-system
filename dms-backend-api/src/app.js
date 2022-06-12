const express = require('express'); 
const router = require('./routes/index');
const config = require('./config/config');

const app = express(); 
app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body


//routes
app.get('/', (req, res) => { 
	res.send('<h2>It\'s Working!</h2>'); 
}); 
app.use('/api/v1', router);

// to return 404 for invalid routes
app.use((req, res, next) => {
	const error = new Error('Url Not Found');
	error.status = 404;
	next(error);
});
// handle error and return 500 for unknown erros
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});


app.listen(config.port, () => { 
	console.log(`API is listening on port ${config.port}`); 
});