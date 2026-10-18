<template>
  <div>
    <Slider :title="'Búsqueda: ' + searchString" size="small" />

    <div class="center">
      <section id="content">
        <h2 class="subheader">Resultados para '{{ searchString }}'</h2>
        <Articles :articles="articles" :loading="loading" />
      </section>

      <Sidebar />

      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Slider from '../components/Slider.vue';
import Sidebar from '../components/Sidebar.vue';
import Articles from '../components/Articles.vue';
import { articleService } from '../services/articleService';

const route = useRoute();
const searchString = ref('');
const articles = ref([]);
const loading = ref(true);

const fetchSearch = async (term) => {
  if (!term) return;
  searchString.value = term;
  loading.value = true;
  try {
    const data = await articleService.search(term);
    articles.value = data;
  } catch (err) {
    console.error(err);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSearch(route.params.search);
});

watch(
  () => route.params.search,
  (newTerm) => {
    fetchSearch(newTerm);
  }
);
</script>
