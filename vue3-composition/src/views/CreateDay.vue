<template>
  <LoadingSpinner v-if="isLoading" />

  <template v-else>
    <h2>
      현재 일수 :<span id="dayCount">{{ days.length }}</span
      >일
    </h2>
    <button
      v-if="days && days.length > 0"
      type="button"
      class="btnDelete"
      @click="deleteDay"
    >
      날짜 삭제
    </button>
    <button type="button" class="btnCreate" @click="createDay">
      날짜 추가
    </button>
  </template>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore } from '@/stores/api';
import axios from 'axios';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const isLoading = ref(true);
    const router = useRouter();
    const url = useApiStore();
    const days = ref([]);

    axios.get(`${url.api}/days`).then((res) => {
      if (res.status === 200) {
        days.value = res.data;
        isLoading.value = false;
      }
    });

    const deleteDay = () => {
      if (window.confirm('마지막 날짜를 삭제하시겠습니까?')) {
        isLoading.value = true;
        axios
          .delete(`${url.api}/days/${days.value[days.value.length - 1].day}`)
          .then((res) => {
            if (res.status === 200) {
              alert('마지막 날짜가 삭제되었습니다.');
              isLoading.value = false;
              router.push({ path: '/' });
            }
          });
      }
    };

    const createDay = () => {
      isLoading.value = true;
      axios
        .post(`${url.api}/days`, { day: days.value.length + 1 })
        .then((res) => {
          if (res.status === 201) {
            alert('날짜가 추가되었습니다.');
            isLoading.value = false;
            router.push({ path: '/' });
          }
        });
    };

    return { isLoading, days, deleteDay, createDay };
  },
};
</script>

<style scoped></style>
