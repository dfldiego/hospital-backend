/**
 * BUSQUEDAS
 * ruta: api/todo/:busqueda
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const busquedaController = require('../controllers/busquedasController');
const router = Router();

router.get('/:busqueda', validarJWT, busquedaController.getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, busquedaController.getDocumentosColeccion);

module.exports = router;