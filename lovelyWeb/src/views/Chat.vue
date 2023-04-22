<template>
  <div class="chat-home">
    <!-- @ts-nocheck -->
    <ChatLeft class="chat-left"></ChatLeft>
    <ChatMiddle class="chat-middle"> </ChatMiddle>
    <ChatRight class="chat-right"></ChatRight>
  </div>
</template>

<script setup lang='ts'>
import ChatLeft from '@/components/chat/ChatLeft.vue';
import ChatMiddle from '@/components/chat/ChatMiddle.vue';
import ChatRight from '@/components/chat/ChatRight.vue';
import { reactive, ref } from 'vue'

</script>
<style scoped lang='less'>
.chat-home {
  display: flex;
  width: 100%;
  height: 100%;

  // border: 1px solid red;
  .chat-middle {
    overflow: hidden;
  }
}
</style>