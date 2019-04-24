const express = require('express');
const helmet = require('helmet');
const UsuarioRoute = require('./routes/UsuarioRoute');
const validator = require('express-validator');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(validator());
app.use('/usuarios', UsuarioRoute);

app.listen('3000', function () {
    console.log(`Servidor rodando na porta ${this.address().port}`);
});
