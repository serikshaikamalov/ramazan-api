const express        = require('express');
const router         = express.Router();
const namazController = require('../controllers/namaz.controller');

router.get('/', namazController.getNamazByCity);
module.exports = router;