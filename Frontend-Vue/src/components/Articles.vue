<template>
  <div id="articles">
    <div v-if="loading" class="loading-box">
      <p>⏳ Cargando artículos desde el servidor...</p>
    </div>

    <div v-else-if="!articles || articles.length === 0" class="alert-box alert-danger">
      <p>⚠️ No hay artículos para mostrar en este momento.</p>
    </div>

    <div v-else>
      <article
        v-for="article in articles"
        :key="article._id"
        class="article-item"
      >
        <div class="image-wrap">
          <img :src="articleService.getImageUrl(article.image)" :alt="article.title" />
        </div>

        <h2>
          <RouterLink :to="'/articulo/' + article._id">{{ article.title }}</RouterLink>
        </h2>

        <span class="date">📅 Publicado el {{ formatDate(article.date) }}</span>

        <p class="content-preview">
          {{
            article.content && article.content.length > 180
              ? article.content.substring(0, 180) + '...'
              : article.content
          }}
        </p>

        <RouterLink :to="'/articulo/' + article._id" class="read-more">
          Leer más &rarr;
        </RouterLink>

        <div class="clearfix"></div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { articleService } from '../services/articleService';

defineProps({
  articles: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const formatDate = (dateString) => {
  if (!dateString) return 'Reciente';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
