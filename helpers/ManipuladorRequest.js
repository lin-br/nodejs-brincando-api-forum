class ManipuladorRequest {

    constructor() {
        throw new Error('Não é possível instanciar essa classe!');
    }

    static recuperarTokenJWT(request) {
        return request.headers.authorization.replace('Bearer ', '');
    }
}

module.exports = ManipuladorRequest;