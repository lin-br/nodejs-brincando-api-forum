const UsuarioAcessoRepository = require('../model/repository/UsuarioAcessoRepository');

class LoginController {

    static realizarLogin(request, response) {
        let {email} = request.body;

        UsuarioAcessoRepository.recuperarUsuarioComPermissoes(email)
            .then(resultado => {
                console.log(resultado);
                response.send('ok');
            })
            .catch(erro => {
                console.log(`erro: ${erro}`);
                response.status(500).send();
            });
    };
}

module.exports = LoginController;