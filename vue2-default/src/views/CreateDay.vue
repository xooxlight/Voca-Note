<template>
  <LoadingSpinner v-if="isLoading" />

  <div v-else>
    <h2>
      현재 일수 :<span id="dayCount">{{ this.days.length }}</span
      >일
    </h2>
    <button
      v-if="this.days && this.days.length > 0"
      type="button"
      class="btnDelete"
      @click="deleteDay"
    >
      날짜 삭제
    </button>
    <button type="button" class="btnCreate" @click="createDay">
      날짜 추가
    </button>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'CreateDay',
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: true,
      url: this.$store.state.url,
      days: [],
    };
  },
  mounted() {
    this.getDays();
  },
  methods: {
    getDays() {
      this.$axios.get(`${this.url}/days`).then((res) => {
        if (res.status === 200) {
          this.days = res.data;
          this.isLoading = false;
        }
      });
    },
    deleteDay() {
      if (window.confirm('마지막 날짜를 삭제하시겠습니까?')) {
        this.isLoading = true;
        this.$axios
          .delete(`${this.url}/days/${this.days[this.days.length - 1].day}`)
          .then((res) => {
            if (res.status === 200) {
              alert('마지막 날짜가 삭제되었습니다.');
              this.isLoading = false;
              this.$router.push({ path: '/' });
            }
          });
      }
    },
    createDay() {
      this.isLoading = true;
      this.$axios
        .post(`${this.url}/days`, { day: this.days.length + 1 })
        .then((res) => {
          if (res.status === 201) {
            alert('날짜가 추가되었습니다.');
            this.isLoading = false;
            this.$router.push({ path: '/' });
          }
        });
    },
  },
};
</script>
