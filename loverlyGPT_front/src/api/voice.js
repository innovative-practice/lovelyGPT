import axios from "axios"


export async function ToVoice(text) {
  let gptRes = await axios.get(`http://124.221.89.187:3000/chat/${text}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  })
  gptRes = gptRes.data.data
  console.log(gptRes)
  let data = JSON.stringify({
    "fn_index": 0,
    "data": [
      gptRes,
      "specialweek",
      "日本語",
      1
    ],
    "session_hash": guid()
  });
  let config = {
    method: 'post',
    url: 'http://127.0.0.1:7860/run/predict/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    },
    data: data
  };
  try {
    let res = await axios(config)
    return res.data.data[1].name
  } catch (e) {
    return e
  }
}

