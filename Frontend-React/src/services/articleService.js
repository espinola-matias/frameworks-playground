import axios from 'axios';

const API_URL = 'http://localhost:3900/api';

export const articleService = {
  // Obtener artículos (todos o últimos 5)
  getArticles: async (last = false) => {
    const url = last ? `${API_URL}/articles/5` : `${API_URL}/articles`;
    const response = await axios.get(url);
    return response.data.articles || [];
  },

  // Obtener artículo por ID
  getArticle: async (id) => {
    const response = await axios.get(`${API_URL}/article/${id}`);
    return response.data.article;
  },

  // Buscar artículos
  search: async (searchString) => {
    const response = await axios.get(`${API_URL}/search/${encodeURIComponent(searchString)}`);
    return response.data.articles || [];
  },

  // Crear artículo
  create: async (articleData) => {
    const response = await axios.post(`${API_URL}/save`, articleData);
    return response.data.article;
  },

  // Actualizar artículo
  update: async (id, articleData) => {
    const response = await axios.put(`${API_URL}/article/${id}`, articleData);
    return response.data.article;
  },

  // Eliminar artículo
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/article/${id}`);
    return response.data.article;
  },

  // Subir imagen para un artículo
  uploadImage: async (file, id) => {
    const formData = new FormData();
    formData.append('file0', file, file.name);
    const response = await axios.post(`${API_URL}/upload-image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Obtener URL de la imagen
  getImageUrl: (imageName) => {
    if (!imageName) {
      return 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80';
    }
    return `${API_URL}/get-image/${imageName}`;
  }
};
