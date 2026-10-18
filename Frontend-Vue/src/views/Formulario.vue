<template>
  <div class="center" style="margin-top: 30px;">
    <section id="content">
      <h1 class="subheader">Formulario de Contacto</h1>

      <form class="mid-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            v-model="user.nombre"
            placeholder="Tu nombre..."
            required
          />
        </div>

        <div class="form-group">
          <label for="apellidos">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            v-model="user.apellidos"
            placeholder="Tus apellidos..."
            required
          />
        </div>

        <div class="form-group">
          <label for="bio">Biografía</label>
          <textarea
            name="bio"
            id="bio"
            v-model="user.bio"
            placeholder="Cuéntanos sobre ti..."
          ></textarea>
        </div>

        <div class="form-group" style="text-align: left; margin: 15px 0;">
          <label style="display: block; margin-bottom: 8px;">Género</label>
          <label style="margin-right: 15px; font-weight: normal; cursor: pointer;">
            <input
              type="radio"
              name="genero"
              value="hombre"
              v-model="user.genero"
            />
            Hombre
          </label>
          <label style="margin-right: 15px; font-weight: normal; cursor: pointer;">
            <input
              type="radio"
              name="genero"
              value="mujer"
              v-model="user.genero"
            />
            Mujer
          </label>
          <label style="font-weight: normal; cursor: pointer;">
            <input
              type="radio"
              name="genero"
              value="otro"
              v-model="user.genero"
            />
            Otro
          </label>
        </div>

        <div class="clearfix"></div>

        <input type="submit" value="Enviar Formulario" class="btn btn-success" />
      </form>

      <div
        v-if="submitted"
        class="alert-box alert-success"
        style="margin-top: 30px;"
      >
        <h3>✅ Datos recibidos del formulario:</h3>
        <p><strong>Nombre completo:</strong> {{ user.nombre }} {{ user.apellidos }}</p>
        <p><strong>Biografía:</strong> {{ user.bio || 'Sin biografía' }}</p>
        <p><strong>Género:</strong> {{ user.genero }}</p>
      </div>
    </section>

    <Sidebar />

    <div class="clearfix"></div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';

const user = reactive({
  nombre: '',
  apellidos: '',
  bio: '',
  genero: 'hombre'
});

const submitted = ref(false);

const handleSubmit = () => {
  if (user.nombre && user.apellidos) {
    submitted.value = true;
  }
};
</script>
