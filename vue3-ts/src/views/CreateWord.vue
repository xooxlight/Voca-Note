<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore } from '@/stores/api';
import axios from 'axios';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

const isLoading = ref(true);
const router = useRouter();
const url = useApiStore();
const days = ref<any[]>([]);

axios.get(`${url.api}/days`).then((res) => {
  if (res.status === 200) {
    if (res.data.length === 0) {
      alert('등록된 날짜가 없습니다.');
      router.push({ path: `/createDay` });
    } else {
      days.value = res.data;
      day.value = days.value[days.value.length - 1].day;
      isLoading.value = false;
    }
  }
});

const word = ref<any>({});
const eng = ref<string>('');
const kor = ref<string>('');
const day = ref<number>(1);

const createWord = () => {
  word.value = {
    day: day.value,
    eng: eng.value.trim(),
    kor: kor.value.trim(),
    isComplete: false,
  };

  if (word.value.eng === '' || word.value.kor === '') {
    alert('단어를 입력해주세요.');
  } else {
    isLoading.value = true;
    axios.post(`${url.api}/words`, word.value).then((res) => {
      if (res.status === 201) {
        alert('단어가 추가되었습니다.');
        isLoading.value = false;
        router.push({ path: `/wordList/${day.value}` });
      }
    });
  }
};
</script>

<template>
  <LoadingSpinner v-if="isLoading" />

  <form v-else @submit.prevent>
    <div class="inputWrap">
      <label for="eng">Eng</label>
      <input type="text" id="eng" placeholder="Moon" v-model="eng" />
    </div>
    <div class="inputWrap">
      <label for="kor">Kor</label>
      <input type="text" id="kor" placeholder="달" v-model="kor" />
    </div>
    <div class="inputWrap">
      <label for="dayCount">Day</label>
      <select id="dayCount" v-model="day">
        <option v-for="item in days" :key="item.day" :value="item.day">
          {{ item.day }}
        </option>
      </select>
    </div>
    <div class="inputWrap">
      <button type="button" class="btnCreate" @click="createWord">
        단어 추가
      </button>
    </div>
  </form>
</template>

<style scoped>
.inputWrap {
  padding: 15px 0;
  font-size: 0;
}

.inputWrap label {
  display: inline-block;
  width: 80px;
  font-size: 20px;
  line-height: 40px;
  vertical-align: top;
  border-bottom: 2px solid #d9d9d9;
}

.inputWrap input,
.inputWrap select {
  width: 400px;
  height: 40px;
  font-size: 20px;
  line-height: 40px;
  padding: 0 30px;
  border: none;
  border-bottom: 2px solid #d9d9d9;
  outline: none;
  box-sizing: content-box;
}

.inputWrap input:focus {
  border-bottom: 2px solid #353535;
}
</style>
