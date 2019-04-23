class UsuariosDAO {

    constructor(conexao) {
        this._conexao = conexao;
    }

    salvar(usuario) {
        console.log(usuario);
        return new Promise((resolve, reject) => {
            this._conexao.query('INSERT INTO usuarios(nome, email, situacao) VALUES (?,?,?);',
                [usuario.nome, usuario.email, usuario.situacao],
                (erro, resultado) => {
                    if (erro) reject(erro);
                    resolve(resultado.insertId);
                }
            )
        });
    }
}

module.exports = UsuariosDAO;