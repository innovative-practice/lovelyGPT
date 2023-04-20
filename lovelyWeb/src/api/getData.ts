import base from './index'
import Ai from '@/assets/AIimgs/1.jpg'
let axios = base.axios
let baseUrl = base.baseUrl
let aiBaseUrl = base.aiBaseUrl

// 获取语音文件路径
export const getVoice = (message: string) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/toVoice/${message}`,
    // url: `${baseUrl}/test`,
  })
    .then(res => {
      return {
        data: res.data.data,
        gptchat: res.data.gptchat
      }
    })
    .catch(err => {
      console.log('出错辣')
    })
}

// 获取模型列表
export const getModels = (token: string) => {
  return axios({
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
        img: "",
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