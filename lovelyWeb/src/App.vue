<script setup lang="ts">
import home from '@/views/home.vue'
import '@/assets/font/font/iconfont.css'
</script>
<template>
  <div class="app">
    <home></home>
  </div>
</template>

<style scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  font-size: 25px;
  vertical-align: middle;
  color: rgb(117, 120, 137);
  transition: .3s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
  font-family: 'SSFY';
}


#app {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/baizi.png") no-repeat;
  overflow: hidden;
  background-size: cover;
  position: absolute;

}
</style>
