const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, getUser, createUser, userLogin } = require('../controllers/user.controller');

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

module.exports = router;