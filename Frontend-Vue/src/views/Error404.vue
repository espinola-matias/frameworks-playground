<template>
  <div class="center" style="margin-top: 60px; min-height: 500px;">
    <h1 class="subheader" style="color: #42b983; font-size: 48px;">
      404
    </h1>
    <h2>Página no encontrada</h2>
    <p style="font-size: 18px; color: #666; margin: 20px 0;">
      La página que estás buscando no existe o ha cambiado de lugar.
    </p>
    <RouterLink to="/inicio" class="btn btn-success" style="margin: 0 auto;">
      Volver al inicio
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
