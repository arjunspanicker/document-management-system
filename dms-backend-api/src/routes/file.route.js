const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFilesByUser, createFile, updateFile, deleteFile, getFileById } = require('../controllers/file.controller');

router
	.route('/')
	.get(auth, getFilesByUser)
	.post(auth, createFile);

router
	.route('/:id')
	.get(auth, getFileById)
	.put(auth, updateFile)
	.delete(auth, deleteFile);


module.exports = router;