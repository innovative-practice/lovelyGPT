<template>
  <div class="chatLeft" style="width: 24%">
    <div class="title">
      <h1>AI问答系统</h1>
    </div>
    <div class="online-person" style="margin-top: 5%">
      <input
        class="inputs"
        v-model="modelSearch"
        placeholder="Choose model"
        style="margin-top: 10px"
      />
      <div class="s-wrapper">
        <div
          class="personList"
          v-for="personInfo in personList as any"
          :key="personInfo.id"
          @click="clickPerson(personInfo)"
        >
          <PersonCard
            :personInfo="personInfo"
            :current="pcCurrent"
          ></PersonCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import PersonCard from "../litter/PersonCard.vue";
import { getModels } from "@/api/getData";
import { usePersonStore } from "@/store/index";
import { storeToRefs } from "pinia";
let modelSearch = ref("");
let personList: any = ref([]);
let personListCache: any = ref([]);
let pcCurrent = ref();
// 使用pinia传递参数
const selectPerson = usePersonStore();
// 传递给中间组件的数据 <storeToRefs> 做成响应式
let toPerson = storeToRefs(selectPerson);
onMounted(async () => {
  if (selectPerson.personList.length == 0) {
    // 将数据存入缓存 防止重复加载数据捏
    personList.value = await getModels();
    selectPerson.personList = personList.value;
    personListCache.value = personList.value;
  } else {
    personList.value = selectPerson.personList;
    personListCache.value = selectPerson.personList;
  }
});

// 点击函数
const clickPerson = (personInfo: any) => {
  pcCurrent.value = personInfo.id;
  selectPerson.person = personInfo;
};

// 监听搜索函数
watch(modelSearch, (newValue: string, oldValue: string) => {
  console.log(newValue, oldValue);
  if (personList.value.length != 0) {
    personList.value = personListCache.value.filter((item: any) => {
      return item.name.indexOf(newValue) != -1;
    });
  }
  if (newValue == "") {
    personList.value = personListCache.value;
  }
});
</script>
<style scoped lang="less">
.chatLeft {
  width: 280px;
  overflow: hidden;
  margin-top: 15px;

  .title {
    color: #fff;
    position: relative;
    left: 30%;
    font-size: 110%;
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
      height: 70vh;
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
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px solid rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  transition: 0.2s;
  font-size: 20px;
  color: #000000;
  font-weight: 100;
  margin: 0 20px;

  &:focus {
    outline: none;
  }
}
</style>
