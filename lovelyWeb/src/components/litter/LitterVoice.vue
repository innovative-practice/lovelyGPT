<template>
  <div class="littervoice">
    <audio src="voiceUrl" controls></audio>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
const props = defineProps({
  voiceUrl: String
})

</script>
<style scoped lang='less'></style>