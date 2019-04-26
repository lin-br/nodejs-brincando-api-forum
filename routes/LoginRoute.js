const router = require('express').Router();
const LoginController = require('../controllers/LoginController');

router.post('/', LoginController.realizarLogin);

module.exports = router;