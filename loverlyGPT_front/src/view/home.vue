<template>
  <div class="home">
    <el-container height="100%">
      <el-aside width="80px">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 90vw;
  height: 90vh;
  background-color: #45c4be;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
}
</style>