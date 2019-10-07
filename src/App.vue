<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import cloudStorage from './services/cloud-storage'

export default {
  name: 'App',
  mounted() {
    cloudStorage.initialize();
  }
}
</script>
