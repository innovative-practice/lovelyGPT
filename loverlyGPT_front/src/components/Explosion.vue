<template>
  <div class="explosion">
    <audio :src="voiceUrl" controls="controls"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    voiceUrl: {
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

</style>