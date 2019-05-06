const UsuarioAcessoEntity = require('../entity/UsuarioAcessoEntity');
const RegraEntity = require('../entity/RegraEntity');

class UsuarioAcessoDAO {

    constructor(conexao) {
        this._conexao = conexao;
    }

    recuperarUsuarioComPermissoes(email = null) {
        return new Promise((resolve, reject) => {
            this._conexao.query(`
                SELECT u.*, t.nome AS tipo, ru.id_regra, r.url, r.method AS regra, r.descricao AS regra_descricao
                FROM tilmais.usuarios          u
                     JOIN      tipos           t ON u.id_tipo = t.id
                     LEFT JOIN regras_usuarios ru ON u.id = ru.id_usuario
                     LEFT JOIN regras          r ON ru.id_regra = r.id
                WHERE u.situacao = 1
                  AND u.data_hora_exclusao IS NULL
                  AND t.data_hora_exclusao IS NULL
                  AND r.data_hora_exclusao IS NULL
                  AND ru.situacao_vinculo = 1
                  AND u.email = ?
                ;`,
                [email],
                (erro, resultado) => {
                    if (erro) {
                        reject(erro);
                    } else {
                        if (resultado && resultado.length) resolve(this._montarUsuarioEntity(resultado));
                        else resolve(null);
                    }
                });
        });
    }

    _montarUsuarioEntity(resultadoDaConsulta) {
        let usuario = new UsuarioAcessoEntity(resultadoDaConsulta[0]);
        resultadoDaConsulta.forEach((linha) => usuario.adicionarRegra(new RegraEntity(linha)));
        return usuario;
    }
}

module.exports = UsuarioAcessoDAO;