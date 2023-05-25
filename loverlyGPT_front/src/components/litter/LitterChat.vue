<template>
  <div class="litterchat" :class="{ AIclass: type === 'AI' }">
    <div class="chat-text">
      <span style="font-size: 16px">{{ chatContent }}</span>
    </div>
    <div class="info-time">
      <span>{{ person?.name }}</span>
      <span>{{ person?.time }}</span>
      <img :src="person?.avatar" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatContent: {
      type: String,
      default: "",
    },
    person: {
      type: Object,
      default: () => {
        return {
          name: "GPT",
          time: "2021-01-01",
          avatar: require("@/assets/img/head.jpg"),
        };
      },
    },
    type: {
      type: String,
      default: "AI",
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
