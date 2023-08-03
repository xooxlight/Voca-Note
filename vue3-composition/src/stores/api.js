import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', {
  state: () => ({
    api: `http://localhost:5000`,
  }),
});
