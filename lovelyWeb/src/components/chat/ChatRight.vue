<template>
  <div class="chatRight">
    <div class="login-video">
      <video autoplay muted loop id="myVideo">
        <source src="@/assets/video/login.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'

</script>
<style scoped lang='less'>
.chatRight {
  width: 280px;
  background-color: #bfa;
  // overflow: hidden;
  #myVideo{
    width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 5%;
  }

  .title {
    color: #fff;
    padding-left: 10px;
  }

  .online-person {
    margin-top: 10%;

    .explosion {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .onlin-text {
      margin-left: 35%;
      padding-left: 10px;
      color: rgb(176, 178, 189);
    }


    .s-wrapper {
      padding-left: 10px;
      height: 65vh;
      margin-top: 10px;
      overflow: hidden;
      overflow-y: scroll;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 0;
        /* Safari,Chrome 隐藏滚动条 */
        height: 0;
        /* Safari,Chrome 隐藏滚动条 */
        display: none;
        /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
    }

    .left-rgiht {
      height: 60vh;
    }
  }
}

</style>