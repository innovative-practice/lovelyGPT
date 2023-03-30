const mammoth = require('mammoth');
const TurndownService = require('turndown')
const fs = require('fs');
const { Poppler } = require("node-poppler");
const filesPath = './2022-2023-1大物2期末考试情况说明.docx';
const pdffile = './hh.pdf';
const poppler = new Poppler();
const optionspdf = {
  firstPageToConvert: 1,
  lastPageToConvert: 1,
};
poppler.pdfToText(pdffile).then((res) => {
  fs.writeFile('test.md', res, res => {
    console.log('文件写入成功：');
  });
});


// var turndownService = new TurndownService()
// const options = {
//   styleMap: ['u => u', "p[style-name='center'] => p.center"],
// };
// mammoth.convertToHtml({ path: filesPath, options: options })
//   .then(function (result) {
//     let html = result.value; // The generated HTML
//     let messages = result.messages; // Any messages, such as warnings during conversion
//     // console.log(html);
//     const md = turndownService.turndown(html);
//     fs.writeFile('test.md', md, res => {
//       console.log('文件写入成功：');
//     });
//   })
//   .done();