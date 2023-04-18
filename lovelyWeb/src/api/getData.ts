import base from './index'

let axios = base.axios
let baseUrl = base.baseUrl
let aiBaseUrl = base.aiBaseUrl

export const getVoice = (message: string) => {
  return axios({
    method: 'get',
    url: `${baseUrl}/toVoice/${message}`,
    // url: `${baseUrl}/test`,
  })
    .then(res => {
      return res.data.data
    })
    .catch(err => {
      console.log('出错辣')
    })
}