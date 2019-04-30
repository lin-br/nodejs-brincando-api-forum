const apiJwt = require('jsonwebtoken');

const CHAVE = 'txp2wk99k6UKGM9Lr+DX29v0lntp9RTwQUiv+ZzOYoA=';

class ManipuladorJWT {

    static gerarJWT(payload = {}, validade = '1h') {
        return apiJwt.sign(payload, CHAVE, {algorithm: 'HS512', expiresIn: validade});
    }

    static validarJWT(token = '') {
        if (token) return apiJwt.verify(token, CHAVE);
        else return false;
    }
}

module.exports = ManipuladorJWT;