const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route'); 
const folderRoutes = require('./folder.route');
const fileRoutes = require('./file.route');

router.get('/', (req, res) => res.send(`<h2>Hello from ${req.baseUrl}</h2>`));
router.get('/status', (req, res) => res.send('OK'));
router.use('/user', userRoutes);
router.use('/folder',folderRoutes );
router.use('/file', fileRoutes);

module.exports = router;