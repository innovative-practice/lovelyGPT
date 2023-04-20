<template>
  <div class="littervoice">
    <div class="chat">
      <div class="chat-text" @clike="btnPlay">
      <!-- <audio :src="props.voiceUrl" controls ref="audio" id="audio"></audio> -->
      <audio :src="voiceUrl" controls ref="musicAudio" id="audio"  style="display: none" ></audio>
      <div class="yuyin-title">
        <img src="@/assets/img/yu.png" alt="" class="yuyin-img">
        <span class="yuyin-time">{{ time }}"</span>
      </div>
      </div>
    <div class="change">
      <span>转文字</span>
    </div>
    </div>
    <div class="info-time">
        <img :src="person?.avatar" alt=""/>
        <span>{{ person?.name }}</span>
        <span>{{ person?.time }}</span>
      </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, nextTick, onMounted } from 'vue'
import voiceUrl from '@/assets/video/zaoshanghao.mp3'
const props = defineProps({
  voiceUrl: String,
  person: Object,
  voiceTime: Number,
})
//语音时间 
let time =ref(parseInt(props.voiceTime))

//播放语音
let musicAudio = ref()
console.log(musicAudio)
function play() {
    musicAudio.value.play()
}
function btnPlay() {
    play()
}

// console.log(props.voiceTime)
</script>
<style scoped lang='less'>
.littervoice{
  width: 65%;
}
.chat{
  width: 80%;
  display: flex;
  align-items: center;

  .chat-text {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 90%;
  padding-top: 15px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px 20px 20px 5px;
  background-color: #ffffff;
  color: #ffffff;
  cursor: pointer;
    .yuyin-img{
      width: 80px;
      height: 40px;
      margin-left: -10px;
      margin-bottom: 2px;
      color: #000000;
    }
    &:hover {
    background-color: rgb(156, 155, 155);
    }
    .yuyin-title{
      display: flex;
      align-items: center;
      .yuyin-time{
        font-size: 18px;
        color: #000000;
        margin-bottom: 5px;
      }
    }

  }
  .change{
    background-color: rgb(161, 153, 153);
    height: 25px;
    border-radius: 15px;
    width: 20%;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    cursor: pointer;
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