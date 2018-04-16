<template>
  <div class="modal--container" @click="onclose()">
    <div class="modal--content" @click.stop="() => {}">
      <div class="title">{{address.endereco}}</div>
      <div class="columns">
        <div class="column">
          <div class="subtitle">Distância da localização atual</div>
          <div v-if="distance">
            <div class="distance__number">{{distance}}km</div>
          </div>
        </div>
        <div class="column">
          <div class="subtitle">Clima</div>
          <pulse-loader :loading="!weather.the_temp"></pulse-loader>
          <div class="weather__temp" v-if="weather.the_temp">
            <div class="weather__temp__number">{{ weather.the_temp && weather.the_temp.toFixed(0) }}°</div>
            <div class="weather__temp__icon"><img width="50" :src="`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`" alt=""></div>
          </div>
        </div>
      </div>
      <div class="map">
        <div class="map__dom" ref="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  export default {
    props: ['onclose', 'address', 'currentPosition', 'addressPosition'],
    data() {
      return {
        weather: {},
        distance: null,
      }
    },
    methods: {
      async getWeather() {
        const {
          latitude,
          longitude
        } = this.addressPosition;
        const resultLocation = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`).then(result => result.json());
        const woeid = resultLocation[0].woeid;
        const resultWeather = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`).then(result => result.json());
        this.weather = resultWeather.consolidated_weather[0];
      },
      getDistance() {
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude), new google.maps.LatLng(this.addressPosition.latitude, this.addressPosition.longitude));
        this.distance = (distance / 1000).toFixed(0);
      },
      getAddressRouteMap() {
        const directionsDisplay = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(this.$refs.map, {
          center: {
            lat: Number(this.addressPosition.latitude),
            lng: Number(this.addressPosition.longitude)
          },
          scrollwheel: false,
          zoom: 14
        });

        const start = new google.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude);
        const end = new google.maps.LatLng(this.addressPosition.latitude, this.addressPosition.longitude);
        const request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.WALKING
        };
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(request, (result, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          } else {
            console.log("couldn't get directions:" + status);
          }
        });

        directionsDisplay.setMap(map);
      }
    },
    created() {
      this.getWeather();
      this.getDistance();
    },
    mounted() {
      this.getAddressRouteMap();
    },
    components: {
      PulseLoader,
    }
  };
</script>

<style lang="scss" scoped>
  .weather__temp {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .weather__temp__icon {
    flex: 1;
  }

  .weather__temp__number {
    font-size: 68px;
  }

  .distance__number {
    font-size: 48px;
  }

  .map {
    margin-top: 16px;
  }

  .map__dom {
    height: 300px;
    width: 100%;
  }

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
    width: 680px;
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
