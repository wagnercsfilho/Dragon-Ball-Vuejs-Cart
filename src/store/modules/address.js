import api from '../../api'

const state = {
  all: [],
  address: null,
}

const getters = {
  allAddresses: state => state.all,
  selectedAddressId: state => state.address,
  selectedAddress: state => state.all.find(a => a.id === state.address),
}

const actions = {
  async getAddresses({ commit }) {
    const addresses = await api.getAddresses()
    commit('setAddresses', addresses)
  },
  async createAddress({ commit }, data) {
    const newAddress = await api.createAddress(data);
    commit('setNewAddress', newAddress);
  },
  async updateAddress({ commit }, data) {
    await api.updateAddress(data);
    commit('updateAddress', data);
  },
  async changeSelectedAddress({ commit }, addressId) {
    commit('setSelectedAddress', addressId)
  },
  async removeAddress({ commit }, address) {
    await api.removeAddress(address);
    commit('removeAddress', address);
  }
}

const mutations = {
  setAddresses(state, addresses) {
    state.all = addresses
  },
  setNewAddress(state, address) {
    state.all.unshift(address);
  },
  updateAddress(state, address) {
    state.all = state.all.map(a => a.id === address.id ? address : a);
  },
  setSelectedAddress(state, addressId) {
    state.address = addressId;
  },
  removeAddress(state, address) {
    state.all = state.all.filter(a => a.id !== address.id);
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
