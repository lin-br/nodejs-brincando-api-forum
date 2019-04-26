const ExpressValidatorResultFormatted = require('../../../helpers/ExpressValidatorResultFormatted');

class LoginValid {

    static validarLogin(request, response, next) {
        request.check('email')
            .trim()
            .notEmpty().withMessage('O campo "email" é obrigatório, favor verificar.')
            .isEmail().withMessage('E-mail incorreto');
        request.check('senha')
            .trim()
            .notEmpty().withMessage('O campo "senha" é obrigatório, favor verificar.')
            .len({min: 8, max: 30}).withMessage('O campo "senha" deve conter no mínimo 8 caracteres e no máximo 30.');

        request.getValidationResult()
            .then(resultado => {
                if (resultado.isEmpty()) next()
                else response.status(422).json(resultado.formatWith(ExpressValidatorResultFormatted).mapped());
            })
    }
}

module.exports = LoginValid;