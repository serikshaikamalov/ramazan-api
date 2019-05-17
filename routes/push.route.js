const express        = require('express');
const router         = express.Router();
const pushController = require('../controllers/push.controller');

router.get('/', pushController.sendPush);
module.exports = router;