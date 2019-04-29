const router = require('express').Router();
const UsuarioController = require('../controllers/UsuarioController');
const UsuarioValid = require('./middlewares/validations/UsuarioValid');

router.post('/', UsuarioValid.validarCampos, UsuarioValid.validarValoresDosCampos, UsuarioController.salvarUsuario);

module.exports = router;