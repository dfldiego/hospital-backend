const { response } = require('express');
const Hospital = require('../models/hospital');

exports.getHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
    });
}

exports.createHospitales = async (req, res = response) => {

    // este uid lo tengo xq ya pasé x el middleware de validacion jwt
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado. Hable con el admin."
        });
    }
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