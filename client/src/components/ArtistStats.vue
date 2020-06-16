<template>
  <div>
    <div v-for="(artist, index) in artiststats" :key="artist.id">
      <div class="stats-container">
        <h3 style="text-align: left">Here are a few interesting stats for {{artist.name}}</h3>
        <div class="stat-item">
          <label>Average number of words per song:</label>&nbsp;
          <b>{{artist.stats.avg}}</b>
          <span v-if="index > 0">
            <propostional-difference
              :numbers="[artist.stats.avg, artiststats[index -1].stats.avg]"
            />
          </span>
        </div>
        <div class="stat-item">
          <label>Max number of words across all songs:</label>&nbsp;
          <b>{{artist.stats.max}}</b>
          <span v-if="index > 0">
            <propostional-difference
              :numbers="[artist.stats.max, artiststats[index -1].stats.max]"
            />
          </span>
        </div>
        <div class="stat-item">
          <label>Min number of words across all songs:</label>&nbsp;
          <b>{{artist.stats.min}}</b>
          <span v-if="index > 0">
            <propostional-difference
              :numbers="[artist.stats.min, artiststats[index -1].stats.min]"
            />
          </span>
        </div>
        <div class="stat-item">
          <label>Standard deviation across all songs:</label>&nbsp;
          <b>{{artist.stats.stDeviation}}</b>
          <span v-if="index > 0">
            <propostional-difference
              :numbers="[artist.stats.stDeviation, artiststats[index -1].stats.stDeviation]"
            />
          </span>
        </div>
        <div class="stat-item">
          <label>Variance across all songs:</label>&nbsp;
          <b>{{artist.stats.variance}}</b>
          <span v-if="index > 0">
            <propostional-difference
              :numbers="[artist.stats.variance, artiststats[index -1].stats.variance]"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PropostionalDifference from "./PropostionalDifference.vue";

export default {
  name: "ArtistStats",
  props: ["artiststats"],
  components: {
    PropostionalDifference
  }
};
</script>

<style scoped>
.stat-item {
  text-align: left;
  margin-left: 15px;
  margin-bottom: 10px;
}

h3 {
  margin-top: 0;
}
</style>
