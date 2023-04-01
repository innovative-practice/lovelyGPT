// const fs = require('fs')
// fs.readFile('data.txt', function (err, data) {
//   if (err) {
//     return console.error(err);
//   }
//   let datasource = data.toString();
//   let mubiao = [];
//   datasource = datasource.split('}')
//   datasource.shift();
//   datasource.pop();
//   let res = ''
//   mubiao = [... new Set(datasource)]
//   mubiao.forEach(ele => {
//     // res.push(ele + '}')
//     res += ele + '}' + '\n'
//   })
//   console.log(res)
//   fs.writeFile('result.txt', res, function (err) {
//     if (err) {
//       return console.log('文件写入失败!' + err.message);
//     }
//     console.log('文件写入成功');
//   })

// })
// let obj1 = [{ file: "test", record: [{ role: "user", content: "explosion" }] }]
// let obj2 = obj1[0].record

// obj2.push({ role: "assitant", content: "你干嘛~" })
// let arr = [
//   { role: "user", content: "explosion" },
//   { role: "assitant", content: "你干嘛~" }
// ]
// let arr = JSON.stringify(obj1[0].record)
// let srt = JSON.parse(arr)
// let arr = [1,2,]
// console.log(arr)
// let str = ''
// obj1[0].record.forEach(ele => {
//   console.log(ele)
//   str += JSON.stringify(ele) + ','
// })
// str = '[' + str + ']'
// console.log(str)
// console.log(typeof `${srt}`)

// let imglist = {
//   msg: 'explosion'
// }
// let chatlist = []
// imglist.msg = ''
// chatlist.push(imglist)

//   if (imglist.msg) {
  
  //     console.log(imglist.msg)
  
  // const timer = setInterval(() => {
//     clearInterval(timer)