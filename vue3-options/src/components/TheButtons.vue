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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheButtons',
  data() {
    return {
      pageName: '',
    };
  },
  watch: {
    $route() {
      this.pageName = this.$route.name;
    },
  },
});
</script>

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
