<template>
  <div class="section">
    <div class="container">
      <Steps step="obrigado" />
      <div class="columns">
        <div class="column is-half is-offset-one-quarter has-text-centered">
          <div style="font-size: 48px;"><i class="fas fa-check"></i></div>
          <div class="title">Compra concluída com sucesso!</div>
          <div class="subtitle">Obrigado por comprar no BulmaShopping.</div>
          <router-link to="/">Coninuar comprando</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Steps from "./Steps.vue";
  export default {
    components: {
      Steps,
    }
  }
</script>
