const officeParser = require('officeparser');
const fs = require('fs')
async function DocToMd(filesPath, outfilesPath) {
  officeParser.parseOfficeAsync(filesPath)
    // "data" string in the promise here is the text parsed from the office file passed in the argument above
    .then((data) => {
      // console.log(data)
      try {
        fs.writeFileSync(outfilesPath, data)
        console.log('文件写入成功')
      } catch (e) {
        console.log('文件写入失败', e)
      }
    })
    .catch((err) => {
      console.log(err)
    }
    )
}
exports.DocToMd = DocToMd
