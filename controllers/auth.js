const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // verificar email: buscamos un usuario en la DB con el email pasado.
        const usuarioDB = await Usuario.findOne({ email });

        // si no se encontró un usuario con ese email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });
        }

        //verificar password: tengo pass encriptada y la pass pasada por el body
        //metodo compareSync(password del body, password de la DB)
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password no válido'
            });
        }

        // GENERAR UN TOKEN -- JWT

        res.json({
            ok: true,
            msg: 'Hola mundo'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}