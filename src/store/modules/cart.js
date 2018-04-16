import api from '../../api'

const state = {
  added: [],
}

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.added.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.name,
        price: product.price,
        quantity,
      }
    })
  },

  cartTotalPrice: (state, getters) =>
    getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
}

const actions = {
  addProductToCart({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    const cartItem = state.added.find(item => item.id === product.id)
    if (!cartItem) {
      commit('pushProductToCart', { id: product.id })
    } else {
      commit('incrementItemQuantity', cartItem)
    }
  }
}

const mutations = {
  pushProductToCart(state, { id }) {
    state.added.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.added.find(item => item.id === id)
    cartItem.quantity++
  },

  setCartItems(state, { items }) {
    state.added = items
  },

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
