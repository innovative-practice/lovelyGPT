import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

const Arrimgs = [
  require('@/assets/img/AIimgs/1.jpg'),
  require('@/assets/img/AIimgs/2.jpg'),
  require('@/assets/img/AIimgs/3.jpg'),
  require('@/assets/img/AIimgs/4.jpg'),
  require('@/assets/img/AIimgs/5.jpg'),
  require('@/assets/img/AIimgs/6.jpg'),
  require('@/assets/img/AIimgs/7.jpg'),
  require('@/assets/img/AIimgs/8.jpg'),
  require('@/assets/img/AIimgs/9.jpg'),
  require('@/assets/img/AIimgs/10.jpg'),
  require('@/assets/img/AIimgs/11.jpg'),
  require('@/assets/img/AIimgs/12.jpg'),
  require('@/assets/img/AIimgs/13.jpg'),
  require('@/assets/img/AIimgs/14.jpg'),
  require('@/assets/img/AIimgs/15.jpg'),
  require('@/assets/img/AIimgs/16.jpg'),
  require('@/assets/img/AIimgs/17.jpg'),
  require('@/assets/img/AIimgs/18.jpg'),
  require('@/assets/img/AIimgs/19.jpg'),
  require('@/assets/img/AIimgs/20.jpg'),
  require('@/assets/img/AIimgs/21.jpg'),
  require('@/assets/img/AIimgs/22.jpg'),
  require('@/assets/img/AIimgs/23.jpg'),
  require('@/assets/img/AIimgs/24.jpg'),
  require('@/assets/img/AIimgs/25.jpg'),
  require('@/assets/img/AIimgs/26.jpg'),
  require('@/assets/img/AIimgs/27.jpg'),
  require('@/assets/img/AIimgs/28.jpg'),
  require('@/assets/img/AIimgs/29.jpg'),
  require('@/assets/img/AIimgs/30.jpg'),
  require('@/assets/img/AIimgs/31.jpg'),
  require('@/assets/img/AIimgs/32.jpg'),
  require('@/assets/img/AIimgs/33.jpg'),
  require('@/assets/img/AIimgs/34.jpg'),
  require('@/assets/img/AIimgs/35.jpg'),
  require('@/assets/img/AIimgs/36.jpg'),
  require('@/assets/img/AIimgs/37.jpg'),
  require('@/assets/img/AIimgs/38.jpg'),
  require('@/assets/img/AIimgs/39.jpg'),
  require('@/assets/img/AIimgs/40.jpg'),
  require('@/assets/img/AIimgs/41.jpg'),
  require('@/assets/img/AIimgs/42.jpg'),
  require('@/assets/img/AIimgs/43.jpg'),
  require('@/assets/img/AIimgs/44.jpg'),
  require('@/assets/img/AIimgs/45.jpg'),
  require('@/assets/img/AIimgs/46.jpg'),
  require('@/assets/img/AIimgs/47.jpg'),
  require('@/assets/img/AIimgs/48.jpg'),
  require('@/assets/img/AIimgs/49.jpg'),
  require('@/assets/img/AIimgs/50.jpg'),
  require('@/assets/img/AIimgs/51.jpg'),
  require('@/assets/img/AIimgs/52.jpg'),
  require('@/assets/img/AIimgs/53.jpg'),
  require('@/assets/img/AIimgs/54.jpg'),
  require('@/assets/img/AIimgs/55.jpg'),
  require('@/assets/img/AIimgs/56.jpg'),
  require('@/assets/img/AIimgs/57.jpg'),
  require('@/assets/img/AIimgs/58.jpg'),
  require('@/assets/img/AIimgs/59.jpg'),
  require('@/assets/img/AIimgs/60.jpg'),
  require('@/assets/img/AIimgs/61.jpg'),
  require('@/assets/img/AIimgs/62.jpg'),
  require('@/assets/img/AIimgs/63.jpg'),
  require('@/assets/img/AIimgs/64.jpg'),
]

const statements = ["十五日得半卷诗稿，遇墨迹化魂水中。",
  "—朝有悟，臻至化境。",
  "神游千山外，化墨入深潭。",
  "但承青莲有侠志,莫道红尘无剑仙。",
  "—生疏狂尽余欢,半剖肝胆入剑寒。",
  "剑至高危如蜀道，生逢穷途行路难。",
  "江湖风雨染白衫，黑云万里不见天。",
  "宠辱两相忘，所欲随心安。",
  "形神不随尘世改，日月青冥纷纷化入剑中来。",
  "倾尽绿蚁花尽开，问潭底剑仙安在哉?",
  "昨日前事皆可弃，明月松风抱剑来。",
  "天地逆旅，过客归人。",
  "恩怨随风了无痕。",
  "席卷英豪天下来!"]

// 获取模型列表
export const getModels = token => {
  return axios({
    method: 'get',
    baseURL: `${baseUrl}/v1/models`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  }).then(res => {
    const modelsObj = []
    //获取所有的模型
    const models = [...new Set(res.data.data.map(model => model.id))].sort();
    models.forEach((model, index) => {
      let modelObj = {
        img: "",
        name: model,
        detail: statements[Math.floor(Math.random() * statements.length)],
        lastMsg: model + "模型",
        id: model,
        headImg: Arrimgs[index],
        showHeadImg: true
      }
      modelsObj.push(modelObj)
    });
    return modelsObj;
  })
}

// 完成对话指令
// export const getChatCompletion = (params,token) => {
//   return axios({
//     method: 'post',
//     baseURL: `${baseUrl}/v1/chat/completions`,
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json'
//     },
//     data: params
//   }).then(res => {
//     console.log("chatgpt说")
//     return res.data.choices[0].message.content;
//   })
// }


// 完成指令
// export const getCompletion = async (params,token) => {
//   const response = await axios({
//     method: 'post',
//     baseURL: `${baseUrl}/v1/completions`,
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json'
//     },
//     responseType: 'text',
//     stream: true,
//     data: params
//   }).then(res => {
//     return res.data.choices[0].text;
//   })
// }


// 根据提示创建图像
export const createImage = (params, token) => {
  console.log(params)
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/images/generations`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: params
  }).then(res => {
    return res.data.data;
  })
}

// 根据创建图像变体
export const createImageVariations = (formData, token) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/images/variations`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: formData
  }).then(res => {
    return res.data.data;
  })
}

// 将音频转换为文字
export const createTranscription = (formData, token) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/audio/transcriptions`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: formData
  }).then(res => {
    return res.data;
  })
}

// 将音频翻译成英语
export const createTranslation = (formData, token) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/audio/translations`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: formData
  }).then(res => {
    return res.data;
  })
}

// 创建微调
export const createFineTune = (formData, token) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/fine-tunes`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: formData
  }).then(res => {
    return res.data;
  })
}


// 列出微调
export const getFineTunesList = (formData, token) => {
  return axios({
    method: 'get',
    baseURL: `${baseUrl}/v1/fine-tunes`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: formData
  }).then(res => {
    return res.data;
  })
}


// 列出微调
export const retrieveFineTune = (fineTuneId, token) => {
  return axios({
    method: 'get',
    baseURL: `${baseUrl}/v1/fine-tunes/` + fineTuneId,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: fineTuneId
  }).then(res => {
    return res.data;
  })
}



// 取消微调
export const cancelFineTune = (fineTuneId, token) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/fine-tunes/` + fineTuneId + '/cancel',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: fineTuneId
  }).then(res => {
    return res.data;
  })
}

// 取消微调
export const getFineTuneEventsList = (fineTuneId, token) => {
  return axios({
    method: 'get',
    baseURL: `${baseUrl}/v1/fine-tunes/` + fineTuneId + '/events',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: fineTuneId
  }).then(res => {
    return res.data;
  })
}

// 取消微调
export const deleteFineTuneModel = (model, token) => {
  return axios({
    method: 'delete',
    baseURL: `${baseUrl}/v1/models/` + model,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data"'
    },
    data: model
  }).then(res => {
    return res.data;
  })
}

// 获取账号余额信息
export const getMoneyInfo = token => {
  return axios({
    method: 'get',
    baseURL: `${baseUrl}/dashboard/billing/credit_grants`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.data;
  })
}


// 获取聊天信息
export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params,
  }).then(res => res.data)
}