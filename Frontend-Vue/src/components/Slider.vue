<template>
  <div id="slider" :class="size === 'small' ? 'slider-small' : 'slider-big'">
    <h1>{{ title }}</h1>
    <RouterLink v-if="btnText && btnUrl" :to="btnUrl" class="btn-white">
      {{ btnText }}
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  title: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'big'
  },
  btnText: {
    type: String,
    default: ''
  },
  btnUrl: {
    type: String,
    default: ''
  }
});
</script>
