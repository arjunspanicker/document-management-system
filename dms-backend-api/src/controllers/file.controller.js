const { FileClient } = require('../utils/clients');
const { getErrorCode } = require('../utils/errorCode');

const getFilesByUser = (req, res) => {
	FileClient.getFilesByUser({userId: req.user}, (error, result) => {
		console.log(result);
		if(error) {
			res.status(getErrorCode(error.code));
			res.json({
				error: {
					message: error.message
				}
			});
		}
		res.send(result.files);
	});
};

const createFile = (req, res) => {
	if(!req.body.name){
		res.status(400);
		return res.send({
			error: {
				message: 'Bad Request: Please make sure name is in the payload'
			}
		});
	}
	const payload = req.body;
	FileClient.createFile({...payload, user:req.user}, (error, result) => {
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

const updateFile = (req, res) => {
	if (!(req.body.name || req.body.content || req.body.folder)) {
		res.status(400);
		return res.send({
			error: {
				message: 'Bad Request: Please make sure payload is correct'
			}
		});
	}
	FileClient.updateFile({...req.body, id: req.params.id, userId: req.user}, (error, result) => {
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

const deleteFile = (req, res) => {
	FileClient.deleteFile({id: req.params.id, userId: req.user}, (error, result) => {
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

module.exports = {
	getFilesByUser,
	createFile,
	updateFile,
	deleteFile
};