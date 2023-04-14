let res = 'C:\\Users\\35143\\AppData\\Local\\Temp\\tmpjmagu5e9.wav'
// 提取temp文件夹中的文件名
let fileName = res.replace('C:\\Users\\35143\\AppData\\Local\\Temp\\','').split('.')[0]
console.log(fileName, typeof fileName)