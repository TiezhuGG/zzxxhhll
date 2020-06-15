<template>
  <div class="choice-enterprise">
    <div class="container" v-for="(item, index) in enterpriseList" :key="index">
      <svg-icon :icon-class="item.svg"></svg-icon>
      <span>{{ item.company_name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoiceEnterprise",
  props: {
    enterprise_num: {
      type: Number,
      default: 0
    },
    enterpriseList: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.choice-enterprise {
  .container {
    width: 429px;
    height: 67px;
    line-height: 67px;
    background: rgba(235, 245, 255, 1);
    border-radius: 7px;

    & {
      margin-bottom: 19px;
    }

    svg {
      font-size: 40px;
      vertical-align: middle;
      margin: 0 13px 0 19px;
    }

    span {
      color: #333;
      font-size: 19px;
    }
  }
}
</style>