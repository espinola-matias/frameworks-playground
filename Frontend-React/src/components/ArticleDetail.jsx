import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { articleService } from '../services/articleService';

export const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      articleService
        .getArticle(id)
        .then((data) => {
          setArticle(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setArticle(null);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = () => {
    if (!article) return;
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar el artículo "${article.title}"?`
    );
    if (confirmed) {
      articleService
        .delete(article._id)
        .then(() => {
          alert('Artículo eliminado correctamente');
          navigate('/blog');
        })
        .catch((err) => {
          console.error(err);
          alert('Error al intentar eliminar el artículo');
        });
    }
  };

  const dateFormatted = article?.date
    ? new Date(article.date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <div className="center" style={{ marginTop: '30px' }}>
      <section id="content">
        {loading ? (
          <div className="loading-box">
            <p>⏳ Cargando detalle del artículo...</p>
          </div>
        ) : !article ? (
          <div className="alert-box alert-danger">
            <p>❌ El artículo solicitado no existe o ha sido eliminado.</p>
            <Link to="/blog" className="btn">
              Volver al blog
            </Link>
          </div>
        ) : (
          <article className="article-item article-detail">
            <div className="image-wrap">
              <img src={articleService.getImageUrl(article.image)} alt={article.title} />
            </div>

            <h1 className="subheader">{article.title}</h1>
            <span className="date">📅 Publicado el {dateFormatted}</span>

            <p style={{ whiteSpace: 'pre-line' }}>{article.content}</p>

            <div className="article-actions">
              <Link to={`/editar-articulo/${article._id}`} className="btn btn-warning">
                ✏️ Editar
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                🗑️ Eliminar
              </button>
              <Link to="/blog" className="btn">
                Volver al blog
              </Link>
            </div>

            <div className="clearfix"></div>
          </article>
        )}
      </section>

      <Sidebar />

      <div className="clearfix"></div>
    </div>
  );
};
