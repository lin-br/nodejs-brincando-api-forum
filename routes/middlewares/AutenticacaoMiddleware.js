const ManipuladorJWT = require('../../helpers/ManipuladorJWT');
const ManipuladorRequest = require('../../helpers/ManipuladorRequest');

class AutenticacaoMiddleware {

    static autenticarAcesso(request, response, next) {
        let token = ManipuladorRequest.recuperarTokenJWT(request);

        try {
            let validadeDoToken = ManipuladorJWT.validarJWT(token);
            if (validadeDoToken) next();
        } catch (e) {
            console.log({erro: e.name, mensagem: e.message, dataExpiracao: e.expiredAt});
            response.status(401).send();
        }
    }
}

module.exports = AutenticacaoMiddleware;