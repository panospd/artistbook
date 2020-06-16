<template>
  <span>
    &nbsp;
    <span
      :class="[diff, difference > 0 ? green : red]"
    >({{difference > 0 ? '+' + difference + '%' : difference + '%'}})</span>
  </span>
</template>

<script>
export default {
  name: "Proportional difference",
  props: ["numbers"],
  data() {
    return {
      green: "green",
      red: "red",
      diff: "diff"
    };
  },
  computed: {
    difference() {
      const diff =
        ((this.numbers[0] - this.numbers[1]) / this.numbers[1]) * 100;

      return diff.toFixed(0);
    }
  }
};
</script>

<style scoped>
.diff {
  font-size: 11px;
  font-style: italic;
}

.green {
  color: #008000;
}

.red {
  color: red;
}
</style>