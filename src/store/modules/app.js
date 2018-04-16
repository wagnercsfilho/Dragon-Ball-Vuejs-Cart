const state = {
  isReady: false
}

const getters = {
  isAppReady: state => state.isReady
}

const mutations = {
  setAppReady(state) {
    state.isReady = true;
  },
}

export default {
  state,
  getters,
  mutations,
}
