<script setup lang="ts">
import { ref } from 'vue';
import { useApiStore } from '@/stores/api';
import axios from 'axios';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

const isLoading = ref(true);
const url = useApiStore();
const days = ref<any[]>([]);

axios.get(`${url.api}/days`).then((res) => {
  if (res.status === 200) {
    days.value = res.data;
    isLoading.value = false;
  }
});
</script>

<template>
  <LoadingSpinner v-if="isLoading" />

  <ul v-else class="days" id="days">
    <li v-for="(item, index) in days" :key="index">
      <router-link :to="`/wordList/${index + 1}`">
        DAY {{ item.day }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
.days {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.days li {
  flex: 20% 0 0;
  box-sizing: border-box;
  padding: 10px;
}

.days a {
  display: block;
  padding: 20px 0;
  font-weight: bold;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: #353535;
}

.days a:hover {
  background-color: #284b63;
}
</style>
