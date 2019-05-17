const express           = require('express');
const router            = express.Router();
const ramazanController = require('../controllers/ramazan.controller');

router.get('/', ramazanController.getRamazanKZ);
module.exports = router;