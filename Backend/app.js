import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import articleRoutes from './routes/article.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ejecutar express (http)
const app = express();

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

// Exportar aplicación
export default app;