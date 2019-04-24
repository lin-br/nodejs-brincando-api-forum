const ExpressValidatorResultFormatted = require('../../../helpers/ExpressValidatorResultFormatted');

class UsuarioValid {

    static validarCadastro(request, response, next) {
        request.check('email').isEmail().withMessage('E-mail incorreto!');

        request.getValidationResult()
            .then((resultado) => {
                console.log(resultado.mapped());
                if (resultado.isEmpty()) next();
                else response.status(422).json(resultado.formatWith(ExpressValidatorResultFormatted).mapped());
            });
    }
}

module.exports = UsuarioValid;