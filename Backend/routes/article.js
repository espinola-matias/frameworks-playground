'use strict';

const express = require('express');
const multer = require('multer');
const path = require('path');
const ArticleController = require('../controllers/article');

const router = express.Router();

// Configuración de Multer para subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = process.env.UPLOAD_DIR || './upload/articles';
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `article-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de imagen no válido. Solo se permiten: png, jpg, jpeg, gif'), false);
    }
};

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB por defecto

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }
});

// Rutas del API de artículos
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id?', upload.single('file0'), ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;