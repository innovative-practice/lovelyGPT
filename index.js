const fs = require('fs')
fs.readFile('data.txt', function (err, data) {
  if (err) {
    return console.error(err);
  }
  let datasource = data.toString();
  let mubiao = [];
  datasource = datasource.split('}')
  datasource.shift();
  datasource.pop();
  let res = ''
  mubiao = [... new Set(datasource)]
  mubiao.forEach(ele => {
    // res.push(ele + '}')
    res += ele + '}' + '\n'
  })
  console.log(res)
  fs.writeFile('result.txt', res, function (err) {
    if (err) {
      return console.log('文件写入失败!' + err.message);
    }
    console.log('文件写入成功');
  })

})

