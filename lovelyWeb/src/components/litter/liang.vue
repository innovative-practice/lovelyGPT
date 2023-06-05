<template>
  <div class="liang">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, ref, onMounted } from "vue";
// import lovely from "@/assets/liang/liang.model3.json";
// import axios from "axios";
let lovely = "/liang/liang.model3.json";
// const lovely = "/assets/liang/liang.model3.json";
// const lovely = "../../../public/liang/liang.model3.json";
// axios.get("../../../public/liang/liang.model3.json").then((res) => {
//   // console.log(res)
//   lovely.value = res.data;
// });
const liang_warpper = document.getElementById("liang");
const liang = async () => {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    transparent: true,
    resolution: window.devicePixelRatio || 1,
  });
  app.width = liang_warpper?.clientWidth || 500;
  app.height = liang_warpper?.clientHeight;
  const model4 = await PIXI.live2d.Live2DModel.from(lovely);
  model4.x = -50;
  model4.y = -30;
  app.stage.addChild(model4);
  model4.scale.set(0.15);
};
onMounted(async () => {
  await liang();
});
</script>
<style scoped lang="less">
.liang {
  width: 100%;
  height: 74vh;
  z-index: 999;
  overflow: hidden;
}
</style>
