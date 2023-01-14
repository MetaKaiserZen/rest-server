const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema(
{
    nombre:
    {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:
    {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:
    {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:
    {
        type: String
    },
    rol:
    {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER', 'VENTAS']
    },
    estado:
    {
        type: Boolean,
        default: true
    },
    google:
    {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function()
{
    const { _id, password, __v, ...usuario } = this.toObject();

    usuario.id = _id;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
