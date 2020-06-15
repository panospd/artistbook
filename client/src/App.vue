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
        <ArtistSearchList
          @onSelectArtist="selectArtist"
          :artistList="artists"
        />
      </div>
    </div>
    <div v-if="artist">
      <AverageWords :artist="artist" />
    </div>
  </div>
</template>

<script>
import ArtistForm from './components/ArtistForm.vue';
import ArtistSearchList from './components/ArtistSearchList.vue';
import AverageWords from './components/AverageWords.vue';

import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      artists: null,
      searchName: null,
      artist: null,
    };
  },
  components: {
    ArtistForm,
    ArtistSearchList,
    AverageWords,
  },
  methods: {
    async getArtists(name) {
      this.artist = null;
      this.searchName = name;

      const response = await axios.get(`/api/artists?name=${name}`);
      this.artists = response.data;
    },
    async selectArtist(artist) {
      this.artists = null;
      this.searchName = null;
      await this.getAverageWords(artist);
    },
    async getAverageWords(artist) {
      const response = await axios.post('/api/artists/work', artist);
      this.artist = response.data;
    },
  },
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
</style>
