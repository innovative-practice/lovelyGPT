<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li v-for="(item, index) in menuList" :key="index" :class="{ activeNav: index == current }"
          @click="changeMenu(index)">
          <div class="ui">
            <div class="block"></div>
            <span class="iconfont" :class="item"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="own-pic">
      <HeadPortrait :ImgUrl="ImgUrl" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import headjpg from '@/assets/img/header.png'
import HeadPortrait from '@/components/litter/HeadPortrait.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let menuList = ref([
  "icon-xinxi",
  "icon-voice",
  "icon-shezhi",
])
let current = ref(0)
const ImgUrl = headjpg
const changeMenu = (index: number) => {
  current.value = index
  switch (index) {
    case 0:
      router.push('/')
      break;
    case 1:
      router.push('/voice')
      break;
    case 2:
      router.push('/setting')
      break;
    default:
      router.push('/')
      break;

  }
}
</script>
<style scoped lang="less">
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 10px 0 0 10px;
  background-color: rgb(226, 199, 199);

  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);

    .menu-list {
      margin-left: 10px;


      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;
        font-size: 30px;
        .ui{
          width: 60px ;
          margin-left: -40px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          // background-color: red;
          span{
            padding-left: 10px
          }
        }
        .iconfont {
          font-size: 25px;
          // margin-left: -20px;
          transition: 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          // top: 0px;
          margin-left: 0px;
          width: 6px;
          height: 35px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }
          &:hover {
            span {
              color: rgb(29, 144, 245);
              padding-left: 30px;
            }

            .block {
              opacity: 1;
            }
        }

        
      }
    }
  }

  .own-pic {
    position: absolute;
    bottom: 90%;
    margin-left: 15px;
  }
}

.activeNav {
  span {
    color: rgb(29, 144, 245);
    padding-left: 30px !important;
  }

  .block {
    opacity: 1 !important;
  }
}

.iconfont {
  font-size: 25px;
}
</style>