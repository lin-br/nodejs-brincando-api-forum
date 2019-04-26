class RegraEntity {

    constructor({id_regra, regra, regra_descricao}) {
        this._id = id_regra;
        this._regra = regra;
        this._descricao = regra_descricao;
        Object.freeze(this);
    }

    get id() {
        return this._id;
    }

    get regra() {
        return this._regra;
    }

    get regra_descricao() {
        return this._descricao;
    }
}

module.exports = RegraEntity;