<template>
  <div class="section">
    <div class="container">
      <Steps step="endereco" />
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="title">Endereço de entrega</div>
          <div class="notification has-text-centered">
            <a class="button is-text" @click="createAddress">Cadastrar novo enredeço</a>
          </div>
          <div class="box address" v-for="address in addresses" :key="address.id" v-bind:class="{ 'is-selected': selectedAddressId === address.id}" @click="changeSelectedAddress(address.id)">
            <div class="address__left"><input type="checkbox" :checked="selectedAddressId === address.id"></div>
            <div style="flex: 1">
              <div>{{address.destinatario}}</div>
              <div>
                {{address.endereco}} {{address.numero}} {{address.complemento}} {{address.bairro}} {{address.referencia}}
              </div>
              <div>
                {{address.cidade}} {{address.estado}} {{address.cep}}
              </div>
              <div><a @click.prevent.stop="addressDetails(address)">Detalhes</a></div>
            </div>
            <div><a @click.prevent.stop="editAddress(address)" class="button is-text">editar</a></div>
            <div><a @click.prevent.stop="removeAddress(address)" class="button is-text">remover</a></div>
          </div>
          <div class="control">
            <button :disabled="!selectedAddressId" @click="goToCheckout" type="button" class="button">Continuar</button>
          </div>
        </div>
      </div>
    </div>
    <AddressForm v-if="isFormVisible" :onclose="() => isFormVisible = false" :address="addressToEdit" />
    <AddressDetail v-if="isDetailVisible" :onclose="() => isDetailVisible = false" :address="addressToDetail" :currentPosition="currentPosition" :addressPosition="addressPosition" />
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import Steps from "./Steps.vue";
  import AddressForm from "./AddressForm.vue";
  import AddressDetail from "./AddressDetail.vue";

  export default {
    data() {
      return {
        isFormVisible: false,
        isDetailVisible: false,
        addressToEdit: null,
        addressToDetail: null,
        currentPosition: null,
        addressPosition: null
      };
    },
    computed: mapGetters({
      addresses: "allAddresses",
      selectedAddressId: "selectedAddressId",
      currentUser: "currentUser",
      products: 'cartProducts',
    }),
    methods: {
      ...mapActions(["changeSelectedAddress", "removeAddress"]),
      createAddress() {
        this.addressToEdit = null;
        this.isFormVisible = true;
      },
      editAddress(address) {
        this.addressToEdit = address;
        this.isFormVisible = true;
      },
      getCurrentPosition() {
        return new Promise((resolve, reject) => {
          if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(async position => {
              const geoLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              window.localStorage.setItem(
                "geoLocation",
                JSON.stringify(geoLocation)
              );
              resolve(geoLocation);
            });
          } else {
            reject(new Error("geolocation not working"));
          }
        });
      },
      async addressDetails(address) {
        try {
          if (!this.currentPosition) {
            this.currentPosition = await this.getCurrentPosition();
          }
          const queryString = `${address.endereco}, ${address.cidade}`;
          const result = await fetch(
            `https://us1.locationiq.org/v1/search.php?key=901a962f61e76f&q=${queryString}&format=json`
          ).then(result => result.json());
          if (!result.length) throw 'location não encontrado'
          this.addressPosition = {
            latitude: result[0].lat,
            longitude: result[0].lon
          };

          this.addressToDetail = address;
          this.isDetailVisible = true;
        } catch (error) {
          alert('Não foi possível obter os detalhes com o endereço atual');
        }
      },
      goToCheckout() {
        if (!this.selectedAddressId) {
          alert('Por favor, selecione um endereço');
          return;
        }
        this.$router.push({
          path: 'checkout'
        });
      }
    },
    created() {
      if (!this.currentUser) {
        this.$router.push({
          path: 'login'
        });
        return;
      }
      if (!this.products.length) {
        this.$router.push({
          path: '/'
        });
        return;
      }
      this.$store.dispatch("getAddresses");
      this.currentPosition = JSON.parse(
        window.localStorage.getItem("geoLocation")
      );
    },
    components: {
      Steps,
      AddressForm,
      AddressDetail,
    }
  };
</script>


<style lang="scss" scoped>
  .address {
    display: flex;
  }

  .address.is-selected {
    background: rgba($color: #ccc, $alpha: 0.3);
  }

  .address__left {
    margin-right: 16px;
  }
</style>
