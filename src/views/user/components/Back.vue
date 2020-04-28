<template>
  <div class="back" @click="back">
    <img src="../../../assets/imgs/back.png" />
    <span>返回</span>
  </div>
</template>

<script>
export default {
  name: "Back",
  data() {
    return {};
  },
  methods: {
      back() {
          this.$router.go(-1)
      }
  }
};
</script>

<style lang="scss" scoped>
.back {
  display: flex;
  margin: 31px 0 0 28px;
  img {
    width: 21px;
    height: 21px;
    margin-right: 12px;
  }
  span {
    color: #999;
    font-size: 19px;
  }
}
</style>