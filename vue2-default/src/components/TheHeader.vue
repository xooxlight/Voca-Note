<template>
  <h1>
    Voca Note
    <span v-if="this.pageStr !== ''">
      <template v-if="this.pageStr === 'DAY'">: DAY {{ dayCount }}</template>
      <template v-else>: {{ pageStr }}</template>
    </span>
  </h1>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    pageStr: String,
  },
  data() {
    return {
      dayCount: 0,
    };
  },
  watch: {
    $route() {
      if (this.pageStr === 'DAY') {
        this.dayCount = this.$route.params.dayId;
      }
    },
  },
};
</script>
