<template>
  <div class="yueyunchat">
    <!-- <div :yueyunchat="yueyunchat">{{ this.yueyunchat }}</div> -->
    <div class="chat-me">
      <div class="chat-text">
        <span style="font-size:16px">{{ this.yueyunchat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    console.log('this.voiceUrl', this.yueyunchat)
  },
  props: {
    yueyunchat: {
      type: String,
      required: true,
      default: ''
    }
  },
  mounted() {
    console.log('this.voiceUrl', this.voiceUrl)
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.chat-me {
  width: 100%;
  float: right;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  .chat-text {
    float: right;
    max-width: 90%;
    padding: 20px;
    border-radius: 20px 20px 5px 20px;
    background-color: rgb(29, 144, 245);
    color: #fff;

    &:hover {
      background-color: rgb(26, 129, 219);
    }
  }
}
</style>