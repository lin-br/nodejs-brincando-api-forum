const express = require('express');
const helmet = require('helmet');
const UsuariosRoute = require('./src/routes/UsuariosRoute');

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/usuarios', UsuariosRoute);

app.listen('3000', function () {
    console.log(`Servidor rodando na porta ${this.address().port}`);
});
