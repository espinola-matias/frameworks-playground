import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { Formulario } from './components/Formulario';
import { ArticleDetail } from './components/ArticleDetail';
import { ArticleForm } from './components/ArticleForm';
import { Search } from './components/Search';
import { Error404 } from './components/Error404';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/articulo/:id" element={<ArticleDetail />} />
        <Route path="/crear-articulo" element={<ArticleForm />} />
        <Route path="/editar-articulo/:id" element={<ArticleForm />} />
        <Route path="/buscar/:search" element={<Search />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
