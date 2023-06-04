// 将pdf 转化成 md 的函数

// const { Poppler } = require("node-poppler");
// const poppler = new Poppler();
const fs = require('fs');
const PdfToMd = async (filesPath, outfilesPath) => {
  // TODO: 将pdf 转化成 md 的函数
  // linux系统上面不支持但是windows上面支持，懒得搞了
  console.log(filesPath, outfilesPath)
}
exports.PdfToMd = PdfToMd