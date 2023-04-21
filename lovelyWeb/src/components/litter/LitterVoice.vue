<template>
  <div class="littervoice">
    <div class="chat">
      <div class="chat-text" @click="handlePlay()">
        <!-- <audio :src="props.voiceUrl" controls ref="audio" id="audio"></audio> -->
        <audio :src="props.voiceUrl" controls ref="musicAudio" id="audio" style="display: none"></audio>
        <div class="yuyin-title">
          <img v-if="isPlaying" src="@/assets/img/yuyin-on.gif" alt="" class="yuyin-img" />
          <img v-else src="@/assets/img/yuyin-off.png" alt="" class="yuyin-img" />
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
      <img :src="person?.avatar" alt="" />
      <span>{{ person?.name }}</span>
      <span>{{ person?.time }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import voiceUrl from '@/assets/video/zaoshanghao.mp3'
import { cond } from 'lodash';
const props = defineProps({
  voiceUrl: String,
  person: Object,
  voiceTime: Number,
  gptchat: String
})
//语音时间 
// let time =ref(parseInt(props.voiceTime))
let time: any = ref(props.voiceTime)
console.log(time.value);
let prTime: number = parseInt(time.value)

//播放暂停语音及语音动画效果切换
let isPlaying = ref(false)
let timer = ref(NaN)
const handlePlay = () => {
  const audio = document.getElementById('audio') as HTMLAudioElement
  if (!isPlaying.value) {
    audio.play();
    isPlaying.value = true;
    watchEnd();
  } else {
    audio.pause();
    clearTimeout(timer.value);
    isPlaying.value = false;
    audio.currentTime = 0;
  }
}
const watchEnd = () => {
  timer.value = setTimeout(() => {
    isPlaying.value = false;
  }, (4 * 1000))//时间
}

onBeforeUnmount(() => {
  clearTimeout(timer.value);
})

//语音转文字
let strStatus = ref(false)
let str = props.gptchat
console.log(str);
function change(String: any) {
  strStatus.value = true
}

</script>
<style scoped lang='less'>
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
    // height: 25px;
    border-radius: 15px;
    // width: 20%;
    // width: 100px;
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