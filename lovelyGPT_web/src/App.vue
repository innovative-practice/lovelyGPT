<template>
  <div class="app">
    <h1 class="title">LovelyGPT</h1>
    <Home></Home>
  </div>
</template> 

<script  setup>
import Home from './views/home.vue';

</script>

<style scoped lang="css">
h1 {
  text-align: center;
  font-size: 30px;
}

.app {
  width: 100%;
  height: 100vh;
  /* background-color: rgb(150, 156, 165); */
}
</style>
