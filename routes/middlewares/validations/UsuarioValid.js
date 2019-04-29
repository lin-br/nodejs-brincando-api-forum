const ExpressValidatorResultFormatted = require('../../../helpers/ExpressValidatorResultFormatted');

class UsuarioValid {

    static validarCampos(request, response, next) {
        request.check('email')
            .trim()
            .notEmpty()
            .withMessage('O campo "email" é obrigatório, favor verificar');

        request.check('senha')
            .trim()
            .notEmpty()
            .withMessage('O campo "senha" é obrigatório, favor verificar');

        request.check('nome')
            .trim()
            .notEmpty()
            .withMessage('O campo "nome" é obrigatório, favor verificar');

        request.check('tipo')
            .trim()
            .notEmpty()
            .withMessage('O campo "tipo" é obrigatório, favor verificar');

        request.getValidationResult()
            .then(resultado => {
                if (resultado.isEmpty()) next();
                else response.status(400).json(resultado.formatWith(ExpressValidatorResultFormatted).mapped());
            });
    }

    static validarValoresDosCampos(request, response, next) {
        request.check('email')
            .isEmail()
            .withMessage('E-mail incorreto!');

        request.check('nome')
            .len({min: 10, max: 45})
            .withMessage('O campo nome deve conter no mínimo 10 caracteres e no máximo 45.');

        request.check('senha')
            .len({min: 8, max: 30})
            .withMessage('O campo "senha" deve conter no mínimo 8 caracteres e no máximo 30.');

        request.check('tipo')
            .isInt()
            .withMessage('O valor declarado no campo "tipo" deve conter apenas números');

        request.getValidationResult()
            .then((resultado) => {
                if (resultado.isEmpty()) next();
                else response.status(422).json(resultado.formatWith(ExpressValidatorResultFormatted).mapped());
            });
    }
}

module.exports = UsuarioValid;