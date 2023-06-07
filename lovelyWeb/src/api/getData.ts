import base from './index'
import { getCurrentInstance } from 'vue'
let myaxios = base.axios
let aiBaseUrl = base.aiBaseUrl
let proDuctUrl = base.proDuctUrl
let baseUrl = base.baseUrl
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

// TODO 
// 获取模型列表
export const getModels =  () => {
  return axios.get(`${proDuctUrl}/getModels`, {
    headers: {
      'Content-Type': 'application/json',
  }}).then(res => {
    console.log(res.data.data)
    return res.data.data
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
