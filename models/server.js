const express = require('express');
const cors = require('cors');

const { connection } = require('../database/config');

class Server
{
    constructor()
    {
        this.app  = express();
        this.port = process.env.PORT;

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

        // Conectar a Base de Datos

        this.connect();

        // Middlewares

        this.middlewares();

        // Rutas de la Aplicacion

        this.routes();
    }

    async connect()
    {
        await connection();
    }

    middlewares()
    {
        // CORS

        this.app.use(cors());

        // Lectura y Parseo del Body

        this.app.use(express.json());

        // Directorio Público

        this.app.use(express.static('public'));
    }

    routes()
    {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen()
    {
        this.app.listen(this.port, () =>
        {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
