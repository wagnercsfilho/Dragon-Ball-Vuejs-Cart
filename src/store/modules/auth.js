import api from '../../api'

const state = {
  user: null
}

const getters = {
  currentUser: state => state.user
}

const actions = {
  async signIn({ commit }, { email, password }) {
    const user = await api.signIn(email, password);
    commit('setUser', user);
  },
  async signUp({ commit }, { name, email, password }) {
    let user = await api.signUp(name, email, password);
    commit('setUser', user);
  },
  async signOut({ commit }) {
    await api.signOut();
    commit('setCartItems', { items: [] });
    commit('setSelectedAddress', null);
    commit('setAddresses', []);
    commit('setUser', null);
    return;
  },
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
