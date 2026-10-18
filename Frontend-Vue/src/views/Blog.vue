<template>
  <div>
    <Slider title="Blog" size="small" />

    <div class="center">
      <section id="content">
        <h2 class="subheader">Todos los artículos</h2>
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
    const data = await articleService.getArticles(false);
    articles.value = data;
  } catch (err) {
    console.error(err);
    articles.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
