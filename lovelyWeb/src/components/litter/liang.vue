<template>
  <div class="liang">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted } from 'vue'
// import { Live2DModel } from 'pixi-live2d-display'
// import * as PIXI from 'pixi.js'
import './live2d.min.js'
const sb = '/src/assets/liang/liang.model3.json'
const liang = async () => {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    transparent: true,
    resolution: window.devicePixelRatio || 1,
  });
  const model4 = await PIXI.live2d.Live2DModel.from(sb);
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.addChild(model4);
  // app.stage.width = 200 
  // app.stage.height = 200
  model4.scale.set(0.2);
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
  // height: 1000px;
  height: 100%;
  z-index: 999;
}
</style>