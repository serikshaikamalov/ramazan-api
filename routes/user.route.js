const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/save', userController.saveToken);
module.exports = router;