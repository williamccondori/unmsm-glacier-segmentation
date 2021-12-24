<template>
  <Page title="My projects">
    <section>
      <a-button type="primary" class="mb-1" @click="openProjectForm">
        Add project
      </a-button>
      <a-list
        item-layout="horizontal"
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
        :data-source="projects"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :title="item.name">
            <p>{{ item.description }}</p>
            <a-space>
              <a-button type="primary" @click="$router.push(`/${item.id}/map`)">
                Open
              </a-button>
              <a-button type="danger" ghost> Delete </a-button>
            </a-space>
          </a-card>
        </a-list-item>
      </a-list>
    </section>
    <a-drawer
      :visible="isProjectFormVisible"
      @close="isProjectFormVisible = false"
    >
      <h1 class="title">Add project</h1>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        @submit.prevent="submit"
      >
        <a-form-model-item prop="name" label="Name">
          <a-input
            v-model="form.name"
            type="text"
            placeholder="Enter project name"
          />
        </a-form-model-item>
        <a-form-model-item prop="description" label="Description">
          <a-input
            v-model="form.description"
            type="textarea"
            placeholder="Enter project description"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            block
            type="primary"
            html-type="submit"
            :loading="isLoading"
          >
            Save
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </Page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/Page.vue'
export default {
  components: { Page },
  layout: 'admin',
  data() {
    return {
      isLoading: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter project name'
          }
        ],
        description: [
          {
            required: true,
            message: 'Please enter project description'
          }
        ]
      },
      isProjectFormVisible: false
    }
  },
  async fetch() {
    try {
      await this.fetchProjects()
    } catch (error) {
      this.$message.error(error)
    }
  },
  computed: {
    ...mapState(['projects'])
  },
  methods: {
    ...mapActions(['fetchProjects', 'addProject']),
    reset() {
      this.form = {
        name: '',
        description: ''
      }
      this.$refs.ruleForm.resetFields()
    },
    openProjectForm() {
      this.isProjectFormVisible = true
    },
    submit() {
      this.$refs.ruleForm.validate(async (isValid) => {
        if (isValid) {
          try {
            this.isLoading = true
            await this.addProject(this.form)
            this.isProjectFormVisible = false
            this.reset()
            this.$message.success('Project added successfully')
          } catch (error) {
            this.$message.error(error.message)
          } finally {
            this.isLoading = false
          }
        }
      })
    },
    removeProject() {}
  }
}
</script>
