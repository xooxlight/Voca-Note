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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: ['pageStr'],

  setup(props) {
    const route = useRoute();
    const dayCount = ref(0);

    watch(props, () => {
      if (props.pageStr === 'DAY') {
        dayCount.value = route.params.dayId;
      }
    });
    return {
      dayCount,
    };
  },
};
</script>
