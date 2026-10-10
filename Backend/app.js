'use strict';

// Cargar módulos de Node para crear el servidor
const express = require('express');
const cors = require('cors');
const path = require('path');

// Ejecutar express (http)
const app = express();

// Cargar ficheros de rutas
const articleRoutes = require('./routes/article');

// Configuración de CORS desde variables de entorno
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (imágenes de artículos)
app.use('/api/uploads', express.static(path.join(__dirname, 'upload')));

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', articleRoutes);

// Exportar módulo (fichero actual)
module.exports = app;