const express = require('express');
const helmet = require('helmet');
const UsuarioRoute = require('./routes/UsuarioRoute');
const LoginRoute = require('./routes/LoginRoute');
const expressValidator = require('express-validator');
const ManipuladorErros = require('./routes/middlewares/ManipuladorDeErros');
const AutenticacaoMiddleware = require('./routes/middlewares/AutenticacaoMiddleware');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(expressValidator());
app.use('/login', LoginRoute);
app.use(AutenticacaoMiddleware.autenticarAcesso);
app.use('/usuarios', UsuarioRoute);
app.use(ManipuladorErros.deuRuim);

app.listen('3000', function () {
    console.log(`Servidor rodando na porta ${this.address().port}`);
});
