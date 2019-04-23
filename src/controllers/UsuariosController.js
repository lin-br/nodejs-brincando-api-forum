const UsuariosRepository = require('../model/repository/UsuariosRepository');
const UsuarioEntity = require('../model/entity/UsuarioEntity');
const Url = require('../util/Url');

class UsuariosController {

    static salvarUsuario(request, response) {
        let {nome, email} = request.body;
        let usuario = new UsuarioEntity(nome, email);

        UsuariosRepository.cadastrar(usuario)
            .then((id) => {
                response.location(Url.montarUrlParaLocation(request, id)).send();
            })
            .catch((erro) => {
                console.log(erro);
                response.status(500).send();
            });
    }
}

module.exports = UsuariosController;