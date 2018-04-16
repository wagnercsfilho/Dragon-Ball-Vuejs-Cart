<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-quarters">
        <section class="hero is-light">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Bem-vindo ao BulmaShopping!
              </h1>
              <h2 class="subtitle">
                Encontre os melhores bonecos de Dragon Ball.
              </h2>
            </div>
          </div>
        </section>
        <ProductList />
      </div>
      <div class="column">
        <ShoppinCart />
      </div>
    </div>
  </div>
</template>

<script>
  import ShoppinCart from './ShoppingCart.vue'
  import ProductList from './ProductList.vue'

  export default {
    components: {
      ShoppinCart,
      ProductList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
