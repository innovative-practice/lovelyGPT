var express = require('express');
var router = express.Router();
// 下载文件并保存到本地upload文件夹中
const multer = require('multer');
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
const iconv = require('iconv-lite')
/* GET home page. */
// 访问主页的路由
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 访问test的路由
router.get('/test', function (req, res, next) {
  res.send('test');
});

// 处理聊天的路由
router.get('/chat', function (req, res, next) {
  console.log(req.query);
})

// 上传文件的路由
router.post('/DoucQa', uploads.single('file'), function (req, res, next) {
  console.log(req.file);
  const file = req.file;
  fs.renameSync(file.path, `upload/${file.originalname}`)
  file.path = `upload/${file.originalname}`
  // console.log('*******', file.path)
  // 同步执行python代码
  let output = execSync(`python routes/main.py --input_file ${file.path} --file_embeding upload/test.pkl --inputquery axios有什么优势?`)
  console.log('EXPLOSION!!!!');
  let str = iconv.decode(output, 'gbk')
  console.log(str, '***********');
})

router.get('/query', (req, res, next) => {
  console.log(req.query);
})



module.exports = router;
