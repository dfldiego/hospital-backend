const { response } = require('express');
//importar los resultado de las validaciones
const { validationResult } = require('express-validator');

exports.validarCampos = (req, res = response, next) => {
    // validación adicional: atrapar los errores del middleware de routes.
    //genero los errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}