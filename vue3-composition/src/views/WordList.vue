<template>
  <LoadingSpinner v-if="isLoading" />

  <template v-else>
    <table v-if="words.length > 0">
      <tbody id="wordList">
        <tr
          v-for="item in words"
          :key="item.id"
          :class="{ complete: item.isComplete }"
        >
          <td>
            <input
              type="checkbox"
              :id="`word${item.id}`"
              v-model="item.isComplete"
              @change="() => toggleComplete(item)"
            />
            <label :for="`word${item.id}`"></label>
          </td>
          <td>{{ item.eng }}</td>
          <td :class="{ hide: !item.isShow }">
            {{ item.kor }}
          </td>
          <td>
            <button
              type="button"
              class="btnToggleItem"
              @click="() => toggleShow(item)"
              :disabled="item.isComplete"
            >
              <span v-html="item.isShow ? '뜻 숨기기' : '뜻 보기'"></span>
            </button>
            <button
              type="button"
              class="btnDeleteItem"
              @click="() => deleteItem(item)"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <template v-else>
      <p class="text">등록된 단어가 없습니다.</p>
      <router-link to="/createWord" class="btnCreate">단어 추가</router-link>
    </template>
  </template>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApiStore } from '@/stores/api';
import axios from 'axios';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  setup() {
    const isLoading = ref(true);
    const route = useRoute();
    const url = useApiStore();
    const day = route.params.dayId;
    const words = ref([]);

    const getWords = () => {
      isLoading.value = true;
      axios.get(`${url.api}/words?day=${day}`).then((res) => {
        if (res.status === 200) {
          words.value = res.data.map((e) => ({
            ...e,
            isShow: e.isComplete,
          }));
          isLoading.value = false;
        }
      });
    };
    getWords();

    const toggleComplete = (item) => {
      let temp = item;
      delete temp.isShow;

      axios.put(`${url.api}/words/${item.id}`, temp).then((res) => {
        if (res.status === 200) {
          item.isShow = item.isComplete;
        }
      });
    };

    const toggleShow = (item) => {
      item.isShow = !item.isShow;
    };

    const deleteItem = (item) => {
      if (window.confirm('삭제하시겠습니까?')) {
        isLoading.value = true;
        axios.delete(`${url.api}/words/${item.id}`).then((res) => {
          if (res.status === 200) {
            alert('단어가 삭제되었습니다.');
            getWords();
          }
        });
      }
    };

    return { isLoading, day, words, toggleComplete, toggleShow, deleteItem };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

table td {
  width: 25%;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 26px;
  word-break: keep-all;
}

table td:first-child {
  width: 10%;
  vertical-align: middle;
}

table td button {
  width: 88px;
  margin: 0 5px;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.complete td {
  background: #eee;
  color: #ccc;
}

.hide {
  font-size: 0;
  color: #fff;
}

.btnToggleItem {
  color: #fff;
  font-weight: bold;
  background-color: #5e503f;
}

.btnToggleItem:disabled {
  cursor: default;
}

tr:not(.complete) .btnToggleItem:hover {
  background-color: #8b5e34;
}

.btnDeleteItem {
  width: 58px;
  color: #fff;
  font-weight: bold;
  background-color: #660708;
}

.btnDeleteItem:hover {
  background-color: #8d0801;
}

.text {
  display: block;
  margin: 0;
  padding: 40px 0 60px;
  text-align: center;
  font-weight: bold;
  color: #353535;
}
</style>
