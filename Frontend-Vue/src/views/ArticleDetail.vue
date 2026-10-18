<template>
  <div class="center" style="margin-top: 30px;">
    <section id="content">
      <div v-if="loading" class="loading-box">
        <p>⏳ Cargando detalle del artículo...</p>
      </div>

      <div v-else-if="!article" class="alert-box alert-danger">
        <p>❌ El artículo solicitado no existe o ha sido eliminado.</p>
        <RouterLink to="/blog" class="btn">Volver al blog</RouterLink>
      </div>

      <article v-else class="article-item article-detail">
        <div class="image-wrap">
          <img :src="articleService.getImageUrl(article.image)" :alt="article.title" />
        </div>

        <h1 class="subheader">{{ article.title }}</h1>
        <span class="date">📅 Publicado el {{ formatDate(article.date) }}</span>

        <p style="white-space: pre-line;">{{ article.content }}</p>

        <div class="article-actions">
          <RouterLink :to="'/editar-articulo/' + article._id" class="btn btn-warning">
            ✏️ Editar
          </RouterLink>
          <button @click="handleDelete" class="btn btn-danger">
            🗑️ Eliminar
          </button>
          <RouterLink to="/blog" class="btn">
            Volver al blog
          </RouterLink>
        </div>

        <div class="clearfix"></div>
      </article>
    </section>

    <Sidebar />

    <div class="clearfix"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import { articleService } from '../services/articleService';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const loading = ref(true);

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    try {
      const data = await articleService.getArticle(id);
      article.value = data;
    } catch (err) {
      console.error(err);
      article.value = null;
    } finally {
      loading.value = false;
    }
  } else {
    loading.value = false;
  }
});

const handleDelete = async () => {
  if (!article.value) return;
  const confirmed = window.confirm(
    `¿Estás seguro de que deseas eliminar el artículo "${article.value.title}"?`
  );
  if (confirmed) {
    try {
      await articleService.delete(article.value._id);
      alert('Artículo eliminado correctamente');
      router.push('/blog');
    } catch (err) {
      console.error(err);
      alert('Error al intentar eliminar el artículo');
    }
  }
};
</script>
