<template>
  <div class="littervoice">
    <div class="chat-text">
      <audio :src="voiceUrl" controls></audio>
      <div class="info-time">
        <img :src="person?.avatar" alt="" />
        <span>{{ person?.name }}</span>
        <span>{{ person?.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
const props = defineProps({
  voiceUrl: String,
  person: Object,
})
console.log(props.voiceUrl)
</script>
<style scoped lang='less'>
.chat-text {
  max-width: 90%;
  padding-top: 15px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px 20px 20px 5px;
  background-color: rgb(255, 255, 255);
  color: #fff;

  &:hover {
    background-color: rgb(255, 255, 255);
  }
}

.info-time {
  margin: 10px 0;
  color: #fff;
  font-size: 14px;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  span:last-child {
    color: rgb(101, 104, 115);
    margin-left: 10px;
    vertical-align: middle;
  }
}
</style>