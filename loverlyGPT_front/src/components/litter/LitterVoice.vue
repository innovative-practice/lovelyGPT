<template>
  <div class="littervoice">
    <div class="chat">
      <div class="chat-text" @click="handlePlay()">
        <audio
          :src="voiceUrl"
          controls
          ref="musicAudio"
          id="audio"
          style="display: none"
        ></audio>
        <div class="yuyin-title">
          <img
            v-if="isPlaying"
            :src="require('@/assets/img/yuyin-on.gif')"
            alt=""
            class="yuyin-img"
          />
          <img
            v-else
            :src="require('@/assets/img/yuyin-off.png')"
            alt=""
            class="yuyin-img"
          />
          <span class="yuyin-time">{{ prTime }}"</span>
        </div>
      </div>
      <div class="change" @click="change">
        <span>转文字</span>
      </div>
    </div>
    <div class="text" v-show="strStatus">
      <div class="text-main">{{ str }}</div>
    </div>
    <div class="info-time">
      <img :src="person.avatar" alt="" />
      <span>{{ person.name }}</span>
      <span>{{ person.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    voiceUrl: String,
    person: Object,
    voiceTime: Number,
    gptchat: String,
  },
  data() {
    return {
      time: this.voiceTime,
      prTime: parseInt(this.voiceTime),
      isPlaying: false,
      timer: NaN,
      strStatus: false,
      str: this.gptchat,
    };
  },
  methods: {
    handlePlay() {
      const audio = document.getElementById("audio");
      if (!this.isPlaying) {
        audio.play();
        this.isPlaying = true;
        this.watchEnd();
      } else {
        audio.pause();
        clearTimeout(this.timer);
        this.isPlaying = false;
        audio.currentTime = 0;
      }
    },
    watchEnd() {
      this.timer = setTimeout(() => {
        this.isPlaying = false;
      }, (3 + 1) * 1000); //时间
    },
    change() {
      this.strStatus = true;
    },
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped lang="scss">
.littervoice {
  width: 70%;
}

.chat {
  width: 80%;
  display: flex;
  align-items: center;

  .chat-text {
    display: flex;
    align-items: center;
    width: 50%;
    max-width: 90%;
    padding-top: 15px;
    padding-bottom: 7px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 20px 20px 20px 5px;
    background-color: #ffffff;
    color: #ffffff;
    cursor: pointer;

    .yuyin-img {
      width: 35px;
      height: 35px;
      margin-left: 10px;
      margin-bottom: 5px;
      color: #000000;
    }

    &:hover {
      background-color: rgb(156, 155, 155);
    }

    .yuyin-title {
      display: flex;
      width: 100%;
      align-items: center;

      .yuyin-time {
        font-size: 18px;
        color: #000000;
        margin-bottom: 5px;
      }
    }
  }

  .change {
    background-color: rgb(161, 153, 153);
    border-radius: 15px;
    font-size: 20px;
    padding: 10px 10px;
    margin-left: 15px;
    opacity: 0.5;
    cursor: pointer;
  }
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  max-width: 90%;
  margin-top: 5px;
  padding-top: 15px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px 20px 20px 5px;
  background-color: #fff;
  color: #000;

  .text-main {
    padding-left: 5%;
  }
}

.info-time {
  margin: 10px 0;
  color: #000000;
  font-size: 14px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  span:last-child {
    color: rgb(0, 0, 0);
    margin-left: 10px;
    vertical-align: middle;
  }
}
</style>
