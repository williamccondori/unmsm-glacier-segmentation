<template>
  <a-layout class="layout__page">
    <a-breadcrumb class="layout__breadcrumb">
      <a-breadcrumb-item>
        <a href="/">Home</a>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content class="layout__content">
      <h1>{{ title }}</h1>
      <slot />
    </a-layout-content>
  </a-layout>
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
.layout__page {
  padding: 0 1rem 1rem;
}
.layout__breadcrumb {
  margin: 1rem 0;
}
.layout__content {
  margin: 0;
  padding: 1rem;
  background: white;
}
.layout__content h1 {
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
