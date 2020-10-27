const jwt = require('jsonwebtoken');

exports.validarJWT = (req, res, next) => {

    // leer el token
    const token = req.header('x-token');
    /* console.log(token); */

    // validar token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    // Verificar el JWT
    try {

        // verifica si semilla hace match con la firma del token
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        /* console.log(uid); */
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}