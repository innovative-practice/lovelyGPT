import base from './index'
import { getCurrentInstance } from 'vue'
let myaxios = base.axios
let aiBaseUrl = base.aiBaseUrl
let proDuctUrl = base.proDuctUrl
import axios from 'axios'
// 获取语音文件路径
export const getVoice = (message: string) => {
  return myaxios({
    method: 'get',
    baseURL: `${proDuctUrl}/toVoice/${message}`,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => {
    return res.data.data
  }).catch(err => {
    console.log(err)
  })
}

// 获取图片
const getImg = async () =>{
  try{
    let res = await axios.get(`${proDuctUrl}/getImg`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return res.data.data
  } catch(err) {
    console.log(err)
  }
}

// 获取签名
const getWord =  () => {
  return axios.get('https://v1.hitokoto.cn/', {
    headers: {
      'Content-Type': 'application/json'
    }})
    .then(res =>{
      // console.log(res.data.hitokoto)
      // word = res.data.hitokoto
      return res.data.hitokoto
    })
    .catch(err => {
      console.log(err)
  })
}

// 获取模型列表
export const getModels =  (token: string) => {
  return myaxios({
    method: 'get',
    baseURL: `${aiBaseUrl}/v1/models`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  }).then(async res => {
    // 获取图片
    const imgArr:any = await getImg()
    const modelsObj: any = []
    //获取所有的模型
    const models = [...new Set(res.data.data.map((model: any) => model.id))].sort();
    models.forEach( (model, index) => {
      let modelObj = {
        img: imgArr[index],
        name: model,
        detail: 'loading',
        lastMsg: model + "模型",
        id: model,
        headImg: imgArr[index],
      }
      getWord().then(res=>{
        modelObj.detail = res
        // 刷新视图
        getCurrentInstance()?.proxy?.$forceUpdate()
      })
      modelsObj.push(modelObj)
    });
    return modelsObj;
  })
}

// 语音转文字的函数捏
// 将音频转换为文字
export const createTranscription = (formData:any, token:any) => {
  return myaxios({
    method: 'post',
    baseURL: `${aiBaseUrl}/v1/audio/transcriptions`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: formData
  }).then(res => {
    return res.data;
  })
}
