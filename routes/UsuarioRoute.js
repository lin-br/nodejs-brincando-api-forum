const router = require('express').Router();
const UsuarioController = require('../controllers/UsuarioController');
const UsuarioValid = require('./middlewares/validations/UsuarioValid');

router.post('/', UsuarioValid.validarCadastro, UsuarioController.salvarUsuario);

module.exports = router;