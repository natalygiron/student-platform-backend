require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection} = require('./database/config');

// Creando servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body - debe ir antes de la conexion
app.use(express.json());

// Base de datos
dbConnection();

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT)
} )