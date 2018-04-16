import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';
import VueMask from 'v-mask'
import './assets/sass/main.scss';
import App from './App';
import router from './router';
import firebase from './firebase';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueCurrencyFilter, {
  symbol: 'R$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
});
Vue.use(VueMask);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('setUser', user.toJSON());
    store.commit('setAppReady');
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
