/**
 * Hospitales
 *      path:   /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const hospitalesController = require('../controllers/hospitalesController');
const router = Router();

router.get('/', hospitalesController.getHospitales);
router.post('/', [], hospitalesController.createHospitales);
router.put('/:id', [], hospitalesController.putHospitales);
router.delete('/:id', hospitalesController.deleteHospitales);

module.exports = router;

