<template>
  <div id="app">
    <MainComponent/>
  </div>
</template>

<script>
import MainComponent from './views/main';
export default {
  name: 'App',
  components: {
    MainComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
