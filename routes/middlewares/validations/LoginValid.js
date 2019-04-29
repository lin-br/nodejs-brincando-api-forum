const ExpressValidatorResultFormatted = require('../../../helpers/ExpressValidatorResultFormatted');

class LoginValid {

    static validarCampos(request, response, next) {
        request.check('email')
            .trim()
            .notEmpty()
            .withMessage('O campo "email" é obrigatório, favor verificar.');

        request.check('senha')
            .trim()
            .notEmpty()
            .withMessage('O campo "senha" é obrigatório, favor verificar.');

        request.getValidationResult()
            .then(resultadoDaValidacao => {
                if (resultadoDaValidacao.isEmpty()) next();
                else response
                    .status(400)
                    .json(resultadoDaValidacao.formatWith(ExpressValidatorResultFormatted).mapped());
            });
    }

    static validarValoresDosCampos(request, response, next) {
        request.check('email')
            .isEmail()
            .withMessage('E-mail incorreto');
        request.check('senha')
            .len({min: 8, max: 30})
            .withMessage('O campo "senha" deve conter no mínimo 8 caracteres e no máximo 30.');

        request.getValidationResult()
            .then(resultadoDaValidacao => {
                if (resultadoDaValidacao.isEmpty()) next();
                else response
                    .status(422)
                    .json(resultadoDaValidacao.formatWith(ExpressValidatorResultFormatted).mapped());
            })
    }
}

module.exports = LoginValid;