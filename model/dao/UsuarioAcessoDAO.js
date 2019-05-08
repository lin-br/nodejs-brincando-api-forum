const UsuarioAcessoEntity = require('../entity/UsuarioAcessoEntity');
const RegraEntity = require('../entity/RegraEntity');

function fabricarUsuarioEntity(dados) {
    let usuarioEntity = new UsuarioAcessoEntity(dados[0]);
    dados.forEach(linha => {
        if (!usuarioEntity.regras.some(regra => regra.id === linha.id_regra)) {
            usuarioEntity.adicionarRegra(new RegraEntity(linha))
        }
    });
    return usuarioEntity;
}

class UsuarioAcessoDAO {

    constructor(conexao) {
        this._conexao = conexao;
    }

    recuperarUsuarioComPermissoes(email = null) {
        return new Promise((resolve, reject) => {
            this._conexao.query(`
                SELECT u.*, t.nome AS tipo, rt.id_regra, r.url, r.method, r.descricao AS regra_descricao
                FROM tilmais.usuarios       u
                     JOIN      tipos        t ON u.id_tipo = t.id
                     LEFT JOIN regras_tipos rt ON u.id = rt.id_tipo
                     LEFT JOIN regras       r ON rt.id_regra = r.id
                WHERE u.situacao = 1
                  AND u.data_hora_exclusao IS NULL
                  AND t.data_hora_exclusao IS NULL
                  AND r.data_hora_exclusao IS NULL
                  AND rt.situacao_vinculo = 1
                  AND u.email = ?
                UNION ALL
                SELECT u.*, t.nome AS tipo, ru.id_regra, r.url, r.method, r.descricao AS regra_descricao
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
                [email, email],
                (erro, resultado) => {
                    if (erro) {
                        reject(erro);
                    } else {
                        if (resultado && resultado.length) resolve(fabricarUsuarioEntity(resultado));
                        else resolve(null);
                    }
                });
        });
    }
}

module.exports = UsuarioAcessoDAO;