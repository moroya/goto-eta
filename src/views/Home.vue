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
// import MarkerClusterer from "@googlemaps/markerclustererplus";

let map;

export default {
  name: "Home",

  data() {
    return {
      apiKey: "AIzaSyAtmlJCsm9b7cUifbZYrs27hEo6CobdoUI",
      mapConfig: {
        mapId: "37351173ff5408f5",
        center: {
          lat: 35.6812362,
          lng: 139.7671248
        },
        zoom: 16,
        minZoom: 9,
        maxZoom: 20,
        gestureHandling: "greedy",
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
            map.setZoom(16);
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
    this.mapConfig.center.lat = Number(
      localStorage.getItem("lastLat") || this.mapConfig.center.lat
    );
    this.mapConfig.center.lng = Number(
      localStorage.getItem("lastLng") || this.mapConfig.center.lng
    );
  },

  async mounted() {
    await new Loader({
      apiKey: this.apiKey,
      version: "weekly",
      mapIds: [this.mapConfig.mapId],
      libraries: ["places"]
    }).load();

    const google = window.google;
    map = new google.maps.Map(this.$refs.map, this.mapConfig);

    google.maps.event.addListenerOnce(map, "tilesloaded", () => {
      window.SuperClusterAdapterLoader.getClusterer().then(Clusterer => {
        if (Clusterer) {
          const clusterer = new Clusterer.Builder(map)
            .withRadius(250)
            .withMaxZoom(20)
            .withCustomMarkerIcon(
              () =>
                "https://jawj.github.io/OverlappingMarkerSpiderfier/marker.svg"
            )
            .withMarkerClick((marker, event) => {
              // debugger
              console.log(event.feature);
              // infoWindow.close();
              // var title = marker.getTitle();
              // var content = `<h2>${title}</h2>`;
              // infoWindow.setContent(content);
              // infoWindow.open(map, marker);
            })
            .build();

          fetch(
            "https://raw.githubusercontent.com/moroya/goto-eta/main/public/tokyo_pdf2.geojson"
            // "https://raw.githubusercontent.com/moroya/goto-eta/main/public/all.geojson"
          )
            .then(response => {
              return response.json();
            })
            .then(data => {
              clusterer.load(data);
            })
            .catch(err => {
              console.log("Cannot fetch GeoJSON data for this example", err);
            });
        }
      });
    });
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
  padding: 20px;
  background-color: #fff;
  z-index: 1;
}

.markerLabels {
  color: #1956a6;
  font-size: 12px;
  width: 8rem;
  height: 1rem;
  text-align: center;
  margin-top: 5px;
  margin-left: -4rem;
  line-height: 1.2;
  text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff,
    -1px -1px 0 #fff, 1px 1px 2px #000;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
