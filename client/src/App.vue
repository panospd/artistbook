<template>
  <div id="app">
    <h2>Welcome to Artistbook</h2>
    <br />
    <div class="row">
      <div class="column">
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
      </div>
      <div class="column">
        <div v-if="artiststats">
          <ArtistStats :artiststats="artiststats" />
        </div>
        <div class="loader" v-if="loadingStats">
          <Loader />
        </div>
      </div>
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
      artiststats: [],
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
      this.searchName = name;

      const response = await axios.get(`/api/artists?name=${name}`);
      this.artists = response.data;
    },
    async selectArtist(artist) {
      console.log(this.artiststats);
      const test = this.artiststats.filter(a => a.mbid === artist.id);
      console.log(test);
      if (test.length > 0) {
        this.loadingStats = false;
        this.artists = null;
        this.searchName = null;
        return alert("Artist already exists");
      }

      this.loadingStats = true;
      this.artists = null;
      this.searchName = null;
      this.artiststats.push(await this.getStatistics(artist));
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
  margin-left: 10%;
}

.column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
