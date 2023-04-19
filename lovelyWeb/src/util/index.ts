// @ts-nocheck
//防抖
export function debounce(fn) {
  let t = null //只会执行一次
  debugger
  return function () {
    if (t) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      console.log(temp);  //可以获取
      // console.log(arguments[0]) //undefined
      fn.apply(this, arguments)
      //在这个回调函数里面的argument是这个回调函数的参数，因为没有参数所以undefined，可以通过外面的函数赋值来进行访问
      //也可以改变成箭头函数,箭头函数的this是指向定义函数的那一层的，所以访问到的arguments是上一层函数的arguments
    }, 1000)
  }
}

//节流
export function throttle(fn, delay = 200) {
  let timer = null
  console.log(fn);
  debugger
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      debugger
      fn.apply(this, arguments)
      timer = null
    })
  }
}

// 下拉动画
export function animation(obj, target, fn1) {
  // console.log(fn1);
  // fn是一个回调函数，在定时器结束的时候添加
  // 每次开定时器之前先清除掉定时器
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    // 步长计算公式  越来越小
    // 步长取整
    var step = (target - obj.scrollTop) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer);
      // 如果fn1存在，调用fn
      if (fn1) {
        fn1();
      }
    } else {
      // 每30毫秒就将新的值给obj.left
      obj.scrollTop = obj.scrollTop + step;
    }
  }, 10);
}

// 获取当前时间
export function getNowTime() {
  // 创建一个Date对象
  var date = new Date();
  // 获取年份、月份、日期、小时、分钟和秒数
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // 注意月份从0开始计数
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  // 如果月份、日期、小时、分钟或秒数小于10，需要在前面补0
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  // 拼接成字符串
  var currentTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  // 输出结果
  return currentTime;
}

// 格式化时间
export function yueyunFormatDate(dateStr) {
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

// 获取MP3的时长
export function getMP3Duration(url) {
  return new Promise((resolve, reject) => {
    let audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      resolve(+audio.duration);
    });
  });
}
