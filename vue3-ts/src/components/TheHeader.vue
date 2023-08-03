<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  pageStr: { type: String, required: true },
});

const route = useRoute();
const dayCount = ref<number>(0);

watch(props, () => {
  if (props.pageStr === 'DAY') {
    dayCount.value = Number(route.params.dayId);
  }
});
</script>

<template>
  <h1>
    Voca Note
    <span v-if="pageStr !== ''">
      <template v-if="pageStr === 'DAY'">: DAY {{ dayCount }}</template>
      <template v-else>: {{ pageStr }}</template>
    </span>
  </h1>
</template>

<style scoped></style>
