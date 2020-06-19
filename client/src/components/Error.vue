<template>
  <div class="error-container">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["message"]
};
</script>

<style scoped>
.error-container {
  margin-top: 4px;
  text-align: left;
  font-size: 13px;
}
</style>