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
router.post('/', [], medicosController.createMedico);
router.put('/:id', [], medicosController.putMedico);
router.delete('/:id', medicosController.deleteMedico);


module.exports = router;