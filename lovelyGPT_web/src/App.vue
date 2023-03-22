<template>
  <div class="app">
    <!-- <h1>lovelyGPT</h1>
    <img class="women" src="./assets/test.jpg" alt="哪来的女人" >
    <Home></Home> -->
  </div>
</template> 

<script  setup>
import Home from './components/home.vue';

</script>

<style scoped lang="css">
*{
  margin:0;
  padding:0;
}

li{
  list-style:none;
}

img{
  vertical-align:top;
  border:none;
}
h1{
  text-align: center;
}

.app{ 
  width: 100%;
  height: 500px;
  background-color: rgb(72, 75, 75);
}

.women{
  width: 600px;
  height: 1000px;
}



</style>
