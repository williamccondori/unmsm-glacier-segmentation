<template>
  <a-layout class="layout layout-insecure">
    <a-card>
      <h1 class="title">Log in</h1>
      <a-divider />
      <a-form-model
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
        @submit.prevent="loginSubmit"
      >
        <a-form-model-item prop="username" label="Username">
          <a-input
            v-model="loginForm.username"
            type="text"
            placeholder="Enter your username"
          />
        </a-form-model-item>
        <a-form-model-item prop="password" label="Password">
          <a-input
            v-model="loginForm.password"
            type="password"
            placeholder="Enter your password"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
          <a-button
            block
            type="primary"
            html-type="submit"
            :loading="loginFormIsLoading"
            >Log in</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormIsLoading: false,
      loginFormRules: {
        username: [{ required: true, message: 'Please input your username!' }],
        password: [{ required: true, message: 'Please input your password!' }]
      }
    }
  },
  methods: {
    async loginSubmit() {
      this.$refs.loginFormRef.validate(async (isValid) => {
        if (isValid) {
          try {
            this.loginFormIsLoading = true
            await this.$auth.loginWith('local', {
              data: this.loginForm
            })
          } catch (error) {
            this.$message.error(error.response?.data?.detail || error.message)
          } finally {
            this.loginFormIsLoading = false
          }
        }
      })
    }
  }
}
</script>
