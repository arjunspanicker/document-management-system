const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, getUser, createUser, userLogin, getRootFilesAndFolder } = require('../controllers/user.controller');

router
	.route('/')
	.get(auth,getUsers);
router
	.route('/register')
	.post(createUser);
router
	.route('/:id')
	.get(auth, getUser);
router
	.route('/login')
	.post(userLogin);
router
	.route('/resources/all')
	.get(auth, getRootFilesAndFolder);

module.exports = router;