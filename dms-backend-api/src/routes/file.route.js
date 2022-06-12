const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFilesByUser, createFile, updateFile, deleteFile } = require('../controllers/file.controller');

router
	.route('/')
	.get(auth, getFilesByUser)
	.post(auth, createFile);

router
	.route('/:id')
	.put(auth, updateFile)
	.delete(auth, deleteFile);


module.exports = router;