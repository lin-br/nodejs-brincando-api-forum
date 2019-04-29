class UsuarioCacheDAO {

    constructor(conexao) {
        this._conexao = conexao;
    }

    adicionarCache(usuario) {
        return new Promise((resolve, reject) => {
            this._conexao.set(`usuario-${usuario.id}`,
                usuario,
                86400,
                (erro) => {
                    if (erro) reject(erro);
                    else {
                        console.log(`Chave com identificação: ${usuario.id} adicionada ao memcached`);
                        resolve(true);
                    }
                }
            );
        });
    }

    buscarCache(id) {
        return new Promise((resolve, reject) => {
            this._conexao.get(`usuario-${id}`,
                (erro, retorno) => {
                    if (erro) reject(erro);
                    else resolve(retorno);
                }
            );
        });
    }
}

module.exports = UsuarioCacheDAO;