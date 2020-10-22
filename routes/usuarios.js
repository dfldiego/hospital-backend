/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const usuarioController = require('../controllers/usuariosController');
const router = Router();

router.get('/', usuarioController.getAllUsuarios);
router.post('/', usuarioController.createUsuarios);

module.exports = router;