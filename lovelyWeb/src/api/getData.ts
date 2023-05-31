import base from './index'
import Ai from '@/assets/AIimgs/1.jpg'
let myaxios = base.axios
let baseUrl = base.baseUrl
let aiBaseUrl = base.aiBaseUrl
let proDuctUrl = base.proDuctUrl

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

// 获取模型列表
export const getModels = (token: string) => {
  return myaxios({
    method: 'get',
    baseURL: `${aiBaseUrl}/v1/models`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  }).then(res => {
    const modelsObj: any = []
    //获取所有的模型
    const models = [...new Set(res.data.data.map((model: any) => model.id))].sort();
    models.forEach((model, index) => {
      let modelObj = {
        img: Ai,
        name: model,
        detail: 'EXPLOSION!!!!!!!!!!!!!',
        lastMsg: model + "模型",
        id: model,
        headImg: Ai,
      }
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
