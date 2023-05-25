import axios from 'axios'
import fs from 'fs/promises'
// const md5 = require('js-md5');
import md5 from 'js-md5'
async function convertTextToSpeech () {
  try {
    const url = 'http://124.221.89.187:3232/models/liang/speakers/1'
    const headers = {
      'Content-Type': 'application/json'
    }
    const data = {
      text: 'Hello, world!',
      language: '日本語',
      speed: 0.95,
      noise_scale: 0.667,
      noise_scale_w: 0.8
    }
    const response = await axios.post(url, data, { headers,responseType: 'arraybuffer' })
    if (response.status === 200 && response.headers['content-type'] === 'audio/wav') {
      const buffer = Buffer.from(response.data, 'binary')
      await fs.writeFile('output.wav', buffer)
      console.log('Downloaded')
    } else {
      console.log('Download failed')
    }
  } catch(err) {
    console.log('发生错误',err.message)
  }
}

// convertTextToSpeech()
async function baiduTra(text) {
  const q = text
  const from = "auto"
  const to = "jp"
  const appid = "20230414001641454"
  const salt = (new Date).getTime()
  const key = "xvfCVyHcnGTtJRfHsO8W"
  const str1 = appid + q + salt + key
  const sign = md5(str1)
  try {
    let res = await axios.get('https://fanyi-api.baidu.com/api/trans/vip/translate', {
      params: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      }
    })
    console.log(res.data)
    console.log(res.data.trans_result[0].dst)
    return res.data.trans_result[0].dst
  } catch (err) {
    console.log(err)
  }
}

baiduTra('你好')