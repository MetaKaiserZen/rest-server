const { Router } = require('express');
const { check } = require('express-validator');

const { usuarioExiste, emailExiste, esRoleValido } = require('../helpers/validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { adminRole, tieneRole } = require('../middlewares/validar-roles');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN', 'USER']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id',
[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id',
[
    validarJWT,
    // adminRole,
    tieneRole('ADMIN', 'VENTAS'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
]
, usuariosDelete);

module.exports = router;
