<template>
  <div class="chatMiddle">
    <div class="chat-window" v-if="selectPerson.person.headImg">
      <div class="top">
        <div class="head-pic">
          <HeadPortrait :ImgUrl="selectPerson.person.headImg"></HeadPortrait>
        </div>
        <div class="info-detail">
          <div class="name">{{ selectPerson.person.name }}</div>
          <div class="detail">{{ selectPerson.person.detail }}</div>
        </div>
        <div class="other-fun">
          <label @click="sc">
            <span class="iconfont icon-snapchat"></span>
          </label>
          <label for="docFile">
            <span class="iconfont icon-wenjian"></span>
          </label>
          <label for="imgFile">
            <span class="iconfont icon-tupian"></span>
          </label>
          <input
            type="file"
            name=""
            id="imgFile"
            @change="sendImg"
            accept="image/*"
          />
          <input
            type="file"
            name=""
            id="docFile"
            @change="sendFile"
            accept="application/*,tenxt/*"
          />
        </div>
      </div>
      <div class="message">
        <div class="chat-content" id="chat-content" ref="chatContent">
          <div
            class="chat-wrapper"
            v-for="(item, index) in messageList"
            :key="index"
          >
            <div v-if="item.type === 'text'" class="chat-me">
              <LitterChat
                :chatContent="item.content"
                :person="item.person"
                type="me"
              ></LitterChat>
            </div>
            <div v-if="item.type === 'AIreply'" class="chat-friend">
              <LitterChat
                :chatContent="item.content"
                :person="item.person"
                type="AI"
              ></LitterChat>
            </div>
            <div v-if="item.type === 'ImgShow'" class="chat-me">
              <div class="chat-img">
                <img
                  class="chat-img-show"
                  :src="item.msg"
                  alt="表情"
                  style="width: 100px; height: 100px"
                />
                <div class="info-time">
                  <span>{{ item.person?.name }}</span>
                  <span>{{ item.person?.time }}</span>
                  <img :src="item.person?.avatar" alt="" />
                </div>
              </div>
            </div>
            <div v-if="item.type === 'fileType'" class="chat-me">
              <div class="chat-img">
                <div class="word-file">
                  <FileCard :fileType="item.extends" :file="item.fileContent">
                  </FileCard>
                </div>
                <div class="info-time">
                  <span>{{ item.person?.name }}</span>
                  <span>{{ item.person?.time }}</span>
                  <img :src="item.person?.avatar" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="chatInputs">
            <!--表情-->
            <div class="emoji boxinput" @click="clickEmoji">
              <img src="@/assets/img/biaoqing.png" alt="" />
            </div>
            <!--录音-->
            <div
              class="send boxinput"
              @click="stopRecording"
              v-if="recording"
              style="
                margin-left: 1.5%;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <span
                class="iconfont icon-microphone"
                style="font-size: 25px"
              ></span>
            </div>
            <div
              class="send boxinput"
              @click="startRecording"
              v-if="!recording"
              style="
                margin-left: 1.5%;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <span
                class="iconfont icon-microphone-mute"
                style="font-size: 25px"
              ></span>
            </div>
            <!--emo表情列表-->
            <div class="emoji-content">
              <Emoji
                v-if="showEmoji"
                @sendEmoji="sendEmoji"
                @closeEmoji="clickEmoji"
              ></Emoji>
              <!-- <Emoji v-if="showEmoji"></Emoji> -->
            </div>
            <textarea
              id="textareaMsg"
              class="inputs"
              style="
                z-index: 9999999999;
                min-height: 50px;
                max-height: 400px;
                max-width: 65%;
                min-width: 65%;
              "
              maxlength="2000"
              rows="3"
              dirautocorrect="off"
              aria-autocomplete="both"
              spellcheck="false"
              autocapitalize="off"
              autocomplete="off"
              v-model="inputMsg"
              @keyup.enter="sendText"
            >
            </textarea>
            <div v-if="acqStatus">
              <div class="send boxinput" @click="sendText">
                <img src="/src/assets/img/send.png" alt="" />
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
        </div>
      </div>
    </div>
    <div v-else class="choose">
      <div class="choose-main">
        <span>Please choose the model !</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { reactive, ref, watch } from "vue";
import HeadPortrait from "../litter/HeadPortrait.vue";
import Emoji from "@/components/Emoji.vue";
import LitterChat from "@/components/litter/LitterChat.vue";
import FileCard from "@/components/litter/FileCard.vue";
import { getNowTime, yueyunFormatDate, getMP3Duration } from "@/util/index";
import headerPng from "@/assets/img/header.png";
import { usePersonStore } from "@/store/index";
import { openApiParams, fileListStore } from "@/store/index";
import { createTranscription } from "@/api/getData";
import axios from "axios";
import pdf from "@/assets/img/fileImg/pdf.png";
import word from "@/assets/img/fileImg/word.png";
import txt from "@/assets/img/fileImg/txt.png";
interface person {
  name: string;
  avatar: string;
  time: string;
}
interface Message {
  type: string;
  content: string;
  person?: person;
  voiceUrl?: string;
  voiceDuration?: any;
  gptchat?: string;
  extends?: string;
  fileContent?: Object;
}
// 数据
let messageList: Message[] = ref([]);
let inputMsg = ref("");
let acqStatus = ref(true);

// 定义录音
const recorder = ref(null);
const audioChunks = ref([]);
// 使用pinia接受参数
// 选择聊天人的消息数据
let selectPerson: any = usePersonStore();
const showEmoji = ref(false);
const recording = ref(false);
const originParams: any = ref({});
// 文件列表的消息数据
const myFileList = fileListStore();
let fileList: Array = ref([]);
fileList.value = myFileList.fileList;
let nowFile: Object = reactive({});
nowFile = myFileList.nowFile;
// 接受openApi参数
const openApi = openApiParams();
// 监听openApi参数
watch(openApi, (newVal, oldVal) => {
  originParams.value = newVal.openApiParams;
});

// 函数
const clickEmoji = () => {
  showEmoji.value = !showEmoji.value;
};
const sendEmoji = (emoji: string) => {
  // inputMsg.value += emoji;
  // 发送表情的逻辑
  // ImgShow
  console.log("sendEmoji");
  acqStatus.value = false;
  let chatMsg = {
    type: "ImgShow",
    msg: emoji,
    person: {
      name: "月晕",
      avatar: headerPng,
      time: yueyunFormatDate(getNowTime()),
    },
  };
  messageList.value.push(chatMsg);
  acqStatus.value = true;
  // 关闭表情
  showEmoji.value = false;
  // smooth滑动
  const chatContent: any = document.getElementById("chat-content");
  // 流畅滑动
  chatContent.scrollTo({
    top: chatContent.scrollHeight,
    behavior: "smooth",
  });
};
// *******
// 语音输入的逻辑
const startRecording = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      recorder.value = new MediaRecorder(stream);
      recorder.value.addEventListener("dataavailable", (event) => {
        audioChunks.value.push(event.data);
      });
      recording.value = true;
      recorder.value.start();
      // 在这里使用录音器
      alert("开始录音");
    })
    .catch((error) => {
      alert(error);
    });
};

const stopRecording = async () => {
  recorder.value.stop();
  recording.value = false;
  recorder.value.ondataavailable = (event) => {
    const blob = new Blob([event.data], { type: "audio/wav" });
    const file = new File([blob], "recording.wav", {
      type: "audio/wav",
      lastModified: Date.now(),
    });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
    formData.append("temperature", "0");
    formData.append("response_format", "text");
    // todo
    formData.append("language", "zh");
    createTranscription(
      formData,
      "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"
    ).then((data) => {
      inputMsg.value = data;
      console.log("111");
      console.log(data);
    });
  };
  alert("结束录音咯");
};

// *********
// 发送消息的逻辑
const sendText = async () => {
  let message = inputMsg.value;
  // 如果消息为空则不发送
  if (!message) return;
  if (inputMsg.value) {
    messageList.value.push({
      type: "text",
      content: inputMsg.value,
      person: {
        name: "月晕",
        avatar: headerPng,
        time: yueyunFormatDate(getNowTime()),
      },
    });
    acqStatus.value = false;
    inputMsg.value = "";
  }
  // 判断是否有文件
  nowFile = fileListStore().nowFile;
  if (Object.keys(nowFile).length !== 0) {
    console.log("nowFile", nowFile);
    // 处理文件聊天的功能
    let data = {
      content: message,
      fileName: nowFile.name,
    };
    await fileCompletion(data);
  } else {
    await completion(message);
    acqStatus.value = true;
    inputMsg.value = "";
  }
  // 滚动条滚动到底部
  const chatContent: any = document.getElementById("chat-content");
  // 流畅滑动
  chatContent.scrollTo({
    top: chatContent.scrollHeight,
    behavior: "smooth",
  });
};

const waitMessage = () => {
  // 等待消息
  console.log("waitMessage");
};
const sc = () => {
  // 截图
  console.log("sc");
};
const sendImg = (e: any) => {
  // 发送图片
  // console.log(e.target.files[0]);
  acqStatus.value = false;
  // 获取文件
  const file = e.target.files[0];
  // 验证文件是否为PNG格式或JPG格式
  if (!/image\/(png|jpg|jpeg)/.test(file.type)) {
    acqStatus.value = true;
    return;
  }
  // 通过验证后上传图片
  const formData = new FormData();
  formData.append("image", file);
  // 上传图片到服务器
  console.log(111);
};
const sendFile = async (e: any) => {
  // 发送文件
  console.log(e.target.files[0]);
  let chatMsg = {
    type: "fileType",
    content: e.target.files[0].name,
    fileContent: e.target.files[0],
    person: {
      name: "月晕",
      avatar: headerPng,
      time: yueyunFormatDate(getNowTime()),
    },
    extends: 0, // (1word，2excel，3ppt，4pdf，5zpi, 6txt)
  };
  let params = new FormData();
  let files = e.target.files[0]; // 文件
  params.append("file", files);
  const header = {
    "Content-Type": "multipart/form-data",
  };
  if (files) {
    switch (files.type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        chatMsg.extends = 1;
        break;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        chatMsg.extends = 2;
        break;
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        chatMsg.extends = 3;
        break;
      case "application/pdf":
        chatMsg.extends = 4;
        break;
      case "application/zip":
      case "application/x-zip-compressed":
        chatMsg.extends = 5;
        break;
      case "text/plain":
        chatMsg.extends = 6;
        break;
      default:
        chatMsg.extends = 0;
    }
    // 如果文件已经存在则不发送
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].name === files.name) {
        alert("文件已存在");
        return;
      }
    }
    // 发送消息
    messageList.value.push(chatMsg);
    try {
      let response = await axios({
        url: "http://124.221.89.187:4200/uploads",
        method: "post",
        data: params,
        headers: header,
      });
      // 回答消息
      // messageList.push({
      //   type: "AIreply",
      //   content: response.data.data,
      //   person: {
      //     name: selectPerson.person.name,
      //     avatar: selectPerson.person.headImg,
      //     time: yueyunFormatDate(getNowTime()),
      //   },
      // });
      let chatResMsg = {
        type: "AIreply",
        content: response.data.data,
        person: {
          name: "月晕",
          avatar: headerPng,
          time: yueyunFormatDate(getNowTime()),
        },
      };
      // sendMsgInternal(chatResMsg);
      messageList.value.push(chatResMsg);
      // 判断文件是否以及在filesList中
      let isExist = false;
      for (let i = 0; i < fileList.value.length; i++) {
        if (fileList.value[i].name === files.name) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        if (files.type == "application/pdf") {
          fileList.valule.push({
            imgs: pdf,
            name: files.name,
            isSelect: 0,
          });
        } else if (
          files.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          fileList.value.push({
            imgs: word,
            name: files.name,
            isSelect: 0,
          });
        } else if (files.type == "application/octet-stream") {
          fileList.value.push({
            imgs: txt,
            name: files.name,
            isSelect: 0,
          });
        } else {
          // this.$message({
          //   message: "暂不支持该文件类型(目前可支持的文件只有pdf、word、md)",
          //   type: "warning",
          // });
          alert("暂不支持该文件类型(目前可支持的文件只有pdf、word、md)");
        }
      }
      if (isExist) {
        // this.$message({
        //   message: "文件已经存在噢~",
        //   type: "warning",
        // });
        alert("文件已经存在噢~");
      }
    } catch (e) {
      console.log(e);
    }
    e.target.files = null;
  }
};

const getOpenApiReply = async (params: any) => {
  // 获取openApi的回复
  // console.log(originParams.value.apiKey);
  try {
    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      body: JSON.stringify({ ...params }),
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      const reader: any = response.body.getReader();
      readStream(reader);
      //跟新messageList渲染
    });
  } catch (err) {
    console.log(err.message);
  }
};

// 有上下文的openai回复
const getConversionAiReply = async (params) => {
  try {
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      const reader: any = response.body.getReader();
      chatReadStream(reader);
    });
  } catch (err) {
    console.log(err.message);
  }
};
//组装上下文数据
const contextualAssemblyData = () => {
  const conversation = [];
  for (var chat of messageList.value) {
    if (chat.type == "text") {
      let my = { speaker: "user", text: chat.content };
      conversation.push(my);
    } else if (chat.type == "AIreply") {
      let ai = { speaker: "agent", text: chat.content };
      conversation.push(ai);
    }
  }
  return conversation;
};

// 回复消息的逻辑
const completion = async (message: any) => {
  // 新增一个空消息
  messageList.value.push({
    type: "AIreply",
    content: "",
    person: {
      name: selectPerson.person.name,
      avatar: selectPerson.person.headImg,
      time: yueyunFormatDate(getNowTime()),
    },
  });
  let params = {
    model: selectPerson.person.id,
    max_tokens: originParams.value.MaxTokens,
    temperature: originParams.value.Temperature,
    top_p: originParams.value.TopP,
    n: originParams.value.n,
    stream: true,
    frequency_penalty: originParams.value.FrequencyPenalty,
    presence_penalty: originParams.value.PresencePenalty,
  };
  if (
    selectPerson.person.id == "gpt-3.5-turbo" ||
    selectPerson.person.id === "gpt-3.5-turbo-0301"
  ) {
    // 具有上下文的gpt3.5
    // params.messages = [
    //   { role: "system", content: sysmsg.value },
    //   { role: "user", content: message },
    // ];
    let conversation = contextualAssemblyData();
    params.messages = conversation.map((item) => {
      return {
        role: item.speaker === "user" ? "user" : "system",
        content: item.text,
      };
    });
    console.log(params.messages);

    // 获取openApi的回复
    getConversionAiReply(params);
  } else {
    // 没有上下文的openai
    params.prompt = message;
    getOpenApiReply(params);
  }
};

// 文件的问答
const fileCompletion = async (data: any) => {
  axios
    .post("http://124.221.89.187:4200/chat", data)
    .then((res) => {
      if (res.data.code === 200) {
        // 新增一个空消息
        messageList.value.push({
          type: "AIreply",
          content: res.data.data,
          person: {
            name: selectPerson.person.name,
            avatar: selectPerson.person.headImg,
            time: yueyunFormatDate(getNowTime()),
          },
        });
        acqStatus.value = true;
      } else {
        alert("服务器出错了~");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("服务器出错了~");
    });
};

// 数据流
const readStream = (reader: any) => {
  return reader.read().then(({ done, value }) => {
    if (done) {
      return;
    }
    let decodeds = new TextDecoder().decode(value);
    let decodedArray = decodeds.split("data: ");
    decodedArray.forEach((decoded) => {
      if (decoded !== "") {
        if (decoded.trim() === "[DONE]") {
          return;
        } else {
          const response = JSON.parse(decoded).choices[0].text;

          // 将messageList的最后一个元素的content替换为response逐字输出
          messageList.value[messageList.value.length - 1].content += response;
        }
      }
    });
    return readStream(reader);
  });
};

//chat的数据流
const chatReadStream = (reader: any) => {
  return reader.read().then(({ done, value }) => {
    if (done) {
      return;
    }
    let decodeds = new TextDecoder().decode(value);
    let decodedArray = decodeds.split("data: ");
    decodedArray.forEach((decoded) => {
      if (decoded !== "") {
        if (decoded.trim() === "[DONE]") {
          return;
        } else {
          const response = JSON.parse(decoded).choices[0].delta.content
            ? JSON.parse(decoded).choices[0].delta.content
            : "";

          // 将messageList的最后一个元素的content替换为response逐字输出
          messageList.value[messageList.value.length - 1].content += response;
        }
      }
    });
    return chatReadStream(reader);
  });
};

// 监听
watch(selectPerson, () => {
  // 当改变人物的时候，清空聊天记录
  messageList.value = [];
});
</script>
<style scoped lang="less">
.chatMiddle {
  flex: 1;
  padding-right: 30px;
  margin: 0;
  padding: 0;

  // background-color: red;
  .showIcon {
    position: relative;
    width: 100%;
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 200px);

    .icon-snapchat {
      width: 300px;
      height: 300px;
      font-size: 300px;
      // color: rgb(28, 30, 44);
    }
  }

  .chat-window {
    height: 100%;
    width: 100%;
    margin-top: -3.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .top {
      margin-bottom: 20px;
      display: flex;
      &::after {
        content: "";
        display: block;
        clear: both;
      }

      .head-pic {
        float: left;
      }

      .info-detail {
        float: left;
        margin: 5px 20px 0;

        .name {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }

        .detail {
          color: #fff;
          font-size: 18px;
          margin-top: 2px;
          width: 100%;
          // overflow: hidden;
          height: 18px;
        }
      }

      .other-fun {
        float: right;
        margin-top: 20px;
        font-size: 25px;
        margin-right: 22px;
        span {
          font-size: 25px;
          margin-left: 20px;
          cursor: pointer;
        }
        // .icon-tupian {

        // }
        input {
          display: none;
        }
      }
    }

    .message {
      width: 90%;
      height: 74vh;
      background-color: #dfdddd;
      left: 7%;
      // top: 10vh;
      border-radius: 20px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;

      .chat-content {
        width: 100%;
        height: 85%;
        overflow-y: scroll;
        padding: 20px;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }

        .chat-wrapper {
          position: relative;
          word-break: break-all;

          .chat-me {
            width: 100%;
            float: right;
            margin-bottom: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
          }

          .chat-friend {
            width: 100%;
            float: left;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }
      }

      .chatInputs {
        width: 100%;
        position: absolute;
        bottom: 0;
        margin-left: -20px;
        padding-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        border-radius: 0 0 15px 15px;

        .boxinput {
          width: 50px;
          height: 50px;
          background-color: rgb(66, 70, 86);
          border-radius: 15px;
          border: 1px solid rgb(80, 85, 103);
          position: relative;
          margin-bottom: 2px;
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

        .emoji {
          transition: 0.5s;
          background-color: #fff;
          border-color: #ffffff;

          img {
            width: 36px;
            height: 36px;
          }

          &:hover {
            box-shadow: 0px 0px 10px 0px rgb(149, 149, 149);
          }
        }

        .inputs {
          width: 65%;
          height: 50px;
          background-color: #e7e6e6;
          border-radius: 15px;
          border: 2px solid #ffffff;
          padding: 10px;
          box-sizing: border-box;
          transition: 0.2s;
          font-size: 20px;
          color: #000000;
          font-weight: 100;
          margin: auto 20px 5px 20px;

          &:focus {
            outline: none;
          }
        }

        .send {
          background-color: rgb(255, 255, 255);
          border: 0;
          transition: 0.3s;
          box-shadow: 0px 0px 5px 0px rgb(255, 255, 255);

          &:hover {
            box-shadow: 0px 0px 10px 0px rgb(149, 149, 149);
          }
        }
      }

      .inputs {
        width: 65%;
        height: 50px;
        background-color: #e7e6e6;
        border-radius: 15px;
        border: 2px solid rgb(189, 189, 189);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #000000;
        font-weight: 100;
        margin: 0 20px;
        overflow: hidden;

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
    }
  }
}

.choose {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10vh;
  align-items: flex-start;
  // align-items: center;
  justify-content: center;

  .choose-main {
    font-size: 40px;
    color: rgb(200, 71, 50);
  }
}
.chat-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  .chat-img-show {
    width: 100px;
    height: 100px;
    margin-right: 25px;
  }
  .info-time {
    margin: 10px 0;
    color: #000000;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
      margin-left: 8px;
    }

    span {
      line-height: 32px;
    }

    span:first-child {
      color: rgb(101, 104, 115);
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
</style>
