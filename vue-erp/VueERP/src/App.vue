<template>
  <div id="app">
    <router-view></router-view>
    <spinner v-show="false"></spinner>
  </div>
</template>

<script>
  import spinner from './components/spinner/spinner.vue'
  export default {
    components: {
      spinner
    }
  }
</script>

<style lang="scss">
  #app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff
  }
</style>
