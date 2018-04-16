<template>
  <div class="cart" ref="cart">
    <div class="subtitle">Seu Carrinho</div>
    <p v-show="!products.length"><i>Adicione produtos para o carrinho.</i></p>
    <ul>
      <li class="cart__item" v-for="product in products" :key="product.id">
        {{ product.title }} - <strong>{{ product.price | currency }} x {{ product.quantity }}</strong>
      </li>
    </ul>
    <p class="cart__total">Total: <strong>{{ total | currency }}</strong></p>
    <p>
      <router-link :disabled="!products.length" class="button" to="/address">Comprar</router-link>
    </p>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        checkoutStatus: 'checkoutStatus',
        total: 'cartTotalPrice'
      })
    },
    methods: {
      checkout(products) {
        this.$store.dispatch('checkout', products)
      }
    },
    created() {
      window.onscroll = (e) => {
        const nVScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (nVScroll > 50) {
          this.$refs.cart.classList.add('cart--fixed')
        } else {
          this.$refs.cart.classList.remove('cart--fixed')
        }
      }
    },
    destroyed() {
      window.onscroll = null;
    },
  }
</script>

<style scoped>
  .cart {
    background-color: #fafafa;
    padding: 16px;
  }

  .cart--fixed {
    position: fixed;
    top: 0;
  }

  .cart__item {
    font-size: 11pt;
    margin-bottom: 8px;
  }

  .cart__total {
    font-size: 14pt;
    margin-bottom: 8px;
  }
</style>
