<template>
  <div class="setting">
    <el-container>
      <el-header>
        <transition name="el-zoom-in-top">
          <div style="text-align: center" v-show="show" class="transition-box">
            <h1 style="color: aliceblue; font-size: 80px;">L V S H I H A O</h1>
          </div>
        </transition>

      </el-header>
      <el-main>
        <transition name="el-zoom-in-top">
          <div style="text-align: center;margin-top: 5%;" v-show="show" class="transition-box">

            <div style="font-size: 97px;margin-top: 5%;">
              <div style="text-decoration: none;color: #67C23A;">EXPLOSIONING!!!!!!</div>
            </div>
          </div>
        </transition>
      </el-main>
      <el-footer>
        <div class="auther">
          <div class="auther-head">
            <a href="https://github.com/apprehen"><img src="@/assets/img/head.jpg" alt=""></a>
          </div>
        </div>
      </el-footer>
      <!-- <el-footer style="margin-top: 18%;">ssssssssssssssssssssssssssssss</el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true
  }
}
</script>

<style lang= "scss" scoped>
.auther{
  padding-top: 50px;
}
.auther{
  display: flex;
  align-items: center;
  justify-content: center;
}
.auther-head img{
  width: 150px;
  height: 150px;
  border-radius:50%;
}
</style>