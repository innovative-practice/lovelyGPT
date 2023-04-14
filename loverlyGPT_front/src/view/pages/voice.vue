<template>
  <div class="voice">
    EXPLOSION!!!
    <audio :src="voiceUrl" id="liang" controls>
    </audio>
    <div class="bottom">
      <textarea id="textareaMsg" class="inputs"
        style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 65%;min-width: 65%;" maxlength="2000"
        rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false" autocapitalize="off" autocomplete="off"
        v-model="inputMsg" @keyup.enter="sendText">
                                                  </textarea>
      <!--发送-->
      <div>
        <div class="send boxinput" @click="sendText">
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "voice",
  data() {
    return {
      voiceUrl: '',
      inputMsg: '',

    }
  },
  mounted() {
    // console.log(ToVoice('呀哈喽'))

  },
  methods: {
    async sendText() {
      console.log('this.inputMsg',this.inputMsg)
      let res = await axios.get(`http://127.0.0.1:3000/toVoice/${this.inputMsg}`)
      console.log(res.data.data)
      this.voiceUrl = res.data.data
    },
    async getVoice() {
      // this.voiceUrl = await ToVoice(this.inputMsg)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  // background-color: red;
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
</style>