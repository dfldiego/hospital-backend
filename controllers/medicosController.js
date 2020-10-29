const { response } = require('express');
const Usuario = require('../models/medico');

exports.getMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getMedico'
    });
}

exports.createMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'createMedico'
    });
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