const router = require('express').Router();
const UsuariosController = require('../controllers/UsuariosController');

router.post('/', UsuariosController.salvarUsuario);

module.exports = router;