<template>
  <div class="bottom">
    <textarea id="textareaMsg" class="inputs"
      style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 65%;min-width: 65%;" maxlength="2000"
      rows="3" dirautocorrect="off" aria-autocomplete="both" spellcheck="false" autocapitalize="off" autocomplete="off"
      v-model="inputMsg" @keyup.enter="sendText">
              </textarea>
    <div v-if="acqStatus">
      <div class="send boxinput" @click="sendText">
        <img src="@/assets/img/rocket.png" alt="" />
      </div>
    </div>
    <!--等待-->
    <div v-else>
      <div class="send boxinput" @click="waitMessage">
        <div class="spinner">
          <img src="@/assets/img/shuaxin.png" alt="AI回答中" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
let acqStatus = ref(true)
let inputMsg = ref('')
const sendText = () => {
  console.log('sendText')
}
const waitMessage = () => {
  console.log('waitMessage')
}
</script>
<style scoped lang='less'>
.bottom {
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
  width: 90%;
  position: absolute;
  bottom: 0;
  margin: 3%;
  display: flex;
}

.inputs {
  width: 65%;
  height: 50px;
  background-color: #45c4be;
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

.send {
  background-color: rgb(29, 144, 245);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
  }
}

.boxinput {
  width: 50px;
  height: 50px;
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 1px solid rgb(80, 85, 103);
  position: relative;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>