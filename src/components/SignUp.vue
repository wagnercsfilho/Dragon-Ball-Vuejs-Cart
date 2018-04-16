<template>
  <div class="section">
    <div class="container">
      <Steps step="identificacao" />
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <form @submit.prevent="signIn">
            <div class="title">Cadastre-se</div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="name" class="input" type="name" placeholder="Nome completo">
                <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
              </p>
            </div>
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
                <button class="button is-primary">Criar seu cadastro</button>
              </p>
            </div>
            <p>Já tem um cadastro?
              <router-link to="/login">entrar</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex';
  import Steps from './Steps.vue'

  export default {
    data() {
      return {
        name: null,
        email: null,
        password: null,
      }
    },
    methods: {
      async signIn() {
        await this.$store.dispatch('signUp', {
          name: this.name,
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
