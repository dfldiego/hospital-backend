/**
 * UPLOADS
 * ruta: api/uploads/
 */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const uploadsController = require('../controllers/uploadsController');
const router = Router();

router.use(expressFileUpload());
router.put('/:tipo/:id', validarJWT, uploadsController.fileUpload);

router.get('/:tipo/:foto', uploadsController.returnImage);

module.exports = router;