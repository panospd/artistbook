<template>
  <div>
    <ul>
      <li v-for="artist in artistList.list" :key="artist.id">
        <ArtistSearchItem @selectArtist="selectArtist" :artist="artist" />
      </li>
    </ul>
  </div>
</template>

<script>
import ArtistSearchItem from "./ArtistSearchItem.vue";

export default {
  name: "ArtistSearchList",
  props: ["artistList"],
  components: {
    ArtistSearchItem
  },
  methods: {
    selectArtist(artist) {
      this.$emit("onSelectArtist", artist);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
