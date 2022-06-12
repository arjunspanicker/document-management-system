const { UserClient } = require('../utils/clients');
const { getErrorCode } = require('../utils/errorCode');

/**
 * Method for creating new user
 */
const getUsers = (req, res)=> {
	UserClient.getAllUser({}, (error, result) => {
		console.log(result);
		if(error) {
			res.status(getErrorCode(error.code));
			res.json({
				error: {
					message: error.message
				}
			});
		}
		res.send(result.users);
	});
};

/**
 * Method for getting a user
 */
const getUser = (req, res) => {
	UserClient.getUser({id: req.params.id}, (error, result) => {
		console.log(result);
		if(error) {
			res.status(getErrorCode(error.code));
			res.json({
				error: {
					message: error.message
				}
			});
		}
		res.send(result);
	});
};

/**
 * Method for creating a user
 */

const createUser = (req, res) => {
	if(!req.body.email || !req.body.password || !req.body.name){
		res.status(400);
		return res.send({
			error: {
				message: 'Bad Request: Please make sure email, password and name are in payload'
			}
		});
	}
	UserClient.createUser(req.body, (error, result) => {
		if(error) {
			res.status(getErrorCode(error.code));
			res.json({
				error: {
					message: error.message
				}
			});
		}
		res.send(result);
	});
};

/**
 * Method for user login
 */
const userLogin = (req, res) => {
	if(!req.body.email || !req.body.password){
		res.status(400);
		return res.send({
			error: {
				message: 'Bad Request: Please make sure email, password and name are in payload'
			}
		});
	}
	UserClient.userLogin(req.body, (error, result) => {
		if(error) {
			res.status(getErrorCode(error.code));
			res.json({
				error: {
					message: error.message
				}
			});
		}
		res.send(result);
	});
};

module.exports =  {
	getUsers,
	getUser,
	createUser,
	userLogin
};