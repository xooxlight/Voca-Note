<template>
  <h1>
    Voca Note
    <span v-if="pageStr !== ''">
      <template v-if="pageStr === 'DAY'">: DAY {{ dayCount }}</template>
      <template v-else>: {{ pageStr }}</template>
    </span>
  </h1>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
});
</script>
