const openai = require('openai');
require('dotenv').config();
openai.apiKey = process.env.OPENAI_API_KEY;
// 获得多个特征向量
async function create_embeddings(input) {
  let result = []
  let lens = []
}
// 获得单个的特征向量
let text = '你说得对，但是《原神》是由米哈游自研的一款全新开放世界冒险RPG。你将在游戏中探索一个被称作「提瓦特」的幻想世界。 在这广阔的世界中，你可以踏遍七国，邂逅性格各异、能力独特的同伴，与他们一同对抗强敌，踏上寻回血亲之路；也可以不带目的地漫游，沉浸在充满生机的世界里，让好奇心驱使自己发掘各个角落的奥秘……'
async function get_embedding (text) {
  let embedding = openai.Embeddings.create(model="text-embedding-ada-002", input=text)
  console.log(embedding)
}
get_embedding(text)