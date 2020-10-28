const { response } = require('express');


exports.getHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
    });
}

exports.createHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'createHospitales'
    });
}

exports.putHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putHospitales'
    });
}

exports.deleteHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospitales'
    });
}