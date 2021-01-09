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
import { Loader } from "@googlemaps/js-api-loader";

let google, map, place;

export default {
  name: "Map",

  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY, // API KEY（MapとPlaceのみ有効にしてあるやつ）
      geoPositioning: false, // 現在地を取得中かどうか

      // Google Mapの設定
      mapConfig: {
        mapId: "37351173ff5408f5", // あらかじめコンソールで作ってある地図スタイルを指定
        gestureHandling: "greedy", // スマホで2本指でズームとか出さないようにする

        // とりあえず東京駅
        center: {
          lat: 35.6812362,
          lng: 139.7671248
        },
        zoom: 16,

        // ズーム可能範囲
        minZoom: 9,
        maxZoom: 19
      }
    };
  },

  // パラメータ初期化
  created() {
    // localStorageに最後に表示した位置情報があれば上書き
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    if (lat && lng) {
      this.mapConfig.center.lat = Number(lat || this.mapConfig.center.lat);
      this.mapConfig.center.lng = Number(lng || this.mapConfig.center.lng);
    }
  },

  // DOM初期化
  async mounted() {
    // Google Map SDKをロードする
    if (!window.google) {
      await new Loader({
        apiKey: this.apiKey,
        version: "weekly",
        mapIds: [this.mapConfig.mapId],
        libraries: ["places"] // Place APIを有効化
      }).load();
    }

    // Google Mapを初期化
    google = window.google;
    map = new google.maps.Map(this.$refs.map, this.mapConfig);

    // Place APIを初期化
    place = new google.maps.places.PlacesService(map);

    // 初回のみ、タイル読み込みが完了したらGeoJSONをロード
    google.maps.event.addListenerOnce(map, "tilesloaded", this.loadGeoJson);
  },

  methods: {
    /*
     * GeoJSONをロードしてクラスタリング
     */
    async loadGeoJson() {
      // Superclusterを初期化
      const Clusterer = await window.SuperClusterAdapterLoader.getClusterer();

      if (!Clusterer) return;

      // クラスタを初期化
      const clusterer = new Clusterer.Builder(map)
        .withRadius(250)
        .withMaxZoom(19)
        .withCustomMarkerIcon(this.markerIconByGenre)
        .withMarkerClick(this.markerClickHandler)
        .build();

      // GeoJSONをロード
      try {
        const geojson = await fetch("tokyo_pdf2.geojson").then(res =>
          res.json()
        );
        clusterer.load(geojson);
      } catch (err) {
        console.log("Cannot fetch GeoJSON data for this example", err);
      }
    },

    /*
     * マーカーがクリックされたとき
     */
    markerClickHandler(marker, event) {
      map.panTo(event.latLng);

      place.getDetails(
        {
          placeId: marker.placeId,
          fields: [
            "formatted_address",
            "name",
            "photo",
            "url",
            "vicinity",
            "formatted_phone_number",
            "website",
            "rating",
            "reviews",
            "user_ratings_total"
          ]
        },
        (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);
          }
        }
      );
    },

    /*
     * ジャンルからマーカーのアイコンを設定
     */
    markerIconByGenre() {
      // console.log(marker.properties.genre);
      return "https://jawj.github.io/OverlappingMarkerSpiderfier/marker.svg";
    },

    /*
     * 現在位置を取得して地図をパン
     */
    panToCurrentLocation() {
      // Geolocationをサポートしていないブラウザがあるのかよ。たまにあるんだよなぁ
      if (!navigator.geolocation) {
        this.handleLocationError();
      }

      // 現在地を取得開始（UIに反映）
      this.geoPositioning = true;

      // 現在位置を取得
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // 位置をlocalStorageに保存しておく
          // TODO: 最後に表示した位置のほうがいいと思う
          localStorage.setItem("lat", pos.lat);
          localStorage.setItem("lng", pos.lng);

          // 地図をパン
          map.setZoom(16);
          map.panTo(pos);
          this.geoPositioning = false;
        },
        // エラーハンドリング
        this.handleLocationError
      );
    },

    /*
     * 現在位置の取得エラーハンドリング
     */
    handleLocationError(err) {
      if (!err) {
        console.log("Geolocation is not supported for this Browser/OS");
      } else if (err.code === 0) {
        console.log("Unknown error");
      } else if (err.code === 1) {
        console.log("Permission denied");
      } else if (err.code === 2) {
        console.log("Position unavailable");
      } else if (err.code === 3) {
        console.log("Timed out");
      }

      this.geoPositioning = false;
    }
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
