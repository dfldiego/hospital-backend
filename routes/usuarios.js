/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const usuarioController = require('../controllers/usuariosController');
const router = Router();

router.get('/', validarJWT, usuarioController.getAllUsuarios);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
], usuarioController.createUsuarios);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
], usuarioController.putUsuario);
router.delete('/:id', validarJWT, usuarioController.deleteUsuario);

module.exports = router;