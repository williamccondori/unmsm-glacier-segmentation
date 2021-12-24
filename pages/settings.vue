<template>
  <Page title="Settings">
    <Subtitle label="Profile" />
    <div class="page__form">
      <a-form-model :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="Name">
          <a-input type="text" placeholder="Enter your name" />
        </a-form-model-item>
        <a-form-model-item label="Last name">
          <a-input type="text" placeholder="Enter your last name" />
        </a-form-model-item>
        <a-form-model-item label="E-mail">
          <a-input type="email" disabled />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
          <a-button type="primary" block>Save changes</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <Subtitle label="Change password" />
    <div class="page__form">
      <a-form-model :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="New password">
          <a-input type="password" placeholder="Enter your new password" />
        </a-form-model-item>
        <a-form-model-item label="Repeat new password">
          <a-input type="password" placeholder="Repeat your new password" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
          <a-button type="danger" block>Change password</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </Page>
</template>

<script>
import Page from '~/components/Page.vue'
import Subtitle from '~/components/Subtitle.vue'
export default {
  components: {
    Page,
    Subtitle
  },
  layout: 'admin'
}
</script>

<style scoped>
.page__form {
  display: grid;
  justify-content: center;
  grid-template-columns: 25rem;
}
</style>
