<template>
  <div class="chatRight">
    <div class="login-video">
      <video autoplay muted loop id="myVideo">
        <source src="@/assets/video/login.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="online-person">
      <div class="explosion">
        <span class="setting" @click="SettingStatus = 0" :class="{ active: SettingStatus === 0 }">对话</span>
        <span class="setting" @click="SettingStatus = 3" :class="{ active: SettingStatus === 3 }">文件</span>
      </div>
      <div class="s-wrapper left-right" @click="clearSelect">
        <!--对话设置-->
        <el-collapse-transition>
          <div v-show="SettingStatus == 0" style="overflow: hidden;">
            <div class="block">
              <el-tooltip class="item" effect="dark" content="指定要生成的最大单词数，不能超过2048." placement="top">
                <span class="demonstration" style="">max_tokens</span>
              </el-tooltip>

              <el-slider class="astrict" v-model="SettingInfo.MaxTokens" :step="1" :min="0" :max="2048"
                @input="yueyun"></el-slider>
            </div>

            <div class="block">
              <el-tooltip class="item" effect="dark" content="指定生成文本的随机性，范围是0到1，越高表示越多样化和创造性，越低表示越保守和确定性。"
                placement="top">
                <span class="demonstration">temperature(0~1)</span>
              </el-tooltip>

              <el-slider class="astrict" v-model="SettingInfo.Temperature" :step="0.1" :min="0" :max="1"
                @input="yueyun"></el-slider>
            </div>

            <div class="block">
              <el-tooltip class="item" effect="dark" content="指定降低重复单词出现概率的程度，范围是0到1，越高表示越避免重复。" placement="top">
                <span class="demonstration">frequency_penalty(-2~2)</span>
              </el-tooltip>

              <el-slider class="astrict" v-model="SettingInfo.FrequencyPenalty" :step="0.1" :min="-2" :max="2"
                @input="yueyun"></el-slider>
            </div>

            <div class="block">
              <el-tooltip class="item" effect="dark" content="指定降低重复话题出现概率的程度，范围是0到1，越高表示越避免重复。" placement="top">
                <span class="demonstration">presence_penalty(-2~2)</span>
              </el-tooltip>
              <el-slider class="astrict" v-model="SettingInfo.PresencePenalty" :step="0.1" :min="-2" :max="2"
                @input="yueyun"></el-slider>
            </div>
            <div style="height: 30px;"></div>
          </div>
        </el-collapse-transition>
        <!--文件-->
        <el-collapse-transition>
          <div v-show="SettingStatus == 3" class="filecontent">
            <div v-for="item, index in fileList" :key="index">
              <div class="fileshow" @click.stop="selectFiles($event, item, index)"
                :class="item.isSelect == 1 ? 'fileactive' : ''">
                <img :src=item.imgs />
                <div class="word">
                  <span>{{ item.name || '未知' }}</span>
                  <span>154kb</span>
                </div>
                <div class="delete" @click="deleteFiles(item)">
                  <svg t="1680574326711" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4048" width="32" height="32">
                    <path
                      d="M511.89 128.745c-201.852 0-365.49 163.638-365.49 365.49s163.638 365.49 365.49 365.49c201.851 0 365.49-163.637 365.49-365.49s-163.639-365.49-365.49-365.49zM688.52 626.69l-44.188 44.175L511.89 538.41 379.448 670.864 335.26 626.69l132.443-132.455L335.26 361.792l44.152-44.187 132.466 132.454 132.454-132.454 44.188 44.187-132.455 132.455L688.52 626.689z m0 0"
                      p-id="4049" fill="#030303"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { openApiParams } from '@/store/index'
let SettingStatus = ref(0)
let fileList: any = reactive([])
let nowFile = reactive({})
const apiParams = openApiParams()

const clearSelect = (event: any) => {
  for (let i = 0; i < fileList.length; i++) {
    fileList[i].isSelect = 0
  }
  nowFile = {}
}
const selectFiles = (event: any, item: any, index: any) => {
  for (let i = 0; i < fileList.length; i++) {
    fileList[i].isSelect = 0
  }
  item.isSelect = 1
  nowFile = item
}
const deleteFiles = (item: any) => {
  fileList.splice(fileList.indexOf(item), 1)
  nowFile = {}
}
const SettingInfo = reactive({
  translateEnglish: false,
  openProductionPicture: false,
  KeyMsg: "",
  MaxTokens: 1000,
  Temperature: 1,
  TemperatureAudio: 0,
  TopP: 1,
  FrequencyPenalty: 0,
  PresencePenalty: 0,
  n: 1,
  size: "256x256",
  language: "zh"
})
const yueyun = () => {
  // 将修改后的数据传入store的openApiParams的数据中
  apiParams.openApiParams = SettingInfo
  // console.log(apiParams.openApiParams) 
}

</script>
<style scoped lang='less'>
.chatRight {
  width: 280px;
  background-color: rgb(219, 152, 122);
  margin: 0;
  height: 90vh;

  // overflow: hidden;
  #myVideo {
    width: 100%;
    height: auto;
    margin-top: 10px;
    // 右上角设置圆角
    border-top-right-radius: 8px;
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
        color: #827fac; //选中后的颜色
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
          color: rgb(0, 0, 0);
          text-align: center;
        }


        .astrict {
          width: 90%;
        }
      }


      .fileshow {
        transition: 0.25s;
        width: 250px;
        height: 100px;
        position: relative;
        background-color: rgb(45, 48, 63);
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
        margin-top: 20px;


        .word {
          width: 60%;
          margin-left: 10px;
          overflow: hidden;
        }


        .delete {
          display: flex;
        }
      }
    }

    .left-right {
      height: 60vh;
    }
  }
}
</style>