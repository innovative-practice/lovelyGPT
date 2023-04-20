<template>
  <div class="chat-home">
    <ChatLeft></ChatLeft>

  </div>
</template>

<script setup lang='ts'>
import ChatLeft from '@/components/chat/ChatLeft.vue';
import { reactive, ref } from 'vue'

</script>
<style scoped lang='less'>
.chatHome {
  display: flex;
}
</style>