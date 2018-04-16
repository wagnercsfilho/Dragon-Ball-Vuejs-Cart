import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger';
import app from './modules/app';
import cart from './modules/cart';
import products from './modules/products';
import address from './modules/address';
import auth from './modules/auth';
import checkout from './modules/checkout';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    app,
    cart,
    products,
    address,
    auth,
    checkout,
  },
  strict: debug,
  plugins: [createLogger(), createPersistedState()],
});
