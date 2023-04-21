<template>
  <div class="chat-home">
    <ChatLeft></ChatLeft>
    <ChatMiddle></ChatMiddle>
  </div>
</template>

<script setup lang='ts'>
import ChatLeft from '@/components/chat/ChatLeft.vue';
import ChatMiddle from '@/components/chat/ChatMiddle.vue';
import { reactive, ref } from 'vue'

</script>
<style scoped lang='less'>
.chat-home {
  display: flex;
  width: 100%;
  height: 100%;
  // border: 1px solid red;
}
</style>