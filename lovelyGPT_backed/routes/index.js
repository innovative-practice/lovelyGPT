const express = require('express');
const router = express.Router();
// 下载文件并保存到本地upload文件夹中
const multer = require('multer');
const axios = require('axios')
const fs = require('fs')
const path = require('path')
// 处理上传文件的函数
const uploads = multer({
  dest: path.join(__dirname, '../upload'),
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
})
// 运行python代码
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
// 讲读取文件的buffter 转换为gbk编码的中文汉字
const iconv = require('iconv-lite');
const DocToMd = require('../public/javascripts/docToMd.js')
const PdfToMd = require('../public/javascripts/pdfToMd.js')
/* GET home page. */
// 访问主页的路由
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 访问test的路由
router.get('/test', function (req, res, next) {
  // console.log(req.body);
  res.send({
    code: 200,
    status: 'ok',
    data: 'explosion!'
  })
});

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function ToMd(files, outfilesPath) {
  // console.log(files, '*********');
  let type = files.mimetype;
  // docx文件的mimetype为application/vnd.openxmlformats-officedocument.wordprocessingml.document
  if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // console.log('doc');
    await DocToMd.DocToMd(files.path, outfilesPath)
    return 1
  } else if (type === 'application/pdf') {
    // console.log('pdf');
    await PdfToMd.PdfToMd(files.path, outfilesPath)
    return 1
  }
  // md文件的mimetype为text/markdown 
  else if (type === 'text/markdown') {
    return 1
  } else {
    return 0
  }
}

async function ToVoice(text) {
  let gptRes = await axios.get(`http://124.221.89.187:3000/chat/${text}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive'
    }
  })
  // 通过 chatGpt 返回的数据并转化成日语
  gptRes = gptRes.data.data
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

// 上传文件的路由
router.post('/uploads', uploads.single('file'), async function (req, res, next) {
  const file = req.file;
  console.log(file);
  try {
    fs.renameSync(file.path, `upload/${file.originalname}`)
    file.path = `upload/${file.originalname}`
    // 将pdf和doc文件转化成md文件
    const newfileName = file.originalname.split('.')[0]
    const flag = await ToMd(file, `upload/${newfileName}.md`)
    if (flag) {
      res.send({
        code: 200,
        status: 'ok',
        data: '文件已上传成功,选择右侧文件可以问我问题哦'
      })
    } else {
      res.send({
        code: 400,
        error: '请检查文件类型(目前支持的文件有docx,pdf,md)))',
        status: 'error',
        data: '请检查文件类型(目前支持的文件有docx,pdf,md)))'
      })
    }
  } catch (e) {
    res.send({
      code: 400,
      error: e,
      status: 'error',
      data: '出错辣'
    })
  }
})

// 保存聊天记录，并对不同的文件有不同的聊天记录
let chatRecord = []

// 查询文件内容并聊天的路由
router.post('/chat', (req, res, next) => {
  let { content, fileName } = req.body
  try {
    let realRecord = []
    // 如果聊天记录数组中不存在该文件的聊天记录，则添加该文件的聊天记录
    if (!chatRecord.find(item => item.fileName === fileName)) {
      chatRecord.push({
        fileName,
        record: []
      })
    }
    // 将聊天记录添加到对应的文件中
    chatRecord.forEach(item => {
      if (item.fileName === fileName) {
        realRecord = item.record
        realRecord.push(
          { "role": 'user', "content": content },
        )
      }
    })
    // 将realRecord数组对象转化成字符串并赋值
    let str = ''
    realRecord.forEach(ele => {
      str += JSON.stringify(ele) + ','
    })
    str = '[' + str + ']'
    fileName = fileName.split('.')[0]
    fileName = iconv.encode(fileName, 'utf-8')
    fileName = iconv.decode(fileName, 'utf-8')
    let ans = execSync(`python ${path.join(__dirname, 'main.py')} --input_file ${path.join(__dirname, `../upload/${fileName}.md`)} --file_embeding ${path.join(__dirname, `../upload/${fileName}.pkl`)} --input_query ${content} --chat_record ${str}`)
    ans = iconv.decode(ans, 'gbk')
    realRecord.push({ 'role': 'assistant', 'content': ans })
    res.send({
      code: 200,
      status: 'ok',
      data: ans
    })
  } catch (e) {
    // token 限制则清空聊天记录
    reaklRecord = []
    res.send({
      code: 400,
      error: e,
      status: 'error',
      data: '出错辣'
    })
    console.log(e)
  }
})

// 将文本转化成语音的路由
router.get('/toVoice/:text', async (req, res, next) => {
  const destPath = path.join(__dirname, '../public/video')
  let text = req.params.text
  try {
    let ans = await ToVoice(text)
    let fileName = ans.replace('C:\\Users\\35143\\AppData\\Local\\Temp\\', '').split('.')[0]
    // 将ans复制到video文件下面中以http的形式发送给前端播放
    fs.copyFileSync(ans, path.join(destPath, `${fileName}.mp3`))
    res.send({
      code: 200,
      status: 'ok',
      data: `http://127.0.0.1:3000/video/${fileName}.mp3  `
    })
  } catch (e) {
    res.send({
      code: 400,
      error: e,
      status: 'error',
      data: '出错辣'
    })
    console.log(e)
  }
})

module.exports = router;