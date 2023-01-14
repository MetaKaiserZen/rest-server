const { req, res } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (request = req, response = res, next) =>
{
    const token = request.header('x-token');

    if (!token)
    {
        return response.status(401).json(
        {
            msg: 'No hay token en la petición'
        });
    }

    try
    {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el Usuario que Corresponde al ID

        const usuario = await Usuario.findById(id);

        if (!usuario)
        {
            return response.status(401).json(
            {
                msg: 'Token no válido - usuario con no existe'
            });
        }

        // Verificar si el ID Tiene Estado TRUE

        if (!usuario.estado)
        {
            return response.status(401).json(
            {
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        request.usuario = usuario;

        next();
    }
    catch (error)
    {
        console.log(error);

        response.status(401).json(
        {
            msg: 'Token no válido'
        });
    }
}

module.exports = { validarJWT }
