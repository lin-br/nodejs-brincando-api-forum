class ManipuladorDeErros {

    static deuRuim(erro, request, response, next) {
        console.log(erro.stack);
        response.status(500).json({erro: 'Ocorreu um erro com o servidor, favor tentar novamente mais tarde.'});
    }
}

module.exports = ManipuladorDeErros;