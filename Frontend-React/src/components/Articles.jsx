import React from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../services/articleService';

export const Articles = ({ articles = [], loading = false }) => {
  if (loading) {
    return (
      <div className="loading-box">
        <p>⏳ Cargando artículos desde el servidor...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="alert-box alert-danger">
        <p>⚠️ No hay artículos para mostrar en este momento.</p>
      </div>
    );
  }

  return (
    <div id="articles">
      {articles.map((article) => {
        const dateFormatted = article.date
          ? new Date(article.date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : 'Reciente';

        return (
          <article className="article-item" key={article._id}>
            <div className="image-wrap">
              <img src={articleService.getImageUrl(article.image)} alt={article.title} />
            </div>

            <h2>
              <Link to={`/articulo/${article._id}`}>{article.title}</Link>
            </h2>

            <span className="date">📅 Publicado el {dateFormatted}</span>

            <p className="content-preview">
              {article.content && article.content.length > 180
                ? `${article.content.substring(0, 180)}...`
                : article.content}
            </p>

            <Link to={`/articulo/${article._id}`} className="read-more">
              Leer más &rarr;
            </Link>

            <div className="clearfix"></div>
          </article>
        );
      })}
    </div>
  );
};
