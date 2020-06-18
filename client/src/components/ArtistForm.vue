<template>
  <div class="pure-u-1-4">
    <form @submit.prevent="searchArtists">
      <input type="text" placeholder="Search artists by name" v-model="name" />
      <span class="validation-container" v-if="validationError">{{validationError}}</span>
    </form>
  </div>
</template>

<script>
export default {
  name: "ArtistForm",
  data() {
    return {
      name: null,
      validationError: null,
      artists: {}
    };
  },
  methods: {
    searchArtists() {
      const searchInput = this.name;
      if (!this.name) {
        this.validationError = "Artist name cannot be empty";
        this.$emit("clearSearchResults");
        return;
      }

      this.$emit("getArtists", searchInput);
      this.name = null;
      this.validationError = null;
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

.validation-container {
  display: block;
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

@media only screen and (max-width: 624px) {
  input[type="submit"] {
    display: none;
  }
}
</style>
