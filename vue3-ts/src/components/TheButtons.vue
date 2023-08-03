<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageName = ref<string>('');

watch(route, () => {
  pageName.value = route.name as string;
});
</script>

<template>
  <div class="btns">
    <template v-if="pageName !== 'CreateWord' && pageName !== 'CreateDay'">
      <router-link to="/createWord">단어 추가</router-link>
    </template>
    <template v-if="pageName === '' || pageName === 'DayList'">
      <router-link to="/createDay">날짜 편집</router-link>
    </template>
    <template v-if="pageName !== '' && pageName !== 'DayList'">
      <router-link to="/dayList">돌아가기</router-link>
    </template>
  </div>
</template>

<style scoped>
.btns {
  padding: 10px;
  margin-bottom: 30px;
  text-align: right;
}

.btns a {
  display: inline-block;
  padding: 10px 20px;
  margin-left: 12.5px;
  background-color: #eae0d5;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
}

.btns a:hover {
  color: #fff;
  background-color: #c6ac8f;
}
</style>
