<template>
  <header id="header">
    <div class="center">
      <!-- LOGO -->
      <div id="logo">
        <RouterLink to="/inicio" style="text-decoration: none; color: inherit;">
          <img src="/assets/images/vue.png" class="app-logo" alt="Logotipo Vue" />
          <span id="brand">
            <strong>Blog</strong>Vue
          </span>
        </RouterLink>
      </div>

      <!-- MENU -->
      <nav id="menu">
        <ul>
          <li>
            <RouterLink to="/inicio">Inicio</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog">Blog</RouterLink>
          </li>
          <li>
            <RouterLink to="/formulario">Formulario</RouterLink>
          </li>
          <li>
            <RouterLink to="/crear-articulo">Crear Artículo</RouterLink>
          </li>
        </ul>
      </nav>

      <!-- LIMPIAR FLOTADOS -->
      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
