const pool = require('../../helpers/MySQLPoolFactory').getPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tilmais'
});
const UsuarioAcessoDAO = require('../dao/UsuarioAcessoDAO');

const dao = new UsuarioAcessoDAO(pool);

class UsuarioAcessoRepository {

    static recuperarUsuarioComPermissoes(email) {
        return dao.recuperarUsuarioComPermissoes(email);
    }
}

module.exports = UsuarioAcessoRepository;