const router = require('express').Router();
const LoginController = require('../controllers/LoginController');
const LoginValid = require('./middlewares/validations/LoginValid');

router.post('/', LoginValid.validarCampos, LoginValid.validarValoresDosCampos, LoginController.realizarLogin);

module.exports = router;