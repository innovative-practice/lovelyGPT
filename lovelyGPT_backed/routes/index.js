var express = require('express');
var router = express.Router();
// 下载文件并保存到本地upload文件夹中
const multer = require('multer');
const fs = require('fs')
const path = require('path')
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
const iconv = require('iconv-lite')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  res.send('test');
});

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


module.exports = router;
