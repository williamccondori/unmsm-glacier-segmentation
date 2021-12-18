<template>
  <a-layout>
    <div class="login">
      <a-card>
        <span class="title">Log in</span>
        <a-divider />
        <a-form-model :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
          <a-form-model-item label="E-mail">
            <a-input type="email" placeholder="Enter your e-mail" />
          </a-form-model-item>
          <a-form-model-item label="Password">
            <a-input type="password" placeholder="Enter your password" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
            <a-button type="primary" block>Log in</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </div>
  </a-layout>
</template>

<script>
export default {}
</script>

<style scoped>
.login {
  display: grid;
  grid-template-columns: 30rem;
  grid-template-rows: auto;
  justify-content: center;
  align-content: center;
  height: 100vh;
}

.title {
  font-weight: bolder;
  font-style: italic;
  font-size: 1rem;
}
</style>
