<template>
  <div class="steps">
    <div class="step__item" v-bind:class="{ 'is-active': step === 'carrinho' }">
      <div class="step__item__marker"><i class="fas fa-shopping-cart"></i></div>
    </div>
    <div class="step__item" v-bind:class="{ 'is-active': step === 'identificacao' }">
      <div class="step__item__marker"><i class="fas fa-user"></i></div>
    </div>
    <div class="step__item" v-bind:class="{ 'is-active': step === 'endereco' }">
      <div class="step__item__marker"><i class="fas fa-map-marker"></i></div>
    </div>
    <div class="step__item" v-bind:class="{ 'is-active': step === 'pagamento' }">
      <div class="step__item__marker"><i class="fas fa-credit-card"></i></div>
    </div>
    <div class="step__item" v-bind:class="{ 'is-active': step === 'obrigado' }">
      <div class="step__item__marker"><i class="fas fa-check"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['step']
  }
</script>


<style lang="scss" scoped>
  .steps {
    display: flex;
    flex-wrap: nowrap;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 32px;
  }

  .step__item {
    position: relative;
    z-index: 1000;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .step__item__marker {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11pt;
    padding: 8px;
    background-color: #75d2ec;
    color: #fff;
    word-wrap: break-word;
    overflow: hidden;
  }

  .step__item.is-active~.step__item .step__item__marker {
    background-color: #dbdbdb;
    color: rgba(0, 0, 0, 0.7);
    color: #bfbfbf;
  }
</style>
