import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slider } from './Slider';
import { Sidebar } from './Sidebar';
import { Articles } from './Articles';
import { articleService } from '../services/articleService';

export const Search = () => {
  const { search } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search) {
      setLoading(true);
      articleService
        .search(search)
        .then((data) => {
          setArticles(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setArticles([]);
          setLoading(false);
        });
    }
  }, [search]);

  return (
    <>
      <Slider title={`Búsqueda: ${search}`} size="small" />

      <div className="center">
        <section id="content">
          <h2 className="subheader">Resultados para '{search}'</h2>
          <Articles articles={articles} loading={loading} />
        </section>

        <Sidebar />

        <div className="clearfix"></div>
      </div>
    </>
  );
};
