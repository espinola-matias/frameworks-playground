import React, { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { Sidebar } from './Sidebar';
import { Articles } from './Articles';
import { articleService } from '../services/articleService';

export const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    articleService
      .getArticles(false)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setArticles([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Slider title="Blog" size="small" />

      <div className="center">
        <section id="content">
          <h2 className="subheader">Todos los artículos</h2>
          <Articles articles={articles} loading={loading} />
        </section>

        <Sidebar />

        <div className="clearfix"></div>
      </div>
    </>
  );
};
