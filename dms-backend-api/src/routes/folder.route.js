const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFoldersByUser, createFolder, updateFolder, deleteFolder } = require('../controllers/folder.controller');

router
	.route('/')
	.get(auth, getFoldersByUser)
	.post(auth, createFolder);
router
	.route('/:id')
	.put(auth, updateFolder)
	.delete(auth, deleteFolder);

module.exports = router;