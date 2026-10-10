'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3900;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_rest_blog';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conexión a la base de datos correcta !!!');

        // Crear servidor y escuchar peticiones HTTP
        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    });