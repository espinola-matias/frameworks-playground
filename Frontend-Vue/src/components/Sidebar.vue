<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
      <RouterLink to="/crear-articulo" class="btn btn-success">
        Crear artículo
      </RouterLink>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <form @submit.prevent="onSearch">
        <input
          type="text"
          name="search"
          v-model="searchString"
          placeholder="Escribe para buscar..."
          required
        />
        <input type="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();
const searchString = ref('');

const onSearch = () => {
  if (searchString.value.trim()) {
    router.push(`/buscar/${encodeURIComponent(searchString.value.trim())}`);
    searchString.value = '';
  }
};
</script>
