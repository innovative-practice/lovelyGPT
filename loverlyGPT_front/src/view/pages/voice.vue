<template>
  <div class="voice">
    <!-- 遍历语音 -->
    <div class="chat-content" id="chat-content" ref="chatContent">
      <div class="chat-wrapper" v-for="(item, index) in voiceUrlList" :key="index">
        <div v-if="item.flag === 1">
          <Explosion :voiceUrl="item.url" controls></Explosion>
        </div>
        <div v-if="item.flag === 2">
          <chat :yueyunchat="item.url"></chat>
        </div>
      </div>
    </div>
    <div class="bottom">
      <textarea id="textareaMsg" class="inputs"
        style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 65%;min-width: 65%;" maxlength="2000"
        rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false" autocapitalize="off" autocomplete="off"
        v-model="inputMsg" @keyup.enter="sendText">
                                  </textarea>
      <div v-if="acqStatus">
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
      <!--等待-->
      <div v-else>
        <div class="send boxinput">
          <div class="spinner">
            <img src="@/assets/img/shuaxin.png" alt="AI回答中" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Explosion from '@/components/Explosion.vue'
import chat from '@/components/chat.vue'
export default {
  name: "voice",
  components: {
    Explosion,
    chat
  },
  data() {
    return {
      voiceUrl: '123',
      inputMsg: '',
      acqStatus: true,
      voiceUrlList: []
    }
  },
  mounted() {

  },
  methods: {
    async sendText() {
      if (this.inputMsg) {
        this.acqStatus = false
        this.voiceUrlList.push({
          url: this.inputMsg,
          flag: 2
        })
        // try {
        //   let res = await axios.get(`http://127.0.0.1:3000/toVoice/${this.inputMsg}`)
        //   console.log(res.data.data)
        //   this.voiceUrl = res.data.data
        //   // 1 代表语音 2 代表文字
        //   this.voiceUrlList.push({
        //     url: res.data.data,
        //     flag: 1
        //   })
        // } catch (e) {
        //   this.$message({
        //     message: '服务器出错辣',
        //     type: 'error'
        //   })
        // }
        this.acqStatus = true
        this.inputMsg = ''
      } else {
        this.$message({
          message: '请输入内容要发送的内容呐',
          type: 'warning'
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.voice {
  width: 60%;
  height: 74vh;
  left: 30%;
  top: 5vh;
  background-color: rgb(50, 54, 68);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  #textareaMsg {
    // resize: none;
    overflow: hidden;
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
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 2px solid rgb(34, 135, 225);
  padding: 10px;
  box-sizing: border-box;
  transition: 0.2s;
  font-size: 20px;
  color: #fff;
  font-weight: 100;
  margin: 0 20px;

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
  }
}
</style>