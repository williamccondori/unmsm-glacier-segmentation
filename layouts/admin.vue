<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <a class="title header__title" @click="$router.push('/')">
        Glacier segmentation
      </a>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['home']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="1" @click="$router.push('/')">
            <a-icon type="home" /> Home
          </a-menu-item>
          <a-menu-item key="2" @click="$router.push('/settings')">
            <a-icon type="setting" /> Settings
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <nuxt />
    </a-layout>
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
