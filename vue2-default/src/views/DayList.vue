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

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'DayList',
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
      this.isLoading = true;
      this.$axios.get(`${this.url}/days`).then((res) => {
        if (res.status === 200) {
          this.days = res.data;
          this.isLoading = false;
        }
      });
    },
  },
};
</script>

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
