<template>
  <div class="home">
    <!-- @ts-nocheck -->
    <el-container height="100%">
      <el-aside width="80px">
        <Nav></Nav>
      </el-aside>
        <router-view></router-view>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
import Nav from '@/components/Nav.vue'
import { reactive, ref } from 'vue'

</script>
<style scoped lang="less">
.home {
  width: 90vw;
  height: 90vh;
  background-color: #3b3d3d;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  overflow: hidden;
}
</style>