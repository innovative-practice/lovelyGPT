<template>
  <div class="person-card" :class="{ activeCard: personInfo?.id == current }">
    <div class="info">
      <HeadPortrait :ImgUrl="personInfo?.headImg"></HeadPortrait>
      <div class="info-detail">
        <div class="name">{{ truncateString(personInfo?.name, 17) }}</div>
        <div class="detail">{{ personInfo?.lastMsg }}</div>
      </div>

    </div>
  </div>
</template>

<script setup lang='ts'>
import HeadPortrait from './HeadPortrait.vue';
import { reactive, ref } from 'vue'
const props = defineProps({
  personInfo: Object,
  current: String,
})
const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
</script>
<style scoped lang='less'>
.person-card {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background-color: #ffffff;
  position: relative;
  margin: 25px 0;
  cursor: pointer;

  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;

    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      width: 150px;

      // width: ;
      .name {
        color: #727272;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }

      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        // width: 200px;
      }
    }
  }

  &:hover {
    background-color: #0c0c0c;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgb(0, 0, 0);


    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}

.activeCard {
  background-color: #0c0c0c;
  transition: 0.3s;
  box-shadow: 3px 2px 10px 0px rgb(124, 117, 117);

  .info {
    .info-detail {
      .detail {
        color: #fff;
      }
    }
  }
}
</style>