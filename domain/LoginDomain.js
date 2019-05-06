const UsuarioAcessoRepository = require('../model/repository/UsuarioAcessoRepository');
const UsuarioCacheRepository = require('../model/repository/UsuarioCacheRepository');
const ManipuladorBcrypt = require('../helpers/ManipuladorBcrypt');
const ManipuladorJWT = require('../helpers/ManipuladorJWT');

class LoginDomain {

    static processarAutenticacaoDoUsuario(loginDto) {
        return new Promise((resolve, reject) => {
            UsuarioAcessoRepository.recuperarUsuarioComPermissoes(loginDto.email)
                .then(usuario => validarAutenticidadeDoUsuario(loginDto, usuario))
                .then(usuario => cachearUsuario(usuario))
                .then(usuario => resolve(gerarJWT(usuario)))
                .catch(erro => reject(erro));
        });
    }
}

function validarAutenticidadeDoUsuario(loginDto, usuario) {
    return new Promise(resolve => {
        if (usuario) {
            ManipuladorBcrypt.verificarSenha(loginDto.senha, usuario.senha)
                .then(resposta => {
                    if (resposta) resolve(usuario);
                    else resolve(null);
                });
        } else resolve(null);
    });
}

function cachearUsuario(usuario) {
    return new Promise((resolve, reject) => {
        if (usuario) {
            UsuarioCacheRepository.cachearUsuario(usuario)
                .then(resposta => {
                    if (resposta) resolve(usuario);
                    else resolve(null);
                })
                .catch(erro => {
                    reject(erro);
                });
        } else resolve(null);
    });
}

function gerarJWT(usuario) {
    if (usuario) {
        return ManipuladorJWT.gerarJWT(usuario.id, {usuario: gerarUsuarioParaJWT(usuario)}, 60);
    } else return null;
}

function gerarUsuarioParaJWT(usuario) {
    let objeto = {
        nome: usuario.nome,
        email: usuario.email,
        situacao: usuario.situacao,
        tipo: usuario.idTipo,
        regras: []
    };

    usuario.regras.forEach(regra => objeto.regras.push({id: regra.id, url: regra.url, metodo: regra.metodo}));
    return objeto;
}

module.exports = LoginDomain;