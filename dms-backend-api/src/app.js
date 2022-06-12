const express = require('express'); 
const router = require('./routes/index');

const app = express(); 

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5050; 

app.get('/', (req, res) => { 
	res.send('<h2>It\'s Working!</h2>'); 
}); 

app.use('/api/v1', router);
app.use((req, res, next) => {
	const error = new Error('Url Not Found');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});


app.listen(PORT, () => { 
	console.log(`API is listening on port ${PORT}`); 
});