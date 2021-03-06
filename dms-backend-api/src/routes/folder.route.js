const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFoldersByUser, createFolder, updateFolder, deleteFolder, getFilesInFolder, getFolderById } = require('../controllers/folder.controller');

router
	.route('/')
	.get(auth, getFoldersByUser)
	.post(auth, createFolder);
router
	.route('/:id')
	.get(auth, getFolderById)
	.put(auth, updateFolder)
	.delete(auth, deleteFolder);
router
	.route('/files/:id')
	.get(auth, getFilesInFolder);

module.exports = router;