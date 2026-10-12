import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { articleService } from '../services/articleService';

export const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (isEdit && id) {
      articleService
        .getArticle(id)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setCurrentImage(data.image || null);
        })
        .catch((err) => {
          console.error(err);
          setStatusMessage('No se pudo cargar el artículo para editar');
          setIsSuccess(false);
        });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setStatusMessage('Por favor completa todos los campos requeridos');
      setIsSuccess(false);
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      let savedArticle;
      if (isEdit) {
        savedArticle = await articleService.update(id, { title, content });
      } else {
        savedArticle = await articleService.create({ title, content });
      }

      const targetId = isEdit ? id : savedArticle._id;

      if (selectedFile && targetId) {
        try {
          await articleService.uploadImage(selectedFile, targetId);
        } catch (imgErr) {
          console.error('Error al subir la imagen:', imgErr);
        }
      }

      setIsSuccess(true);
      setStatusMessage(
        isEdit
          ? 'Artículo actualizado correctamente'
          : 'Artículo creado correctamente'
      );

      setTimeout(() => {
        navigate(`/articulo/${targetId}`);
      }, 1200);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setIsSuccess(false);
      setStatusMessage(
        isEdit
          ? 'Error al actualizar el artículo'
          : 'Error al guardar el artículo'
      );
    }
  };

  return (
    <div className="center" style={{ marginTop: '30px' }}>
      <section id="content">
        <h1 className="subheader">
          {isEdit ? 'Editar artículo' : 'Crear artículo'}
        </h1>

        {statusMessage && (
          <div
            className={`alert-box ${isSuccess ? 'alert-success' : 'alert-danger'}`}
          >
            {statusMessage}
          </div>
        )}

        <form className="mid-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título del artículo</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingresa un título descriptivo..."
              required
              minLength={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Contenido</label>
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido completo del artículo..."
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="file0">Imagen (Opcional)</label>
            <input
              type="file"
              id="file0"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />

            {isEdit && currentImage && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666' }}>
                  Imagen actual:
                </p>
                <img
                  src={articleService.getImageUrl(currentImage)}
                  alt="Imagen actual"
                  style={{
                    width: '120px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
            )}
          </div>

          <div className="clearfix"></div>

          <div style={{ marginTop: '20px' }}>
            <button type="submit" className="btn btn-success" disabled={submitting}>
              {submitting
                ? 'Guardando...'
                : isEdit
                ? 'Actualizar artículo'
                : 'Publicar artículo'}
            </button>
          </div>
        </form>
      </section>

      <Sidebar />

      <div className="clearfix"></div>
    </div>
  );
};
