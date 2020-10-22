/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuariosController');
const router = Router();

router.get('/', usuarioController.getAllUsuarios);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
], usuarioController.createUsuarios);

module.exports = router;