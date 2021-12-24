<template>
  <h2>
    {{ label }}
    <hr />
  </h2>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 1rem;
  font-style: italic;
}

h2 hr {
  border-color: #fefefe;
}
</style>
