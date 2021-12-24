<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <h1 class="title header__title">Glacier segmentation</h1>
    </a-layout-header>
    <nuxt />
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    }
  }
}
</script>

<style scoped>
.header__title {
  color: white;
}
</style>
