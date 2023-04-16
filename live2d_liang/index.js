console.log('live2d_demo');
// const MotionPriority = require('pixi-live2d-display')
const cubism4Model = "./liang_vts/liang.model3.json";

(async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    transparent: true,
    resolution: window.devicePixelRatio || 1,
  });
  const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.addChild(model4);
  // app.stage.width = 200 
  // app.stage.height = 200
  model4.scale.set(0.2);
  console.log(111);
  // 添加交互
  model4.interactive = true;
  // model4
  model4.expression()
  // model4.on('pointertap', async (hitAreas) => {
  //   console.log(hitAreas)
  //   console.log('pointertap')
  // })
})();

