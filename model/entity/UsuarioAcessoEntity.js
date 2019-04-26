const RegraEntity = require('./RegraEntity');

class UsuarioEntity {

    constructor({
                    id,
                    situacao = 1,
                    nome,
                    email,
                    senha,
                    id_tipo,
                    data_hora_criacao,
                    data_hora_alteracao,
                    data_hora_exclusao,
                }) {
        this._id = id;
        this._situacao = situacao;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._idTipo = id_tipo;
        this._dataHoraCriacao = new Date(data_hora_criacao.getTime());
        this._dataHoraAlteracao = data_hora_alteracao ? new Date(data_hora_alteracao.getTime()) : null;
        this._dataHoraExclusao = data_hora_exclusao ? new Date(data_hora_exclusao.getTime()) : null;
        this._regras = [];
        Object.freeze(this);
    }

    get id() {
        return this._id;
    }

    get situacao() {
        return this._situacao;
    }

    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    get senha() {
        return this._senha;
    }

    get idTipo() {
        return this._idTipo;
    }

    get dataHoraCriacao() {
        return new Date(this._dataHoraCriacao.getTime());
    }

    get dataHoraAlteracao() {
        return this._dataHoraAlteracao ? new Date(this._dataHoraAlteracao.getTime()) : null;
    }

    get dataHoraExclusao() {
        return this._dataHoraExclusao ? new Date(this._dataHoraExclusao.getTime()) : null;
    }

    get regras() {
        return this._regras;
    }

    adicionarRegra(regra) {
        this._regras.push(regra);
    }
}

module.exports = UsuarioEntity;