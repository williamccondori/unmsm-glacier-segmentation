<template>
  <a-layout class="layout layout-insecure">
    <a-card>
      <h1 class="title">Log in</h1>
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
  </a-layout>
</template>

<script>
export default {}
</script>
