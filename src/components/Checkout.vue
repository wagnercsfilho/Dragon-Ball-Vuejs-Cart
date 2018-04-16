<template>
  <div class="section">
    <div class="container">
      <Steps step="pagamento" />
      <div class="columns">
        <div class="column">
          <div class="cart" ref="cart">
            <div class="subtitle">Seu carrinho</div>
            <ul>
              <li v-for="product in products" :key="product.id">
                {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
              </li>
            </ul>
            <p>Total: {{ total | currency }}</p>
          </div>
        </div>
        <div class="column">
          <div class="address">
            <div class="subtitle">Endereço de entrega</div>
            <div>{{address.destinatario}}</div>
            <div>
              {{address.endereco}} {{address.numero}} {{address.complemento}} {{address.bairro}} {{address.referencia}}
            </div>
            <div>
              {{address.cidade}} {{address.estado}} {{address.cep}}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="button is-primary" :disabled="!products.length" @click="checkout(products)">Concluir compra</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import Steps from "./Steps.vue";
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts',
        checkoutStatus: 'checkoutStatus',
        total: 'cartTotalPrice',
        address: "selectedAddress"
      })
    },
    methods: {
      checkout(products) {
        this.$store.dispatch('checkout', products);
        this.$router.push({
          path: 'finish'
        });
      }
    },
    components: {
      Steps,
    }
  }
</script>

<style scoped>
  .cart,
  .address {
    background-color: #fafafa;
    padding: 16px;
  }
</style>
