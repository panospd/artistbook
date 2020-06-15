<template>
  <div id="app">
    <h2>Welcome to Artistbook</h2>
    <br />
    <div style="margin-left:22%">
      <ArtistForm class="artist-form" @getArtists="getArtists" />
      <div v-if="artists" class="artist-list" style="margin-top: 1%">
        <div style="text-align: left; margin-bottom: 12px;">
          Search results for:
          <b>{{ this.searchName }}</b>
        </div>
        <ArtistSearchList @onSelectArtist="selectArtist" :artistList="artists" />
      </div>
    </div>
    <div class="loader" v-if="loadingStats">
      <Loader />
    </div>
    <div v-if="artist">
      <ArtistStats :artist="artist" />
    </div>
  </div>
</template>

<script>
import ArtistForm from "./components/ArtistForm.vue";
import ArtistSearchList from "./components/ArtistSearchList.vue";
import ArtistStats from "./components/ArtistStats.vue";
import Loader from "./components/Loader.vue";

import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      artists: null,
      searchName: null,
      artist: null,
      loadingStats: false
    };
  },
  components: {
    ArtistForm,
    ArtistSearchList,
    ArtistStats,
    Loader
  },
  methods: {
    async getArtists(name) {
      this.artist = null;
      this.searchName = name;

      const response = await axios.get(`/api/artists?name=${name}`);
      this.artists = response.data;
    },
    async selectArtist(artist) {
      this.loadingStats = true;
      this.artists = null;
      this.searchName = null;
      this.artist = await this.getStatistics(artist);
      this.loadingStats = false;
    },
    async getStatistics(artist) {
      const response = await axios.post("/api/artists/work", artist);
      return response.data;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.artist-form {
  position: relative;
}

.artist-list {
  position: absolute;
}

.loader {
  margin-top: 25px;
  margin-left: 25%;
}
</style>
