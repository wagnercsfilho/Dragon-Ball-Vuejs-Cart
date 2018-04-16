import api from '../../api'

const state = {
  checkoutStatus: null
}

const getters = {
  checkoutStatus: state => state.checkoutStatus,
}

const actions = {
  checkout({ commit, state, rootState }, products) {
    console.log(rootState);
    commit('setCheckoutStatus', 'successful');
    commit('setCartItems', { items: [] });
    commit('setSelectedAddress', null);
  },
}

const mutations = {
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
