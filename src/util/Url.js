class Url {
    constructor() {
        throw new Error('Não é possível instanciar essa classe!');
    }

    static montarUrlParaLocation(request, conteudoString) {
        let {hostname, originalUrl} = request;
        return `http://${hostname}${originalUrl}${conteudoString}`;
    }
}

module.exports = Url;