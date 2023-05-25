<template>
  <div class="liang">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
// import lovely from "@/assets/liang/liang.model3.json" assert { type: "json" };
import axios from "axios";
export default {
  data() {
    return {
      lovely: "",
    };
  },
  created() {
    // this.initLiang();
    axios
      .get("http://localhost:8080/liang/liang.model3.json")
      .then((res) => {
        console.log("成功", res);
        // this.lovely = res.data;
        console.log(this.lovely, typeof this.lovely);
      })
      .catch((err) => {
        console.log("寄", err);
      });
  },
  methods: {
    async initLiang() {
      const liang_warpper = document.getElementById("liang");
      const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        autoStart: true,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
      });
      app.width = liang_warpper?.clientWidth || 500;
      app.height = liang_warpper?.clientHeight;
      const model4 = await PIXI.live2d.Live2DModel.from(
        // JSON.stringify(this.lovely)
        this.lovely
      );
      model4.x = -50;
      model4.y = -30;
      app.stage.addChild(model4);
      model4.scale.set(0.15);
    },
  },
  mounted: async function () {
    await this.initLiang();
  },
};
</script>

<style lang="scss" scoped>
.liang {
  width: 100%;
  height: 74vh;
  z-index: 999;
  overflow: hidden;
}
</style>
