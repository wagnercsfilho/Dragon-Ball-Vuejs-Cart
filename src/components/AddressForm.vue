<template>
  <div class="modal--container" @click="onclose()">
    <div class="modal--content" @click.stop="() => {}">
      <div class="subtitle">Novo endereço</div>
      <form @submit.prevent="createAddress">
        <div class="field">
          <label class="label">* Nome do destinatário</label>
          <div class="control">
            <input v-model="form.destinatario" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">* Cep</label>
          <div class="control">
            <input v-mask="'#####-###'" v-bind:class="{ 'is-danger': formErrors.cep, 'is-success': formSuccess.cep}" @blur="findAddressByCep" v-model="form.cep" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">* Endereço</label>
          <div class="control">
            <input v-model="form.endereco" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">Número</label>
          <div class="control">
            <input v-model="form.numero" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">Complemento</label>
          <div class="control">
            <input v-model="form.complemento" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">Ponto de referência</label>
          <div class="control">
            <input v-model="form.referencia" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">Bairro</label>
          <div class="control">
            <input v-model="form.bairro" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">Cidade</label>
          <div class="control">
            <input v-model="form.cidade" class="input" type="text" placeholder="">
          </div>
        </div>
        <div class="field">
          <label class="label">Estado</label>
          <div class="control">
            <input v-model="form.estado" class="input" type="text" placeholder="">
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary">Salvar endereço</button>
          </div>
          <div class="control">
            <button type="button" @click="onclose()" class="button">Voltar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    props: ["onclose", "address"],
    data() {
      return {
        form: {
          destinatario: null,
          cep: null,
          endereco: null,
          numero: null,
          complemento: null,
          referencia: null,
          bairro: null,
          cidade: null,
          estado: null
        },
        formErrors: {
          cep: false
        },
        formSuccess: {
          cep: false,
        }
      };
    },
    methods: {
      async createAddress() {
        if (_.isEmpty(this.form.destinatario) || _.isEmpty(this.form.endereco) || _.isEmpty(this.form.cep)) {
          alert('Preencha os campos obrigatórios');
          return;
        }
        if (this.address) {
          await this.$store.dispatch("updateAddress", this.form);
        } else {
          await this.$store.dispatch("createAddress", this.form);
        }
        this.onclose();
      },
      async findAddressByCep(e) {
        const cep = e.target.value;
        if (cep) {
          try {
            const result = await fetch(`https://viacep.com.br/ws/${e.target.value}/json/`).then(result => result.json());
            if (result && !result.erro) {
              this.formErrors.cep = false;
              this.formSuccess.cep = true;
              this.form.bairro = result.bairro;
              this.form.cep = result.cep;
              this.form.complemento = result.complemento;
              this.form.cidade = result.localidade;
              this.form.endereco = result.logradouro;
              this.form.estado = result.uf;
            } else {
              throw 'Cep não encontrado!'
            }
          } catch (error) {
            this.formSuccess.cep = true;
            this.formErrors.cep = true;
          }
        }
      }
    },
    created() {
      if (this.address) {
        this.form = {
          ...this.address
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .modal--container {
    background: rgba($color: #000000, $alpha: 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9000;
    padding: 16px;
    overflow: hidden;
  }

  .modal--content {
    background: white;
    border-radius: 8px;
    width: 500px;
    padding: 16px;
    overflow-y: auto;
    height: 100%;
  }

  @media screen and (max-width: 600px) {
    .modal--content {
      margin: 16px;
      padding: 16px;
      width: 100%;
    }
  }
</style>
