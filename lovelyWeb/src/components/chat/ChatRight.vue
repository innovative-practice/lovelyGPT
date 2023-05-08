<template>
  <div class="chatRight">
    <div class="login-video">
      <video autoplay muted loop id="myVideo">
        <source src="@/assets/video/login.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="online-person">
      <div class="explosion">
        <span class="setting" @click="SettingStatus = 0" :class="{ active: SettingStatus === 0}">对话</span>
        <span class="setting" @click="SettingStatus = 1" :class="{ active: SettingStatus === 1}">图片</span>
        <span class="setting" @click="SettingStatus = 2" :class="{ active: SettingStatus === 2}">语音</span>
        <span class="setting" @click="SettingStatus = 3" :class="{ active: SettingStatus === 3}">文件</span>
      </div>
      <div class="s-wrapper left-right" @click="clearSelect">
        <!--对话设置-->
        <el-collapse-transition>
          <div v-show="SettingStatus == 0" style="overflow: hidden;">
            <div class="block">
              <el-tooltip class="item" effect="dark" content="指定要生成的最大单词数，不能超过2048." placement="top">
                <span class="demonstration" style="">max_tokens</span>
              </el-tooltip>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
let SettingStatus = ref(0)
let fileList:any = reactive([])
let nowFile = reactive({})
const clearSelect = (event:any)=>{
  for (let i = 0; i < fileList.length; i++) {
        fileList[i].isSelect = 0
      }
      nowFile = {}
}

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


      .setting {
        margin-left: 0px;
        padding-left: 10px;
        cursor: pointer;
        font-weight: 600;
        color: rgb(14, 22, 67);
      }


      .setting.active {
        color: #827fac;//选中后的颜色
      }
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


      .block {
        margin-top: 5%;


        .demonstration {
          color:aliceblue;
          text-align: center;
        }
      }
    }

    .left-right {
      height: 60vh;
    }
  }
}

</style>