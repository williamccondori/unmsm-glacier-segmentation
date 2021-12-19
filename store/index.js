export const state = () => ({
  project: {},
  projects: []
})

export const actions = {
  async fetchProjects({ commit }) {
    // const response = await axios.get('/api/projects')
    commit('setProjects', [])
  },
  async addProject({ commit }, project) {
    // const response = await axios.post('/api/projects', project)
    commit('addProject', { ...project })
  }
}

export const mutations = {
  setProjects(state, projects) {
    state.projects = projects
  },
  addProject(state, project) {
    state.projects.push(project)
  }
}
