class UsuarioCacheDAO {

    constructor(conexao) {
        this._conexao = conexao;
    }

    adicionarCache(usuario) {
        return new Promise((resolve, reject) => {
            this._conexao.set(usuario.id,
                usuario,
                5,
                (erro) => {
                    if (erro) reject(erro);
                    else resolve(`Chave com identificação: ${usuario.id} adicionada ao memcached`);
                }
            );
        });
    }

    buscarCache(id) {
        return new Promise((resolve, reject) => {
            this._conexao.get(id,
                (erro, retorno) => {
                    if (erro) reject(erro);
                    else resolve(retorno);
                }
            );
        });
    }
}

module.exports = UsuarioCacheDAO;