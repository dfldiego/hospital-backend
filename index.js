require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbconnection } = require('./database/config');

// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// base de datos
dbconnection();

// rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//iniciar el servidor de express
app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en puerto " + process.env.PORT);
}); 