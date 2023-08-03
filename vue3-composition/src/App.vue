<template>
  <TheHeader :pageStr="pageStr" />
  <TheButtons />
  <router-view />
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import TheButtons from './components/TheButtons.vue';

export default {
  components: {
    TheHeader,
    TheButtons,
  },
  setup() {
    const route = useRoute();
    const pageStr = ref('');

    watch(route, () => {
      switch (route.name) {
        default:
          return false;
        case 'DayList':
          pageStr.value = '';
          break;
        case 'WordList':
          pageStr.value = 'DAY';
          break;
        case 'CreateWord':
          pageStr.value = '단어 추가';
          break;
        case 'CreateDay':
          pageStr.value = '날짜 편집';
          break;
      }
    });
    return { pageStr };
  },
};
</script>

<style>
body {
  max-width: 1024px;
  margin: 20px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  text-align: center;
}

ol,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

h1 {
  line-height: 80px;
}

h2 {
  margin-bottom: 40px;
}

h2 span {
  margin: 0 15px;
  font-size: 40px;
  color: #8b5e34;
}

a {
  text-decoration: none;
  color: #333;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s;
}

input[type='checkbox'] {
  display: none;
}

input[type='checkbox'] + label {
  position: relative;
  display: inline-block;
  width: 26px;
  height: 26px;
  border: 3px solid #707070;
  vertical-align: bottom;
}

input[type='checkbox']:checked + label::after {
  position: absolute;
  left: 0;
  top: 0;
  content: '✔';
  font-size: 25px;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
}

.btnDelete,
.btnCreate {
  display: inline-block;
  width: 140px;
  margin: 0 8px;
  padding: 20px;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  border-radius: 10px;
  background-color: #353535;
  cursor: pointer;
}

.btnDelete:hover {
  background-color: #660708;
}

.btnCreate:hover {
  background-color: #284b63;
}

.text + .btnCreate {
  margin-bottom: 40px;
}
</style>
