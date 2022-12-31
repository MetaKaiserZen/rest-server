const Usuario = require('../models/usuario');
const Role = require('../models/role');

const usuarioExiste = async (id) =>
{
    // Verificar si el Usuario Existe

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario)
    {
        throw new Error(`El ID ${ id } no existe`);
    }
}

const emailExiste = async (correo = '') =>
{
    // Verificar si el Correo Existe

    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail)
    {
        throw new Error(`El correo ${ correo } ya está registrado`);
    }
}

const esRoleValido = async (rol = '') =>
{
    const existeRol = await Role.findOne({ rol });

    if (!existeRol)
    {
        throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
    }
}

module.exports = { usuarioExiste, emailExiste, esRoleValido }
