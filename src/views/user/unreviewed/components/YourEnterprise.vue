<template>
  <div class="choice-enterprise">
    <div class="container" v-for="(item, index) in enterpriseList" :key="index">
      <img src="../../../../assets/imgs/test.jpg" alt />
      <div class="txt">
        <span>{{ item.name }}</span>
        <span>{{ item.approval }}</span>
      </div>
      <span class="enter">进入</span>
    </div>
  </div>
</template>

<script>
import Back from "../../components/Back";
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
    height: 70px;
    display: flex;
    align-items: center;
    background: rgba(235, 245, 255, 1);
    border-radius: 7px;

    & {
      margin-bottom: 19px;
    }

    img {
      width: 59px;
      height: 59px;
      margin: 0 13px 0 19px;
      border-radius: 50%;
    }

    .txt {
      width: 210px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span:last-child {
        color: #999;
        font-size: 16px;
      }
    }

    span {
      color: #333;
      font-size: 19px;
    }

    .enter {
      width: 69px;
      height: 32px;
      text-align: center;
      font-size: 16px;
      line-height: 32px;
      margin-left: 35px;
      background: rgba(159, 206, 255, 1);
      color: rgba(255, 255, 255, 1);
      border-radius: 3px;
    }
  }
}
</style>