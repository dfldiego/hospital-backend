/**
 *  MEDICOS
 *
 *  path: /api/medicos
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const medicosController = require('../controllers/medicosController');
const router = Router();

router.get('/', medicosController.getMedico);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital del medico es obligatorio').not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validarCampos
], medicosController.createMedico);
router.put('/:id', [], medicosController.putMedico);
router.delete('/:id', medicosController.deleteMedico);


module.exports = router;