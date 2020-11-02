const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

exports.getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;

    // i: insensible para agregar las banderas que quiera.
    const regex = new RegExp(busqueda, 'i');

    // filtrar usuarios por valores ingresador en el path
    /* const usuarios = await Usuario.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex }); */

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}