/***
 * Path: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const authController = require('../controllers/auth');
const router = Router();

router.post('/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], authController.login);

router.post('/google', [
    check('token', 'el token de Google es obligatorio').not().isEmpty(),
    validarCampos
], authController.googleSignIn);

module.exports = router;