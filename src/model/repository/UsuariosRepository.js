const pool = require('../../util/MySQLPoolFactory').getPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tilmais'
});
const UsuariosDAO = require('../dao/UsuariosDAO');

const dao = new UsuariosDAO(pool);

class UsuariosRepository {

    static cadastrar(usuario) {
        return dao.salvar(usuario);
    }
}

module.exports = UsuariosRepository;