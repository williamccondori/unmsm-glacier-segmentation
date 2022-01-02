<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <a class="title header__title" @click="$router.push('/')">
        Glacier segmentation
      </a>
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
