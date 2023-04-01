const express = require('express');
const router = express.Router();
// 下载文件并保存到本地upload文件夹中
const multer = require('multer');
const fs = require('fs')
const path = require('path')
// 处理上传文件的函数
const uploads = multer({
  dest: path.join(__dirname, '../upload'),
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题
    // console.log('变化前', file.originalname)
    // // file.originalname = Buffer.from(file.originalname, "latin1").toString(
    // //   "utf8"
    // // );
    // console.log('变化后', file.originalname)
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
    data: 'explosion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  })
});

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

// 上传文件的路由
router.post('/uploads', uploads.single('file'), async function (req, res, next) {
  const file = req.file;
  fs.renameSync(file.path, `upload/${file.originalname}`)
  file.path = `upload/${file.originalname}`
  // 将pdf和doc文件转化成md文件
  const newfileName = file.originalname.split('.')[0]
  const flag = ToMd(file, `upload/${newfileName}.md`)
  if (flag) {
    res.send({
      code: 200,
      status: 'ok',
      data: 'explosion'
    })
  } else {
    res.send({
      code: 400,
      error: '请检查文件类型(目前支持的文件有docx,pdf,md)))',
      status: 'error',
      data: null
    })
  }
})

// 保存聊天记录，并对不同的文件有不同的聊天记录
let chatRecord = []


// 查询文件内容并聊天的路由
router.post('/chat', (req, res, next) => {
  const { content, fileName } = req.body
  console.log(content, fileName)
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
  let ans = execSync(`python ${path.join(__dirname, 'main.py')} --input_file ${path.join(__dirname, `../upload/${fileName}.md`)} --file_embeding ${path.join(__dirname, `../upload/${fileName}.pkl`)} --input_query ${content} --chat_record ${str}`)
  ans = iconv.decode(ans, 'gbk')
  realRecord.push({ 'role': 'assistant', 'content': ans })
  // chatRecord.forEach(item => {
  //   if (item.fileName === fileName) {
  //     console.log('item****', item);
  //   }
  // })
  res.send({
    code: 200,
    status: 'ok',
    data: ans
  })
})

router.get('/query', (req, res, next) => {
  console.log(req.query);
})



module.exports = router;