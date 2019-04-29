const LoginDTO = require('../dto/LoginDTO');
const LoginDomain = require('../domain/LoginDomain');

class LoginController {

    static realizarLogin(request, response) {
        let loginDTO = new LoginDTO(request.body);

        LoginDomain.processarAutenticacaoDoUsuario(loginDTO)
            .then(jwt => {
                if (jwt) response.header('Authorization', `Bearer ${jwt}`).send();
                else response.status(404).send();
            })
            .catch(erro => {
                console.log(`erro: ${erro}`);
                response.status(500).json({erro: 'Ocorreu um erro com o servidor, favor tentar novamente mais tarde.'});
            });
    };
}

module.exports = LoginController;