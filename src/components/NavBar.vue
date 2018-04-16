<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <logo />
        </router-link>

        <a @click="activator = !activator" data-target="navv" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navv" class="navbar-menu" v-bind:class="{ 'is-active': activator }">
        <div class="navbar-end">

          <router-link class="navbar-item" to="login" v-if="!currentUser">
            Olá, faça seu login
          </router-link>
          <a class="navbar-item" v-if="currentUser">
                  Olá, <strong>{{ currentUser.displayName }}!</strong>
            </a>
          <a @click="signOut" class="navbar-item" v-if="currentUser">
                  Sair
            </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import Logo from "./Logo";
  export default {
    data() {
      return {
        activator: false
      };
    },
    computed: mapGetters(["currentUser"]),
    methods: {
      async signOut() {
        await this.$store.dispatch("signOut");
        this.$router.push({
          path: '/'
        });
      }
    },
    components: {
      Logo
    }
  };
</script>
