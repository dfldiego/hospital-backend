//paquete que verifica que un path existe
const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borramos imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("no es un medico por id");
                return false;
            }

            // evaluar si medico tiene una imagen previamente asignada
            // si tiene una imagen, debo borrarla
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            // asignar una imagen al medico
            medico.img = nombreArchivo;

            //grabamos medico en la base de datos
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log("no es un hospital por id");
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();

            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("no es un usuario por id");
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();

            return true;
            break;
        default:

            break;
    }


}


module.exports = {
    actualizarImagen,
}