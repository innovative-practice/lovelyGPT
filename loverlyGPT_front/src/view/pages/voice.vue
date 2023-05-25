<template>
  <div class="voice">
    <div class="voice-left">
      <LitterVoice :voice="voice" />
    </div>
    <div class="voice-right">
      <div class="chat-content">
        <div
          class="chat-wrapper"
          v-for="(message, index) in messageList"
          :key="index"
        >
          <div class="chat-me" v-if="message.person">
            <div class="chat-text">{{ message.content }}</div>
            <div class="info-time">
              <span>{{ message.person.name }}</span>
              <span>{{ message.person.time }}</span>
              <img :src="message.person.avatar" alt="" />
            </div>
          </div>
          <div class="chat-friend" v-else>
            <div class="chat-text">{{ message.content }}</div>
            <div class="info-time">
              <span>{{ message.gptchat }}</span>
              <span>{{ message.person.time }}</span>
              <img :src="message.person.avatar" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <input class="inputs" type="text" v-model="inputMsg" />
        <div class="boxinput">
          <img src="@/assets/img/voice.png" alt="" />
        </div>
        <button class="send" @click="sendText">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import headerPng from "@/assets/img/header.png";
import LitterVoice from "@/components/litter/LitterVoice.vue";
import voiceUrl from "@/assets/video/zaoshanghao.mp3";
import { getVoice } from "@/api/getData";

export default {
  components: {
    LitterVoice,
  },
  data() {
    return {
      acqStatus: true,
      inputMsg: "",
      voice: voiceUrl,
      messageList: [],
    };
  },
  methods: {
    async sendText() {
      let message = this.inputMsg;
      if (this.inputMsg) {
        this.messageList.push({
          type: "text",
          content: this.inputMsg,
          person: {
            name: "月晕",
            avatar: headerPng,
            time: yueyunFormatDate(getNowTime()),
          },
        });
        this.acqStatus = false;
        this.inputMsg = "";
        try {
          const res = await getVoice(message);
          const mp3Duration = await getMP3Duration(res.voicePath);
          this.messageList.push({
            type: "video",
            content: "explosion",
            voiceUrl: res.voicePath,
            gptchat: res.reply,
            person: {
              name: "AI",
              avatar: headerPng,
              time: yueyunFormatDate(getNowTime()),
            },
            voiceDuration: mp3Duration,
          });
          this.acqStatus = true;
        } catch (e) {
          console.log(e);
        }
      }
      this.inputMsg = "";
    },
  },
};
</script>

<style scoped lang="scss">
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
    margin-left: -20px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    background-color: #ffffff;
    border-radius: 0 0 15px 15px;
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

  .boxinput {
    width: 50px;
    height: 50px;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    border: 1px solid rgb(255, 255, 255);
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
