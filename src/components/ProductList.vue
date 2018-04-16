<template>
  <div class="products__list">
    <div class="products__list__item" v-for="product in products" :key="product.id">
      <div class="products__list__item__image">
        <img :src="product.image" />
      </div>
      <div class="products__list__item__name">{{ product.name }}</div>
      <div class="products__list__item__price">{{ product.price | currency }}</div>
      <a @click="addProductToCart(product)" class="button is-primary">Adicionar ao carrinho</a>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';

  export default {
    computed: mapGetters({
      products: 'allProducts'
    }),
    methods: mapActions([
      'addProductToCart',
      'getAllProducts'
    ]),
    created() {
      this.getAllProducts();
    },
  }
</script>

<style lang="scss">
  .products__list {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 0;
    justify-content: space-around;
  }

  .products__list__item {
    width: 300px;
    text-align: center;
    margin: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .products__list__item__image {
    min-height: 200px;
  }

  .products__list__item__name {
    font-size: 11pt;
    line-height: 15pt;
    margin-bottom: 8px;
  }

  .products__list__item__price {
    font-size: 14pt;
    margin-bottom: 16px;
    font-weight: bold;
  }
</style>
