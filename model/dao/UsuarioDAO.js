class UsuariosDAO {

    constructor(conexao) {
        this._conexao = conexao;
    }

    salvar(usuario) {
        return new Promise((resolve, reject) => {
            this._conexao.query('INSERT INTO usuarios(nome, email, situacao, senha, id_tipo) VALUES (?,?,?,?,?);',
                [usuario.nome, usuario.email, usuario.situacao, usuario.senha, usuario.tipo],
                (erro, resultado) => {
                    if (erro) reject(erro);
                    else resolve(resultado.insertId);
                }
            )
        });
    }
}

module.exports = UsuariosDAO;