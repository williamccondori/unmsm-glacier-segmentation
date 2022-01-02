export const state = () => ({
  // Projects
  project: {},
  projects: [],
  // Products
  products: []
})

export const actions = {
  // Projects
  async fetchProjects({ commit }) {
    const { data } = await this.$axios.get('projects/')
    commit(
      'setProjects',
      data.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description
      }))
    )
  },
  async addProject({ commit }, project) {
    const { data } = await this.$axios.post('projects/', project)
    commit('addProject', {
      id: data.id,
      name: data.name,
      description: data.description
    })
  },
  // Products
  async fetchProducts({ commit }, searchParams) {
    const { data } = await this.$axios.get('products/', {
      params: searchParams
    })
    commit('setProducts', data)
  }
}

export const mutations = {
  // Projects
  setProjects(state, projects) {
    state.projects = projects
  },
  addProject(state, project) {
    state.projects.push(project)
  },
  // Products
  setProducts(state, products) {
    state.products = products
  }
}
