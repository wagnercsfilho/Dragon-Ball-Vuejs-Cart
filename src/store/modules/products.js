import api from '../../api'

const state = {
  all: []
}

const getters = {
  allProducts: state => state.all
}

const actions = {
  async getAllProducts ({ commit }) {
    const products = await api.getProducts();
    commit('setProducts', products);
  }
}

const mutations = {
  setProducts (state, products) {
    state.all = products
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
