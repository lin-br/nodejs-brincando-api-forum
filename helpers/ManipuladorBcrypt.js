const bcrypt = require('bcrypt');

const SALTO = process.env.BCRYPT_SATO || 10;

class ManipuladorBcrypt {

    static gerarHash(senha) {
        return bcrypt.hash(senha, SALTO);
    }

    static verificarSenha(senha, hash) {
        return bcrypt.compare(senha, hash);
    }
}

module.exports = ManipuladorBcrypt;