class UsuarioEntity {

    constructor(nome, email, situacao = 1, dataCriacao = new Date(), dataAlteracao = null, dataExclusao = null) {
        this._nome = nome;
        this._email = email;
        this._situacao = situacao;
        this._dataCriacao = new Date(dataCriacao.getTime());
        this._dataAlteracao = dataAlteracao ? new Date(dataAlteracao.getTime()) : null;
        this._dataExclusao = dataExclusao ? new Date(dataExclusao.getTime()) : null;
        Object.freeze(this);
    }

    get nome() {
        return this._nome;
    }

    get email() {
        return this._email;
    }

    get situacao() {
        return this._situacao;
    }

    get dataCriacao() {
        return new Date(this._dataCriacao.getTime());
    }

    get dataAlteracao() {
        return new Date(this._dataAlteracao.getTime());
    }

    get dataExclusao() {
        return new Date(this._dataExclusao.getTime());
    }
}

module.exports = UsuarioEntity;