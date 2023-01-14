const { res } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');

const login = async (request, response = res) =>
{
    const { correo, password } = request.body;

    try
    {
        // Verificar si el Email Existe

        const usuario = await Usuario.findOne({ correo });

        if (!usuario)
        {
            return response.status(400).json({ msg: 'Usuario / Password no son correctos - correo' });
        }

        // Verificar si el Usuario Está Activo

        if (!usuario.estado)
        {
            return response.status(400).json({ msg: 'Usuario / Password no son correctos - estado: false' });
        }

        // Verificar la Contraseña

        const validarPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validarPassword)
        {
            return response.status(400).json({ msg: 'Usuario / Password no son correctos - password' });
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id);

        response.json({ usuario, token });
    }
    catch (error)
    {
        console.log(error);

        return response.status(500).json({ msg: 'Hable con el administrador' })
    }
}

module.exports = { login }
