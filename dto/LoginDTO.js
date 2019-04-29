class LoginDTO {

    constructor({email, senha}) {
        this._email = email;
        this._senha = senha;
        Object.freeze(this);
    }

    get email() {
        return this._email;
    }

    get senha() {
        return this._senha;
    }
}

module.exports = LoginDTO;