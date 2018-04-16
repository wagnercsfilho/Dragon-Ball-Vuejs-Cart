<template>
  <div>
    <div v-if="!isAppReady"></div>
    <div v-if="isAppReady">
      <NavBar />
      <router-view/>
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            <p>
              <strong>BulmaShopping</strong> by <a href="https://github.com/wagnercsfilho">Wagner CS Filho</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
  } from "vuex";
  import NavBar from './components/NavBar';
  export default {
    computed: mapGetters(['isAppReady']),
    components: {
      NavBar
    }
  }
</script>

<style>

</style>
