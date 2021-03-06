//importamos el response de express
const { response } = require('express');
//importamos bcrypt
const bcrypt = require('bcryptjs');
//importamos el modelo de usuario
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

// Funcion DELETE
exports.deleteUsuario = async (req, res = response) => {

    //obtener id que viene por URL
    const uid = req.params.id;

    try {

        // encontrar el usuario con el id pasado por URL en la BD
        const usuarioDB = await Usuario.findById(uid);

        //si el usuario buscado no existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // borrar usuario de la DB
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado..'
        });
    }
}

// Funcion PUT
exports.putUsuario = async (req, res = response) => {

    //obtener id que viene por URL
    const uid = req.params.id;

    try {

        // encontrar el usuario con el id pasado por URL en la BD
        const usuarioDB = await Usuario.findById(uid);

        //si el usuario buscado no existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //TODO: Validar token y comprobar si es el usuario correcto

        // El usuario existe y queremos actualizarlo
        //actualizaciones
        // campos que no queremos actualizar password y google
        const { password, google, email, ...campos } = req.body;

        // usuario no quiere actualizar su email
        if (usuarioDB.email !== email) {
            // usuario quiere modificar su email. Verificar que email nuevo no sea igual a otro.
            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        // debemos colocar el email que queremos actualizar
        campos.email = email;

        // new: true para actualizar instantaneamente el nuevo usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

exports.getAllUsuarios = async (req, res) => {

    //paginacion
    const desde = Number(req.query.desde) || 0;

    //esto ejecuta todas las promesas de manera simultanea - coleccion de promesas - devuelve un arreglo
    //desestructuracion de arreglos
    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
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

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // grabar en la BD
        await usuario.save();

        // GENERAR UN TOKEN -- JWT
        const token = await generarJWT(usuario.id);

        // respuesta del servidor
        res.json({
            ok: true,
            usuario,
            token,
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
