<template>
  <a-card class="map-card">
    <h1>{{ title }}</h1>
    <slot />
  </a-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.map-card {
  margin-bottom: 0.5rem;
}
.map-card h1 {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 1rem;
}
</style>
