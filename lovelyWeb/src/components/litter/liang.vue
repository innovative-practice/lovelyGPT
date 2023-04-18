<template>
  <div class="liang">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang='ts'>
// @ts-nocheck
import { reactive, ref, onMounted } from 'vue'
const lovely = '/src/assets/liang/liang.model3.json'
const liang_warpper = document.getElementById('liang')
const liang = async () => {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    transparent: true,
    resolution: window.devicePixelRatio || 1,
  });
  app.width = liang_warpper?.clientWidth || 500
  app.height = liang_warpper?.clientHeight
  const model4 = await PIXI.live2d.Live2DModel.from(lovely);
  model4.x = -50;
  model4.y = -30;
  app.stage.addChild(model4);
  model4.scale.set(0.15);
}
onMounted(
  async () => {
    await liang()
  }
)

</script>
<style scoped lang='less'>
.liang {
  width: 100%;
  height: 74vh;
  z-index: 999;
  overflow: hidden;
}
</style>