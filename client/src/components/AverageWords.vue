<template>
  <div>
    <h4>
      Artist {{ artist.name }} has approximately {{ artist.avgWords }} words per
      song
    </h4>
  </div>
</template>

<script>
export default {
  name: 'AverageWords',
  props: ['artist'],
};
</script>
