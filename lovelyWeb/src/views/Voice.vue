<template>
  <div class="voice">
    <!-- <LitterInput></LitterInput> -->
    <Liang></Liang>
  </div>
</template>

<script setup lang='ts'>
import LitterInput from '@/components/litter/LitterInput.vue';
import Liang from '@/components/litter/liang.vue';
import { reactive, ref } from 'vue'
const msg = ref('Hello World')
</script>
<style scoped lang='less'>
.voice {
  width: 60%;
  height: 74vh;
  left: 30%;
  top: 5vh;
  // background-color: #f4e6dd;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
</style>