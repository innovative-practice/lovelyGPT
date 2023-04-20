<template>
  <div class="chatLeft" style="width:24%">
    <div class="title">
      <h1>AI问答系统</h1>
    </div>
    <div class="online-person" style="margin-top: 5%;">
      <span class="onlin-text">模型列表</span>
      <input class="inputs" v-model="modelSearch" style=" margin-top: 10px;" />
      <div class="s-wrapper">
        <div class="personList" v-for="personInfo in personList" :key="personInfo.id" @click="clickPerson(personInfo)">
          <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import PersonCard from '../litter/PersonCard.vue';
import { getModels } from '@/api/getData'
let modelSearch = ref('')
let personList = await getModels('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')
console.log(personList)
let pcCurrent = ref(personList[0])
// let personList = reactive([{ id: 0 }])
const clickPerson = (personInfo: any) => {
  console.log(personInfo)
}
</script>
<style scoped lang='less'>
.chatLeft {
  width: 280px;
  // overflow: hidden;

  .title {
    color: #fff;
    padding-left: 10px;
  }

  .online-person {
    margin-top: 10%;

    .explosion {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .onlin-text {
      margin-left: 35%;
      padding-left: 10px;
      color: rgb(176, 178, 189);
    }


    .s-wrapper {
      padding-left: 10px;
      height: 65vh;
      margin-top: 10px;
      overflow: hidden;
      overflow-y: scroll;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 0;
        /* Safari,Chrome 隐藏滚动条 */
        height: 0;
        /* Safari,Chrome 隐藏滚动条 */
        display: none;
        /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
    }

    .left-rgiht {
      height: 60vh;
    }
  }
}

.inputs {
  width: 90%;
  height: 50px;
  background-color: #f4e6dd;
  border-radius: 15px;
  border: 2px solid rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  transition: 0.2s;
  font-size: 20px;
  color: #fff;
  font-weight: 100;
  margin: 0 20px;

  &:focus {
    outline: none;
  }
}
</style>