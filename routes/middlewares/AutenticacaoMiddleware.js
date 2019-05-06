const ManipuladorJWT = require('../../helpers/ManipuladorJWT');
const ManipuladorRequest = require('../../helpers/ManipuladorRequest');

class AutenticacaoMiddleware {

    static autenticarAcesso(request, response, next) {
        let token = ManipuladorRequest.recuperarTokenJWT(request);

        ManipuladorJWT.validarJWT(token)
            .then((payload) => {
                request.payload = payload;
                next();
            })
            .catch((erro) => {
                if (erro.name === 'TokenExpiredError') {
                    response.status(401).json({
                        erro: erro.name,
                        mensagem: 'Sinto muito, o seu token expirou!',
                        dataExpiracao: erro.expiredAt
                    });
                } else {
                    console.log(erro);
                    response.status(500).send();
                }
            });
    }
}

module.exports = AutenticacaoMiddleware;