<template>
  <div>
    <div class="stats-container">
      <h3 style="text-align: left">Here are a few interesting stats for {{artist.name}}</h3>
      <div class="stat-item">
        <label>Average number of words per song:</label>&nbsp;
        <b>{{artist.stats.avg}}</b>
      </div>
      <div class="stat-item">
        <label>Max number of words across all songs:</label>&nbsp;
        <b>{{artist.stats.max}}</b>
      </div>
      <div class="stat-item">
        <label>Min number of words across all songs:</label>&nbsp;
        <b>{{artist.stats.min}}</b>
      </div>
      <div class="stat-item">
        <label>Standard deviation across all songs:</label>&nbsp;
        <b>{{artist.stats.stDeviation}}</b>
      </div>
      <div class="stat-item">
        <label>Variance across all songs:</label>&nbsp;
        <b>{{artist.stats.variance}}</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistStats",
  props: ["artist"]
};
</script>

<style scoped>
.stat-item {
  text-align: left;
  margin-left: 15px;
  margin-bottom: 10px;
}

.stats-container {
  margin-top: 40px;
  margin-left: 210px;
}
</style>
