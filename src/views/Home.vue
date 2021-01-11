<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="map" ref="map" />
    <div class="getCurrentLocation" @click="panToCurrentLocation">
      現在地を取得
    </div>

    <div class="infoWindow" v-if="clusterChildren.length > 0 || placeDetail">
      <div><a href="#" @click.prevent="closeInfoWindow">[ 閉じる ]</a></div>
      <ul v-if="clusterChildren.length > 0">
        <li v-for="marker in clusterChildren" :key="marker.properties.name">
          <a href="#" @click.prevent="markerClickHandler(marker)">{{
            marker.properties.name
          }}</a>
        </li>
      </ul>

      <div v-if="placeDetail">
        <h2>{{ placeDetail.markerName }}</h2>
        <div>
          <a :href="placeDetail.url" target="_blank">Google Mapで開く</a>
        </div>
        <div>API NAME: {{ placeDetail.name }}</div>
        <div>
          Website:
          <a :href="placeDetail.website" target="_blank">{{
            placeDetail.website
          }}</a>
        </div>
        <div>
          Tel:
          <a :href="'tel:' + placeDetail.formatted_phone_number">{{
            placeDetail.formatted_phone_number
          }}</a>
        </div>
        <div>
          Rating: {{ placeDetail.rating }} (クチコミ
          {{ placeDetail.user_ratings_total }}件)
        </div>
        <div>Address: {{ placeDetail.vicinity }}</div>
        <div v-if="placeDetail.photoUrls.length > 0">
          <div class="photos">
            <span v-for="url in placeDetail.photoUrls" :key="url"
              ><img :src="url" :alt="placeDetail.name"
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

let google, map, place;
let Clusterer, clusterer;

export default {
  name: "Map",

  data() {
    return {
      apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY, // API KEY（MapとPlaceのみ有効にしてあるやつ）
      geoPositioning: false, // 現在地を取得中かどうか

      clusterChildren: [], // 選択したクラスター内のマーカー
      placeDetail: null, // 選択した店の詳細情報

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
        maxZoom: 19,

        // UI非表示
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
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

    // FIXME: とりあえず動作確認だけ… ゆるして
    window.clusterClickHandler = this.clusterClickHandler;
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
    google.maps.event.addListenerOnce(
      map,
      "tilesloaded",
      this.clustererBuilder
    );
  },

  methods: {
    /**
     * Super Clusterを初期化
     */
    async clustererBuilder() {
      Clusterer = await window.SuperClusterAdapterLoader.getClusterer();

      // クラスタを初期化
      clusterer = new Clusterer.Builder(map)
        .withRadius(250)
        .withMaxZoom(19)
        .withCustomMarkerIcon(this.markerIconByGenre)
        .withMarkerClick(this.markerClickHandler)
        .build();

      // GeoJSONをロード
      this.loadGeoJson();
    },

    /**
     * GeoJSONをロード
     */
    async loadGeoJson() {
      try {
        const geojson = await fetch("all.geojson").then(res => res.json());
        clusterer.load(geojson);
      } catch (err) {
        console.log("Cannot fetch GeoJSON data for this example", err);
      }
    },

    /**
     * これ以上ズームできない状態でクラスターがクリックされたとき
     */
    clusterClickHandler(markers) {
      this.clusterChildren = markers;
      this.placeDetail = null;
    },

    /**
     * マーカーがクリックされたとき
     */
    markerClickHandler(marker, event) {
      if (event) {
        map.panTo(event.latLng);
      }

      place.getDetails(
        {
          placeId: marker.placeId || marker.properties.place,
          fields: [
            "formatted_address",
            "name",
            "photo",
            "url",
            "vicinity",
            "formatted_phone_number",
            "website",
            "rating",
            "user_ratings_total"
          ]
        },
        (place, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.clusterChildren = [];
            this.placeDetail = place;
            this.placeDetail.markerName =
              marker.title || marker.properties.name;
            this.placeDetail.photoUrls = this.placeDetail.photos
              ? this.placeDetail.photos
                  .splice(0, 1)
                  .map(photo => photo.getUrl({ maxWidth: 300, maxHeight: 300 }))
              : [];
          }
        }
      );
    },

    /**
     * 情報ウィンドウを閉じる
     */
    closeInfoWindow() {
      this.clusterChildren = [];
      this.placeDetail = null;
    },

    /**
     * ジャンルからマーカーのアイコンを設定
     */
    markerIconByGenre() {
      // console.log(marker.properties.genre);
      return "https://jawj.github.io/OverlappingMarkerSpiderfier/marker.svg";
    },

    /**
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

    /**
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
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 2;
  z-index: 1;
}

.infoWindow {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 330px;
  max-height: 80%;
  word-break: break-all;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 13px;
  padding: 5px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.photos {
  span {
    display: inline-block;
    vertical-align: top;
    margin: 5px;
  }

  img {
    max-width: 300px;
  }
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
