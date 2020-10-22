const mongoose = require('mongoose');

const dbconnection = async () => {
    try {
        // conexion sacada de pagina de mongoose
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Conexión DB establecida');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar conexión con DB')
    }
}

module.exports = {
    dbconnection
}