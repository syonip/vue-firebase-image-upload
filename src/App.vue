<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import store from "./services/store.js";

export default {
  name: "App",
  async mounted() {
    store.initWorker();
    store.loadPictures();
  }
};
</script>

<style>
</style>
