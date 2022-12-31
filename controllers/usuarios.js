const { res, req } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (request = req, response = res) =>
{
    const query = { estado: true };

    const { desde = 0, limit = 5 } = request.query;

    const [total, usuarios] = await Promise.all(
    [
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    response.json({ total, usuarios });
}

const usuariosPost = async (request, response = res) =>
{
    const { nombre, correo, password, rol } = request.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la Contraseña

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD

    await usuario.save();

    response.json({ usuario });
}

const usuariosPut = async (request, response = res) =>
{
    const { id } = request.params;
    const { _id, password, google, correo, ...resto } = request.body;

    // TODO Validar Contra Base de Datos

    if (password)
    {
        // Encriptar la Contraseña

        const salt = bcryptjs.genSaltSync();

        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    response.json({ usuario });
}

const usuariosDelete = async (request, response = res) =>
{
    const { id } = request.params;

    // Físicamente lo Borramos

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    response.json({ usuario });
}

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }
