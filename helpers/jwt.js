const jwt = require('jsonwebtoken');

exports.generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        // payload: no grabar info sensible
        const payload = {
            uid
        }

        // firma: payload,llave secreta, duracion del token, callback
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

