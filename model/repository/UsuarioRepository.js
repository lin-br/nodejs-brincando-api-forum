const pool = require('../../helpers/MySQLPoolFactory').getPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tilmais'
});
const UsuarioDAO = require('../dao/UsuarioDAO');

const dao = new UsuarioDAO(pool);

class UsuarioRepository {

    static cadastrar(usuario) {
        return dao.salvar(usuario);
    }
}

module.exports = UsuarioRepository;