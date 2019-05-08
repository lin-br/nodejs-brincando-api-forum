class RegraEntity {

    constructor({id_regra, url, method, regra_descricao}) {
        this._id = id_regra;
        this._url = url;
        this._metodo = method;
        this._descricao = regra_descricao;
        Object.freeze(this);
    }

    get id() {
        return this._id;
    }

    get url() {
        return this._url;
    }

    get metodo() {
        return this._metodo;
    }

    get regra_descricao() {
        return this._descricao;
    }
}

module.exports = RegraEntity;