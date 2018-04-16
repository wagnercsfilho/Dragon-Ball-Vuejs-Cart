<template>
  <div class="section">
    <div class="container">
      <Steps step="identificacao" />
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <form @submit.prevent="signIn">
            <div class="title">Identificação</div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="email" class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="password" class="input" type="password" placeholder="Senha">
                <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-primary">Entrar</button>
              </p>
            </div>
            <p>não tem cadastro?
              <router-link to="/signup">cadastre-se</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Steps from './Steps.vue'
  import {
    mapActions
  } from 'vuex';

  export default {
    data() {
      return {
        email: null,
        password: null,
      }
    },
    methods: {
      async signIn() {
        await this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password
        });
        this.$router.push({
          path: 'address'
        });
      }
    },
    components: {
      Steps,
    }
  }
</script>
