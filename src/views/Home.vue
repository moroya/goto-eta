<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="map" ref="map" />
    <div class="getCurrentLocation" @click="panToCurrentLocation">
      現在地を取得
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { Loader } from "@googlemaps/js-api-loader";
import MarkerClusterer from "@googlemaps/markerclustererplus";

let map;

export default {
  name: "Home",

  data() {
    return {
      apiKey: "AIzaSyAtmlJCsm9b7cUifbZYrs27hEo6CobdoUI",
      mapConfig: {
        mapId: "37351173ff5408f5",
        center: {
          lat: 35.7015642,
          lng: 139.6583985
        },
        minZoom: 15,
        zoom: 16
      }
    };
  },

  methods: {
    panToCurrentLocation() {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            localStorage.setItem("lastLat", pos.lat);
            localStorage.setItem("lastLng", pos.lng);
            // infoWindow.setPosition(pos);
            // infoWindow.setContent("Location found.");
            // infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            this.handleLocationError(true, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, map.getCenter());
      }
    },

    handleLocationError(browserHasGeolocation, pos) {
      console.log(pos);
      // infoWindow.setPosition(pos);
      // infoWindow.setContent(
      //   browserHasGeolocation
      //     ? "Error: The Geolocation service failed."
      //     : "Error: Your browser doesn't support geolocation."
      // );
    }
  },

  created() {
    this.mapConfig.center.lat = Number(localStorage.getItem("lastLat") || this.mapConfig.center.lat);
    this.mapConfig.center.lng = Number(localStorage.getItem("lastLng") || this.mapConfig.center.lng);
  },

  async mounted() {
    await new Loader({
      apiKey: this.apiKey,
      version: "beta",
      mapIds: [this.mapConfig.mapId],
      libraries: ["places"]
    }).load();

    const google = window.google;
    map = new google.maps.Map(this.$refs.map, this.mapConfig);

    map.data.loadGeoJson(
      'https://raw.githubusercontent.com/terukizm/goto-eater-poc/gh-pages/geojson/tokyo/all.geojson',
      null,
      features => {
        console.log(features);
        const markers = features.map(feature => {
          const g = feature.getGeometry();
          const marker = new google.maps.Marker({
            position: g.get(0),
            data: feature
          });
          return marker;
        });

        new MarkerClusterer(map, markers, {
          imagePath:
            "https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m",
          minimumClusterSize: 10,
          gridSize: 140,

        });

        map.data.setMap(null);

        // const infoWindow = new google.maps.InfoWindow();
        // const service = new google.maps.places.PlacesService(map);
        // service.getDetails(
        //   {
        //     placeId: "ChIJ4X53Xx6MGGARagBKYZL-v00"
        //   },
        //   function(result, status) {
        //     if (status != google.maps.places.PlacesServiceStatus.OK) {
        //       alert(status);
        //       return;
        //     }
        //     debugger;
        //     var marker = new google.maps.Marker({
        //       map: map,
        //       position: result.geometry.location
        //     });
        //     var address = result.adr_address;
        //     var newAddr = address.split("</span>,");

        //     infoWindow.setContent(
        //       result.name +
        //         "<br>" +
        //         newAddr[0] +
        //         "<br>" +
        //         newAddr[1] +
        //         "<br>" +
        //         newAddr[2]
        //     );
        //     infoWindow.open(map, marker);
        //   }
        // );
      }
    );
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.map {
  width: 100vw;
  height: 100vh;
}

.getCurrentLocation {
  position: absolute;
  left: 5px;
  bottom: 30px;
  background-color: #fff;
  z-index: 1;
}

.gm-style img {
  left: 0;
}
</style>
