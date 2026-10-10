import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

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