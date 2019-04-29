const UsuarioRepository = require('../model/repository/UsuarioRepository');
const UsuarioEntity = require('../model/entity/UsuarioEntity');
const Url = require('../helpers/Url');
const ManipuladorBcrypt = require('../helpers/ManipuladorBcrypt');

class UsuarioController {

    static salvarUsuario(request, response) {
        let {nome, email, senha, tipo} = request.body;

        ManipuladorBcrypt.gerarHash(senha)
            .then(hash => {
                let usuario = new UsuarioEntity(nome, email, hash, tipo);

                return UsuarioRepository.cadastrar(usuario);
            })
            .then((id) => {
                response.location(Url.montarUrlParaLocation(request, id)).send();
            })
            .catch(erro => {
                console.log(erro);
                response.status(500).json({erro: 'Ocorreu um erro com o servidor, favor tentar novamente mais tarde.'});
            });
    }
}

module.exports = UsuarioController;