/***
 * Path: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], authController.login);

module.exports = router;