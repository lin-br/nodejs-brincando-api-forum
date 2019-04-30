const apiJwt = require('jsonwebtoken');

const CHAVE = 'txp2wk99k6UKGM9Lr+DX29v0lntp9RTwQUiv+ZzOYoA=';

class ManipuladorJWT {

    static gerarJWT(subject = '', objetoQueSeraArmazenado, validade = '1h') {
        let payload = {};
        Object.assign(payload, objetoQueSeraArmazenado);
        payload.subject = subject;
        return apiJwt.sign(payload, CHAVE, {algorithm: 'HS512', expiresIn: validade});
    }

    static validarJWT(token = '') {
        if (token) return apiJwt.verify(token, CHAVE);
        else return false;
    }
}

module.exports = ManipuladorJWT;