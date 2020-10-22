//importamos el response de express
const { response } = require('express');

//importamos el modelo de usuario
const Usuario = require('../models/usuario');


exports.getAllUsuarios = async (req, res) => {

    // obtener todos los usuarios de la base de datos con metodo find()
    // find('especificar un filtro, especificar una columna)
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    })
}

// Funcion POST
exports.createUsuarios = async (req, res = response) => {
    // hacemos destructuring de los datos introducidos.
    const { nombre, email, password } = req.body;

    //validar que email sea unico
    try {
        //obtener una variable booleana que me devuelva true si el email existe
        const existeEmail = await Usuario.findOne({ email: email })

        // si el email existe lanzar un error 400
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }

        // creamos un objeto usuario con los datos introducidos
        const usuario = new Usuario(req.body);

        // grabar en la BD
        await usuario.save();

        // respuesta del servidor
        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        // si hay un error inesperado lanzar error 500
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
