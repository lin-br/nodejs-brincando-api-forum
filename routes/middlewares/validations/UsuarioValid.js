const ExpressValidatorResultFormatted = require('../../../helpers/ExpressValidatorResultFormatted');

class UsuarioValid {

    static validarCadastro(request, response, next) {
        request.check('email')
            .trim()
            .isEmail().withMessage('E-mail incorreto!');
        request.check('nome')
            .trim()
            .notEmpty().withMessage('O campo "nome" é obrigatório, favor verificar.')
            .len({min: 10, max: 45}).withMessage('O campo nome deve conter no mínimo 10 caracteres e no máximo 45.');

        request.getValidationResult()
            .then((resultado) => {
                if (resultado.isEmpty()) next();
                else response.status(422).json(resultado.formatWith(ExpressValidatorResultFormatted).mapped());
            });
    }
}

module.exports = UsuarioValid;