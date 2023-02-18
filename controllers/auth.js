const { res } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/verify');

const login = async (request, response = res) =>
{
    const { correo, password } = request.body;

    try
    {
        // Verificar si el Email Existe

        const usuario = await Usuario.findOne({ correo });

        if (!usuario)
        {
            return response.status(400).json({ msg: 'Usuario / Password no son correctos - Correo' });
        }

        // Verificar si el Usuario Está Activo

        if (!usuario.estado)
        {
            return response.status(400).json({ msg: 'Usuario / Password no son correctos - Estado: false' });
        }

        // Verificar la Contraseña

        const validarPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validarPassword)
        {
            return response.status(400).json({ msg: 'Usuario / Password no son correctos - Password' });
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

const googleSignIn = async (request, response = res) =>
{
    const { id_token } = request.body;

    try
    {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario)
        {
            // Tengo que Crearlo

            const data =
            {
                nombre,
                correo,
                password: '',
                img,
                rol: 'USER',
                google: true
            }

            console.log(data)

            usuario = new Usuario(data);

            await usuario.save();
        }

        // Si el Usuario en BD

        if (!usuario.estado)
        {
            return response.status(401).json({ msg: 'Hable con el administrador - Usuario bloqueado' });
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id);

        response.json({ usuario, token });
    }
    catch (error)
    {
        response.status(400).json(
        {
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }
}

module.exports = { login, googleSignIn }
