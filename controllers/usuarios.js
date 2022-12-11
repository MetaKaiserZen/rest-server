const { res, req } = require('express');

const usuariosGet = (request = req, response = res) =>
{
    const { nombre = 'No Name', apiKey, page = 1, limit } = request.query;

    response.json(
    {
        msg: 'get API - Controlador',
        nombre,
        apiKey,
        page,
        limit
    });
}

const usuariosPost = (request, response = res) =>
{
    const { nombre, edad } = request.body;

    response.json(
    {
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const usuariosPut = (request, response = res) =>
{
    const { id } = request.params;

    response.json(
    {
        msg: 'put API - Controlador',
        id
    });
}

const usuariosDelete = (request, response = res) =>
{
    response.json(
    {
        msg: 'delete API - Controlador'
    });
}

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }
