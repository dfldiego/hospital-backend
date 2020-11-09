const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

exports.googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        // verificar que el usuario existe
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: "@@@",
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en la BD
        await usuario.save();

        // GENERAR UN TOKEN -- JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }

}