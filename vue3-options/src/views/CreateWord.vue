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

<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useApiStore } from '@/stores/api';
import axios from 'axios';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default defineComponent({
  name: 'CreateWord',
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      days: [],
      word: {},
      eng: '',
      kor: '',
      day: 1,
    };
  },
  computed: {
    ...mapState(useApiStore, ['api']),
  },
  mounted() {
    this.getDays();
  },
  methods: {
    getDays() {
      this.isLoading = true;
      axios.get(`${this.api}/days`).then((res) => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            alert('등록된 날짜가 없습니다.');
            this.$router.push({ path: `/createDay` });
          } else {
            this.days = res.data;
            this.day = this.days[this.days.length - 1].day;
            this.isLoading = false;
          }
        }
      });
    },
    createWord() {
      let word = {
        day: this.day,
        eng: this.eng.trim(),
        kor: this.kor.trim(),
        isComplete: false,
      };

      if (word.eng === '' || word.kor === '') {
        alert('단어를 입력해주세요.');
      } else {
        this.isLoading = true;
        axios.post(`${this.api}/words`, word).then((res) => {
          if (res.status === 201) {
            alert('단어가 추가되었습니다.');
            this.isLoading = false;
            this.$router.push({ path: `/wordList/${this.day}` });
          }
        });
      }
    },
  },
});
</script>

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
