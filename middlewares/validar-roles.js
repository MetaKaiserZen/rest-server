const { res } = require('express');

const adminRole = (request, response = res, next) =>
{
    if (!request.usuario)
    {
        return response.status(500).json(
        {
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { nombre, rol } = request.usuario;

    if (rol !== 'ADMIN')
    {
        return response.status(401).json(
        {
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = (...roles) =>
{
    return (request, response = res, next) =>
    {
        if (!request.usuario)
        {
            return response.status(500).json(
            {
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if (!roles.includes(request.usuario.rol))
        {
            return response.status(401).json(
            {
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}

module.exports = { adminRole, tieneRole }
