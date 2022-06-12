const { FolderClient } = require('../utils/clients');
const { getErrorCode } = require('../utils/errorCode');

/**
 * Method for getting folders by user
 */
const getFoldersByUser = (req, res) => {
	FolderClient.getFoldersByUser({userId: req.user}, (error, result) => {
		console.log(result);
		if(error) {
			res.status(getErrorCode(error.code));
			res.json({
				error: {
					message: error.message
				}
			});
		}
		res.send(result.folders);
	});

};

/**
 * Method for creating a new folder
 */
const createFolder = (req, res) => {
	if(!req.body.name){
		res.status(400);
		return res.send({
			error: {
				message: 'Bad Request: Please make sure name is in the payload'
			}
		});
	}
	FolderClient.createFolder({name: req.body.name, user: req.user}, (error, result) => {
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
 * Method for getting files in a folder
 */
const getFilesInFolder = (req, res) => {
	FolderClient.getFilesInFolder({id: req.params.id, userId: req.user}, (error, result) => {
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


/**
 * Method for updating a new folder 
 */
const updateFolder = (req, res) => {
	if(!req.body.name){
		res.status(400);
		return res.send({
			error: {
				message: 'Bad Request: Please make sure name in the payload'
			}
		});
	}
	FolderClient.updateFolder({id: req.params.id, userId: req.user, name: req.body.name }, (error, result) => {
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
 * Method for deleting a new folder
 */
const deleteFolder = (req, res) => {
	FolderClient.deleteFolder({id: req.params.id, userId: req.user}, (error , result ) => {
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
	getFoldersByUser,
	createFolder,
	updateFolder,
	deleteFolder,
	getFilesInFolder
};