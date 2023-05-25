<template>
  <div class="chatMiddle">
    <div class="chat-window" v-if="selectPerson.person.headImg">
      <div class="top">
        <div class="head-pic">
          <HeadPortrait :ImgUrl="selectPerson.person.headImg"></HeadPortrait>
        </div>
        <div class="info-detail">
          <div class="name">{{ selectPerson.person.name }}</div>
          <div class="detail">{{ selectPerson.person.detail }}</div>
        </div>
        <div class="other-fun">
          <label @click="sc">
            <span class="iconfont icon-snapchat"></span>
          </label>
          <label for="docFile">
            <span class="iconfont icon-wenjian"></span>
          </label>
          <label for="imgFile">
            <span class="iconfont icon-tupian"></span>
          </label>
          <input type="file" name="" id="imgFile" @change="sendImg" accept="image/*" />
          <input type="file" name="" id="docFile" @change="sendFile" accept="application/*,tenxt/*" />
        </div>
      </div>
      <div class="message">
        <div class="chat-content" id="chat-content" ref="chatContent">
          <div class="chat-wrapper" v-for="(item, index) in messageList" :key="index">
            <div v-if="item.type === 'text'" class="chat-me">
              <LitterChat :chatContent="item.content" :person="item.person" type="me"></LitterChat>
            </div>
            <div v-if="item.type === 'AIreply'" class="chat-friend">
              <LitterChat :chatContent="item.content" :person="item.person" type="AI"></LitterChat>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="chatInputs">
            <!--表情-->
              <div class="emoji boxinput" @click="clickEmoji">
                <img src="@/assets/img/biaoqing.png" alt="" />
            </div>
            <!--录音-->
            <div class="send boxinput" @click="stopRecording" v-if="recording"
              style="margin-left: 1.5%;font-size: 30px; display: flex;justify-content: center;align-items: center;">
              <span class="iconfont icon-microphone" style="font-size: 25px"></span>
            </div>
            <div class="send boxinput" @click="startRecording" v-if="!recording"
              style="margin-left: 1.5%;font-size: 30px; display: flex;justify-content: center;align-items: center;">
              <span class="iconfont icon-microphone-mute" style="font-size: 25px;"></span>
            </div>
            <!--emo表情列表-->
            <div class="emoji-content">
              <Emoji v-if="showEmoji" @sendEmoji="sendEmoji" @closeEmoji="clickEmoji"></Emoji>
              <!-- <Emoji v-if="showEmoji"></Emoji> -->
            </div>
            <textarea id="textareaMsg" class="inputs"
              style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 65%;min-width: 65%;"
              maxlength="2000" rows="3" dirautocorrect="off" aria-autocomplete="both" spellcheck="false"
              autocapitalize="off" autocomplete="off" v-model="inputMsg" @keyup.enter="sendText">
            </textarea>
            <div v-if="acqStatus">
              <div class="send boxinput" @click="sendText">
                <img src="/src/assets/img/send.png" alt="" />
              </div>
            </div>
            <!--等待-->
            <div v-else>
              <div class="send boxinput" @click="waitMessage">
                <div class="spinner">
                  <img src="@/assets/img/shuaxin.png" alt="AI回答中" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="choose">
      <div class="choose-main">
        <span>Please choose the model !</span>
      </div>
    </div>
  </div>
</template>


<script setup lang='ts'>
import { reactive, ref, watch } from 'vue'
import HeadPortrait from '../litter/HeadPortrait.vue'
import Emoji from '@/components/Emoji.vue'
import LitterChat from '@/components/litter/LitterChat.vue';
import { animation, getNowTime, yueyunFormatDate, getMP3Duration } from '@/util/index'
import headerPng from '@/assets/img/header.png'
import { usePersonStore } from '@/store/index'
import { openApiParams } from '@/store/index'
interface person {
  name: string,
  avatar: string,
  time: string
}
interface Message {
  type: string,
  content: string,
  person?: person,
  voiceUrl?: string,
  voiceDuration?: any,
  gptchat?: string
}
// 数据
let messageList: Message[] = reactive([])
let inputMsg = ref('')
let acqStatus = ref(true)
// 使用pinia接受参数
let selectPerson: any = usePersonStore()
const showEmoji = ref(false)
const recording = ref(false)
const originParams = ref({})
// 接受openApi参数
const openApi = openApiParams()

// 监听openApi参数
watch(openApi, (newVal, oldVal) => {
  originParams.value = newVal.openApiParams
})


// 函数
/*
  * @Description: 点击表情
*/
const clickEmoji = () => {
  console.log('clickEmoji');
  showEmoji.value = !showEmoji.value
}
const sendEmoji = (emoji: string) => {
  inputMsg.value += emoji
  showEmoji.value = false
}
// *******
const startRecording = () => {
  recording.value = true
}
const stopRecording = () => {
  recording.value = false
}
// *********
const sendText = async () => {
  let message = inputMsg.value
  // console.log('sendText')
  if (inputMsg.value) {
    messageList.push({
      type: 'text',
      content: inputMsg.value,
      person: {
        name: '月晕',
        avatar: headerPng,
        time: yueyunFormatDate(getNowTime()),
      }
    })
    acqStatus.value = false
    inputMsg.value = ''
  }
  console.log(selectPerson)
  messageList.push({
    type: 'AIreply',
    content: 'Explosion!!',
    person: {
      name: selectPerson.person.name,
      avatar: selectPerson.person.headImg,
      time: yueyunFormatDate(getNowTime()),
    }
  })
  acqStatus.value = true
  inputMsg.value = ''
}
const waitMessage = () => {
  console.log('waitMessage')
}
const sc = () => {
  console.log('sc')
}
const sendImg = (e: any) => {
  console.log(e.target.files[0])
}
const sendFile = (e: any) => {
  console.log(e.target.files[0])
}

const getOpenApiReply = (params:any) =>{

}

const completion = async (params: any, chatBeforResMsg: any) => {
  // 新增一个空消息
  messageList.push({
    type: 'AIreply',
    content: '',
    person: {
      name: selectPerson.person.name,
      avatar: selectPerson.person.headImg,
      time: yueyunFormatDate(getNowTime()),
    }
  })

}

// 监听
watch(selectPerson, () => {
  messageList = []
})
</script>
<style scoped lang='less'>
.chatMiddle {
  flex: 1;
  padding-right: 30px;
  margin: 0;
  padding: 0;
  // background-color: red;
  .showIcon {
    position: relative;
    width: 100%;
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 200px);

    .icon-snapchat {
      width: 300px;
      height: 300px;
      font-size: 300px;
      // color: rgb(28, 30, 44);
    }
  }

  .chat-window {
    height: 100%;
    width: 100%;
    margin-top: -3.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .top {
      margin-bottom: 20px;

      &::after {
        content: "";
        display: block;
        clear: both;
      }

      .head-pic {
        float: left;
      }

      .info-detail {
        float: left;
        margin: 5px 20px 0;

        .name {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }

        .detail {
          color: #fff;
          font-size: 18px;
          margin-top: 2px;
        }
      }

      .other-fun {
        float: right;
        margin-top: 20px;
        font-size: 25px;

        span {
          font-size: 25PX;
          margin-left: 30px;
          cursor: pointer;
        }

        // .icon-tupian {

        // }
        input {
          display: none;
        }
      }
    }

    .message {
      width: 90%;
      height: 74vh;
      background-color: #dfdddd;
      left: 7%;
      // top: 10vh;
      border-radius: 20px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;

      .chat-content {
        width: 100%;
        height: 85%;
        overflow-y: scroll;
        padding: 20px;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }

        .chat-wrapper {
          position: relative;
          word-break: break-all;

          .chat-me {
            width: 100%;
            float: right;
            margin-bottom: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
          }

          .chat-friend {
            width: 100%;
            float: left;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }
      }

      .chatInputs {
        width: 100%;
        position: absolute;
        bottom: 0;
        margin-left: -20px;
        padding-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        border-radius: 0 0 15px 15px;

        .boxinput {
          width: 50px;
          height: 50px;
          background-color: rgb(66, 70, 86);
          border-radius: 15px;
          border: 1px solid rgb(80, 85, 103);
          position: relative;
          margin-bottom: 2px;
          cursor: pointer;

          img {
            width: 30px;
            height: 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .emoji {
          transition: 0.5s;
          background-color: #fff;
          border-color: #ffffff;
          img{
            width: 36px;
            height:36px;
          }
          &:hover {
            box-shadow: 0px 0px 10px 0px rgb(149, 149, 149);
          }
        }

        .inputs {
          width: 65%;
          height: 50px;
          background-color: #e7e6e6;
          border-radius: 15px;
          border: 2px solid #ffffff;
          padding: 10px;
          box-sizing: border-box;
          transition: 0.2s;
          font-size: 20px;
          color: #000000;
          font-weight: 100;
          margin: auto 20px 5px 20px;

          &:focus {
            outline: none;
          }
        }

        .send {
          background-color: rgb(255, 255, 255);
          border: 0;
          transition: 0.3s;
          box-shadow: 0px 0px 5px 0px rgb(255, 255, 255);

          &:hover {
            box-shadow: 0px 0px 10px 0px rgb(149, 149, 149);
          }
        }
      }
      .emoji-content{
        
      }

      .inputs {
        width: 65%;
        height: 50px;
        background-color: #e7e6e6;
        border-radius: 15px;
        border: 2px solid rgb(189, 189, 189);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #000000;
        font-weight: 100;
        margin: 0 20px;
        overflow: hidden;

        &:focus {
          outline: none;
        }
      }

      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }

      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .spinner {
        width: 50px;
        height: 50px;
        animation: spin 1s infinite linear;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }

  }
}
.choose{
   width: 100%;
   height: 100%;
   display: flex;
   margin-top: 10vh;
   align-items: flex-start;
  // align-items: center;
   justify-content: center;
   .choose-main{
      font-size: 40px;
      color: rgb(200,71,50);
   }
}

</style>