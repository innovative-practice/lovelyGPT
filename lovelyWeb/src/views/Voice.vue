<template>
  <div class="voice">
    <div class="voice-left">
      <Liang></Liang>
    </div>
    <div class="voice-right">
      <div class="chat-content" id="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="(item, index) in messageList" :key="index">
          <div v-if="item.type === 'text'" class="chat-me">
            <LitterChat :chatContent="item.content" :person="item.person"></LitterChat>
          </div>
          <div v-if="item.type === 'video'" class="chat-friend">
            <LitterVoice :voiceUrl="item.voiceUrl" :person="item.person" :voiceTime="item.voiceDuration"></LitterVoice>
          </div>
        </div>
      </div>
      <div class="bottom">
        <textarea id="textareaMsg" class="inputs"
          style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 65%;min-width: 65%;" maxlength="2000"
          rows="3" dirautocorrect="off" aria-autocomplete="both" spellcheck="false" autocapitalize="off"
          autocomplete="off" v-model="inputMsg" @keyup.enter="sendText">
                                                                                                                                                    </textarea>
        <div v-if="acqStatus">
          <div class="send boxinput" @click="sendText">
            <img src="@/assets/img/rocket.png" alt="" />
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
</template>

<script setup lang='ts'>
import Liang from '@/components/litter/liang.vue';
import LitterChat from '@/components/litter/LitterChat.vue';
import { animation, getNowTime, yueyunFormatDate, getMP3Duration } from '@/util/index'
import { reactive, ref } from 'vue'
import headerPng from '@/assets/img/header.png'
import LitterVoice from '@/components/litter/LitterVoice.vue'
import voiceUrl from '@/assets/video/zaoshanghao.mp3'
import { getVoice } from '@/api/getData'
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
  voiceDuration?: any
}
let acqStatus = ref(true)
let inputMsg = ref('')
let voice = voiceUrl
// 存储消息的数组
let messageList: Message[] = reactive([])

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
    try {
      // const res = await getVoice(message)
      const mp3Duration = await getMP3Duration(voiceUrl)
      messageList.push({
        type: 'video',
        content: 'explosion',
        // voiceUrl: res,
        person: {
          name: 'AI',
          avatar: headerPng,
          time: yueyunFormatDate(getNowTime()),
        },
        voiceDuration: mp3Duration
      })
      acqStatus.value = true
    } catch (e) {
      console.log(e)
    }
  }
  inputMsg.value = ''
}

const waitMessage = () => {
  console.log('waitMessage')
}
</script>
<style scoped lang='less'>
.voice {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .voice-left {
    width: 40%;
    height: 74vh;
  }

  .voice-right {
    width: 60%;
    height: 74vh;
    background-color: #dfdddd;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    left: -50px;

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

          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;

            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }

          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }

          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 8px;
            }

            span {
              line-height: 32px;
            }

            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
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
  }

  .bottom {
    display: flex;
    width: 60%;
    justify-content: center;
    align-items: center;
    width: 90%;
    position: absolute;
    bottom: 0;
    margin: 3%;
    display: flex;
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
</style>