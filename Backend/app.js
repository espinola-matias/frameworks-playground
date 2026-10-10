'use strict';

// Cargar módulos de Node para crear el servidor
const express = require('express');
const cors = require('cors');

// Ejecutar express (http)
const app = express();

// Cargar ficheros de rutas
const article_routes = require('./routes/article');

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', article_routes);

// Exportar módulo (fichero actual)
module.exports = app;