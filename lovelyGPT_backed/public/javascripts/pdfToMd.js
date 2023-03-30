// 将pdf 转化成 md 的函数

const { Poppler } = require("node-poppler");
const poppler = new Poppler();
const fs = require('fs');
const PdfToMd = async (filesPath, outfilesPath) => {
  poppler.pdfToText(filesPath).then((res) => {
    fs.writeFile(outfilesPath, res, res => {
      console.log('文件写入成功：');
    });
  });
}
exports.PdfToMd = PdfToMd