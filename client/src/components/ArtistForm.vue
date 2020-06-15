<template>
  <div class="pure-u-1-4">
    <form @submit.prevent="searchArtists">
      <input type="text" placeholder="Search artists" v-model="name" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "ArtistForm",
  data() {
    return {
      name: null,
      artists: {}
    };
  },
  methods: {
    searchArtists() {
      const searchInput = this.name;
      this.$emit("getArtists", searchInput);
      this.name = null;
    }
  }
};
</script>

<style scoped>
input[type="text"] {
  width: 60%;
  border: 2px solid lightgray;
  border-radius: 4px;
  padding: 10px 10px;
  line-height: 10px;
}

input[type="submit"] {
  padding: 10px 10px;
  line-height: 10px;
  margin-right: 100px;
}

form {
  text-align: left;
}

@media only screen and (max-width: 624px) {
  input[type="submit"] {
    display: none;
  }
}
</style>
