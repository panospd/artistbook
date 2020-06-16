<template>
  <div class="artist-search-item">
    <div class="card" @click.prevent="$emit('selectArtist', {id: artist.id, name: artist.name})">
      <div class="container">
        <span style as="h4">
          <b>{{artist.name}}</b>
        </span>,
        <span>{{artist.gender}}</span>,
        <span>{{artist.country.name}}</span>
        <div style="margin-top: 4px; font-size: 14px">
          <span>{{artist.disambiguation.join(', ')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistSearchItem",
  props: ["artist"]
};
</script>

<style scoped>
.artist-search-item {
  text-align: left;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 10px 0;
  min-height: 30px;
  max-width: 70%;
  min-width: 70%;
}

@media only screen and (max-width: 700px) {
  .card {
    max-width: 50%;
    min-width: 50%;
  }
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

/* Add some padding inside the card container */
.container {
  padding: 1px 16px;
}
</style>
