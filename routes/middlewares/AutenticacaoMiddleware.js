const ManipuladorJWT = require('../../helpers/ManipuladorJWT');
const ManipuladorRequest = require('../../helpers/ManipuladorRequest');

class AutenticacaoMiddleware {

    static autenticarAcesso(request, response, next) {
        let token = ManipuladorRequest.recuperarTokenJWT(request);

        ManipuladorJWT.validarJWT(token)
            .then(next())
            .catch(erro => {
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

    static autenticarPermissao(request, response, next) {
        let token = ManipuladorRequest.recuperarTokenJWT(request);

        ManipuladorJWT.obterPayload(token)
            .then(payload => {
                let possuiPermissao = payload.usuario.regras.some(regra => (regra.url === request.url) && (regra.metodo === request.method));
                if (possuiPermissao) next();
                else response.status(403).send();
            })
            .catch(erro => {
                console.log(erro);
                response.status(500).send();
            });
    }
}

module.exports = AutenticacaoMiddleware;