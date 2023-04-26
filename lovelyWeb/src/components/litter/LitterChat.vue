<template>
  <div class="litterchat" :class="{ AIclass: type === 'AI' }">
    <div class="chat-text">
      <span style="font-size:16px">{{ chatContent }}</span>
    </div>
    <div class="info-time">
      <span>{{ person?.name }}</span>
      <span>{{ person?.time }}</span>
      <img :src="person?.avatar" alt="" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
const props = defineProps({
  chatContent: String,
  person: Object,
  type: String
})
</script>
<style scoped lang='less'>
.litterchat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 10px 0;

  .chat-text {
    float: right;
    max-width: 90%;
    padding: 20px;
    border-radius: 20px 20px 5px 20px;
    background-color: #91ed61;
    color: #000000;

    &:hover {
      background-color: rgb(92, 129, 39);
    }
  }


  .info-time {
    margin: 10px 0;
    color: #000000;
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

.AIclass {
  align-items: flex-start;
  // flex-direction: row-reverse;

  .chat-text {
    float: right;
    max-width: 90%;
    padding: 20px;
    border-radius: 20px 20px 20px 5px;
    background-color: rgb(255, 255, 255);
    color: #000000;

    &:hover {
      background-color: rgb(117, 117, 117);
    }
  }


  .info-time {
    margin: 10px 0;
    color: #000000;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;

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
</style>