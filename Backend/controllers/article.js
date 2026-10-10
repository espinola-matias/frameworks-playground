'use strict';

const validator = require('validator');
const fs = require('fs');
const path = require('path');
const Article = require('../models/article');

const controller = {

    save: async (req, res) => {
        try {
            // Recoger parámetros por POST
            const { title, content, image } = req.body;

            // Validar datos
            if (!title || !content || validator.isEmpty(title) || validator.isEmpty(content)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Faltan datos por enviar (título y contenido son obligatorios)'
                });
            }

            // Crear y guardar el artículo
            const article = new Article({
                title,
                content,
                image: image || null
            });

            const articleStored = await article.save();

            return res.status(201).json({
                status: 'success',
                article: articleStored
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al guardar el artículo'
            });
        }
    },

    getArticles: async (req, res) => {
        try {
            let query = Article.find({}).sort('-_id');

            // Si se pide los últimos, limitar a 5
            if (req.params.last) {
                query = query.limit(5);
            }

            const articles = await query.exec();

            if (!articles || articles.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }

            return res.status(200).json({
                status: 'success',
                articles
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al devolver los artículos'
            });
        }
    },

    getArticle: async (req, res) => {
        try {
            const articleId = req.params.id;

            if (!articleId) {
                return res.status(400).json({
                    status: 'error',
                    message: 'No se ha proporcionado el ID del artículo'
                });
            }

            const article = await Article.findById(articleId);

            if (!article) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No existe el artículo'
                });
            }

            return res.status(200).json({
                status: 'success',
                article
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al buscar el artículo'
            });
        }
    },

    update: async (req, res) => {
        try {
            const articleId = req.params.id;
            const { title, content } = req.body;

            // Validar datos
            if (!title || !content || validator.isEmpty(title) || validator.isEmpty(content)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Los datos no son válidos (título y contenido obligatorios)'
                });
            }

            const articleUpdated = await Article.findByIdAndUpdate(
                articleId,
                req.body,
                { new: true }
            );

            if (!articleUpdated) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No existe el artículo para actualizar'
                });
            }

            return res.status(200).json({
                status: 'success',
                article: articleUpdated
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al actualizar el artículo'
            });
        }
    },

    delete: async (req, res) => {
        try {
            const articleRemoved = await Article.findByIdAndDelete(req.params.id);

            if (!articleRemoved) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No se ha borrado el artículo, posiblemente no exista'
                });
            }

            return res.status(200).json({
                status: 'success',
                article: articleRemoved
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al borrar el artículo'
            });
        }
    },

    upload: async (req, res) => {
        try {
            // Comprobar que se ha subido un archivo (multer lo maneja en req.file)
            if (!req.file) {
                return res.status(400).json({
                    status: 'error',
                    message: 'No se ha subido ninguna imagen'
                });
            }

            // Obtener nombre del archivo de forma multiplataforma
            const fileName = req.file.filename;
            const articleId = req.params.id;

            if (articleId) {
                // Si se proporcionó un ID, asociar la imagen al artículo
                const articleUpdated = await Article.findByIdAndUpdate(
                    articleId,
                    { image: fileName },
                    { new: true }
                );

                if (!articleUpdated) {
                    // Si el artículo no existe, eliminar el archivo subido
                    fs.unlinkSync(req.file.path);
                    return res.status(404).json({
                        status: 'error',
                        message: 'No existe el artículo para asignarle la imagen'
                    });
                }

                return res.status(200).json({
                    status: 'success',
                    article: articleUpdated
                });
            }

            // Si no hay ID, solo devolver el nombre del archivo subido
            return res.status(200).json({
                status: 'success',
                image: fileName
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error al subir la imagen'
            });
        }
    },

    getImage: (req, res) => {
        const file = req.params.image;
        const filePath = path.join(__dirname, '..', 'upload', 'articles', file);

        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }

        return res.status(404).json({
            status: 'error',
            message: 'La imagen no existe'
        });
    },

    search: async (req, res) => {
        try {
            const searchString = req.params.search;

            const articles = await Article.find({
                $or: [
                    { title: { $regex: searchString, $options: 'i' } },
                    { content: { $regex: searchString, $options: 'i' } }
                ]
            }).sort({ date: -1 });

            if (!articles || articles.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No hay artículos que coincidan con tu búsqueda'
                });
            }

            return res.status(200).json({
                status: 'success',
                articles
            });

        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error en la búsqueda'
            });
        }
    }

};

module.exports = controller;