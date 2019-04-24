const UsuarioRepository = require('../model/repository/UsuarioRepository');
const UsuarioEntity = require('../model/entity/UsuarioEntity');
const Url = require('../helpers/Url');

class UsuarioController {

    static salvarUsuario(request, response) {
        let {nome, email} = request.body;
        let usuario = new UsuarioEntity(nome, email);

        UsuarioRepository.cadastrar(usuario)
            .then((id) => {
                response.location(Url.montarUrlParaLocation(request, id)).send();
            });
    }
}

module.exports = UsuarioController;