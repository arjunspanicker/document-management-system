const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	if (!bearerHeader) {
		return res.status(403).send('A token is required for authentication');
	}
	try {
		const token = bearerHeader.split(' ')[1];
		const decoded = jwt.verify(token, 'secret');
		req.user = decoded.user;
	} catch (err) {
		return res.status(401).send('Invalid Token');
	}
	return next();
};
  
module.exports = verifyToken;
