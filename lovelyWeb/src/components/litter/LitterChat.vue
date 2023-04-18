<template>
  <div class="litterchat">
    <div class="chat-me">
      <div class="chat-text">
        <span style="font-size:16px">{{ chatContent }}</span>
      </div>
      <div class="info-time">
        <span>{{ person?.name }}</span>
        <span>{{ person?.time }}</span>
        <img :src="person?.avatar" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
const props = defineProps({
  chatContent: String,
  person: Object,
})
</script>
<style scoped lang='less'>
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
}
</style>