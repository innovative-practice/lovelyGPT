<template>
   <!-- <div class="emoji-content">
    <div class="emoji">
      <div class="emoji-wrapper">
        <ul class="emoji-list">
          <li
            class="emoji-item"
            v-for="(item, index) in emojiList"
            :key="index"
            @click="sendEmoji(item)"
          >
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
     </div>
    <div class="mask" @click="closeEmoji"></div>
  </div> -->
  test
</template>

<script setup>
// import { ref } from 'vue'

// const emojiList = ref([
//   require('@/assets/img/emoji/slightly-smiling-face.png'),
//   require('@/assets/img/emoji/smiling-face.png'),
//   require('@/assets/img/emoji/smiling-face-with-heart-eyes.png'),
//   require('@/assets/img/emoji/smiling-face-with-sunglasses.png'),
//   require('@/assets/img/emoji/thinking-face.png'),
//   require('@/assets/img/emoji/tired-face.png'),
//   require('@/assets/img/emoji/money-mouth-face.png'),
//   require('@/assets/img/emoji/loudly-crying-face.png'),
//   require('@/assets/img/emoji/pouting-face.png'),
//   require('@/assets/img/emoji/face-screaming-in-fear.png'),
//   require('@/assets/img/emoji/face-vomiting.png'),
//   require('@/assets/img/emoji/face-without-mouth.png'),
//   require('@/assets/img/emoji/face-with-tongue.png'),
//   require('@/assets/img/emoji/clown-face.png'),
//   require('@/assets/img/emoji/new-moon-face.png'),
//   require('@/assets/img/emoji/ghost.png'),
//   require('@/assets/img/emoji/jack-o-lantern.png'),
//   require('@/assets/img/emoji/money-bag.png'),
//   require('@/assets/img/emoji/pile-of-poo.png'),
//   require('@/assets/img/emoji/shamrock.png'),
//   require('@/assets/img/emoji/hibiscus.png'),
//   require('@/assets/img/emoji/lips.png'),
//   require('@/assets/img/emoji/sparkles.png'),
//   require('@/assets/img/emoji/star.png'),
//   require('@/assets/img/emoji/two-hearts.png'),
//   require('@/assets/img/emoji/rainbow.png'),
//   require('@/assets/img/emoji/thought-balloon.png'),
// ])

// const sendEmoji = (item) => {
//   emit('sendEmoji', item)
// }

// const closeEmoji = () => {
//   emit('closeEmoji')
// }

</script>

<style scoped lang="less" >
// .emoji-content {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 100;
//   .emoji {
//     position: relative;
//     width: 100%;
//     height: 200px;
//     background-color: #fff;
//     .emoji-wrapper {
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       overflow: hidden;
//       .emoji-list {
//         display: flex;
//         flex-wrap: wrap;
//         padding: 10px;
//         .emoji-item {
//           width: 20%;
//           padding: 5px;
//           img {
//             width: 100%;
//           }
//         }
//       }
//     }
//   }
//   .mask {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//   }
// }

</style>