const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    //constante app tudo que e exportado do diretorio controllers
    consign().include("controllers").into(app);

    return app;
}

