const router = require('express').Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/', UsuarioController.salvarUsuario);

module.exports = router;