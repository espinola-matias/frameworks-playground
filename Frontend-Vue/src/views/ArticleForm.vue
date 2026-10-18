<template>
  <div class="center" style="margin-top: 30px;">
    <section id="content">
      <h1 class="subheader">
        {{ isEdit ? 'Editar artículo' : 'Crear artículo' }}
      </h1>

      <div
        v-if="statusMessage"
        class="alert-box"
        :class="isSuccess ? 'alert-success' : 'alert-danger'"
      >
        {{ statusMessage }}
      </div>

      <form class="mid-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Título del artículo</label>
          <input
            type="text"
            name="title"
            id="title"
            v-model="title"
            placeholder="Ingresa un título descriptivo..."
            required
            minlength="3"
          />
        </div>

        <div class="form-group">
          <label for="content">Contenido</label>
          <textarea
            name="content"
            id="content"
            v-model="content"
            placeholder="Escribe el contenido completo del artículo..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="file0">Imagen (Opcional)</label>
          <input
            type="file"
            id="file0"
            accept="image/*"
            @change="onFileChange"
          />

          <div v-if="isEdit && currentImage" style="margin-top: 10px;">
            <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">
              Imagen actual:
            </p>
            <img
              :src="articleService.getImageUrl(currentImage)"
              alt="Imagen actual"
              style="width: 120px; height: 80px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc;"
            />
          </div>
        </div>

        <div class="clearfix"></div>

        <div style="margin-top: 20px;">
          <button type="submit" class="btn btn-success" :disabled="submitting">
            {{
              submitting
                ? 'Guardando...'
                : isEdit
                ? 'Actualizar artículo'
                : 'Publicar artículo'
            }}
          </button>
        </div>
      </form>
    </section>

    <Sidebar />

    <div class="clearfix"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import { articleService } from '../services/articleService';

const route = useRoute();
const router = useRouter();

const title = ref('');
const content = ref('');
const selectedFile = ref(null);
const currentImage = ref(null);

const submitting = ref(false);
const statusMessage = ref(null);
const isSuccess = ref(true);

const id = route.params.id;
const isEdit = computed(() => Boolean(id));

onMounted(async () => {
  if (id) {
    try {
      const data = await articleService.getArticle(id);
      title.value = data.title;
      content.value = data.content;
      currentImage.value = data.image || null;
    } catch (err) {
      console.error(err);
      statusMessage.value = 'No se pudo cargar el artículo para editar';
      isSuccess.value = false;
    }
  }
});

const onFileChange = (e) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};

const handleSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    statusMessage.value = 'Por favor completa todos los campos requeridos';
    isSuccess.value = false;
    return;
  }

  submitting.value = true;
  statusMessage.value = null;

  try {
    let savedArticle;
    if (isEdit.value) {
      savedArticle = await articleService.update(id, {
        title: title.value,
        content: content.value
      });
    } else {
      savedArticle = await articleService.create({
        title: title.value,
        content: content.value
      });
    }

    const targetId = isEdit.value ? id : savedArticle._id;

    if (selectedFile.value && targetId) {
      try {
        await articleService.uploadImage(selectedFile.value, targetId);
      } catch (imgErr) {
        console.error('Error al subir la imagen:', imgErr);
      }
    }

    isSuccess.value = true;
    statusMessage.value = isEdit.value
      ? 'Artículo actualizado correctamente'
      : 'Artículo creado correctamente';

    setTimeout(() => {
      router.push(`/articulo/${targetId}`);
    }, 1200);
  } catch (err) {
    console.error(err);
    submitting.value = false;
    isSuccess.value = false;
    statusMessage.value = isEdit.value
      ? 'Error al actualizar el artículo'
      : 'Error al guardar el artículo';
  }
};
</script>
