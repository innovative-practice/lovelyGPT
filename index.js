const axios = require("axios")
(async () => {
  try {
    let res = await axios.get("http://124.221.89.187:4200/translate", {
      params: {
        text: "你好",
      },
      headers: {
        "Content-Type": "application/json",
      }
    })
    return
  } catch (err) {
    console.log(err.message)
  }
})();
