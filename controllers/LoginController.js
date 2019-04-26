const UsuarioAcessoRepository = require('../model/repository/UsuarioAcessoRepository');
const UsuarioCacheRepository = require('../model/repository/UsuarioCacheRepository');

class LoginController {

    static realizarLogin(request, response) {
        let {email} = request.body;

        UsuarioAcessoRepository.recuperarUsuarioComPermissoes(email)
            .then(usuario => UsuarioCacheRepository.cachearUsuario(usuario))
            .then(mensagem => {
                console.log(mensagem);
                response.send('ok');
            })
            .catch(erro => {
                console.log(`erro: ${erro}`);
                response.status(500).send();
            });
    };
}

module.exports = LoginController;