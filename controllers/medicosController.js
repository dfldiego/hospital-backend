const { response } = require('express');
const Medico = require('../models/medico');

exports.getMedico = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

exports.createMedico = async (req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Hable con el admin'
        });
    }
}

exports.putMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putMedico'
    });
}

exports.deleteMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteMedico'
    });
}