const { Schema, model } = require('mongoose');

// definicion del Schema
const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    }
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

//implementar el modelo
module.exports = model('Hospital', HospitalSchema);