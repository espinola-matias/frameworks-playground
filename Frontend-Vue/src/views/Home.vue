<template>
  <div>
    <Slider
      title="Bienvenido a la Aplicación de Blog desarrollada en Vue"
      size="big"
      btnText="Ir al blog"
      btnUrl="/blog"
    />

    <div class="center">
      <section id="content">
        <h2 class="subheader">Últimos artículos</h2>
        <Articles :articles="articles" :loading="loading" />
      </section>

      <Sidebar />

      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Slider from '../components/Slider.vue';
import Sidebar from '../components/Sidebar.vue';
import Articles from '../components/Articles.vue';
import { articleService } from '../services/articleService';

const articles = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await articleService.getArticles(true);
    articles.value = data;
  } catch (err) {
    console.error(err);
    articles.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
