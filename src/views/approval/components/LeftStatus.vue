<template>
  <div class="left-status">
    <span class="title">今天</span>
    <div class="today" v-for="(item, index) in 2" :key="'index'+index" @click="action">
      <div class="left">
        <svg-icon class="svg" icon-class="approval-icon"></svg-icon>
        <div class="middle">
          <span class="first">审批</span>
          <span class="second">成员加入申请</span>
        </div>
      </div>
      <span class="time">15:22</span>
    </div>

    <span class="title">更早</span>
    <div class="container" v-for="(item, index) in 5" :key="index">
      <div class="left">
        <svg-icon class="svg" icon-class="payroll"></svg-icon>
        <div class="middle">
          <span class="first">产品系统</span>
          <span class="second">欢迎使用产品系统</span>
        </div>
      </div>
      <span class="time">15:22</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  methods: {
    action() {
      this.$emit("focus");
    }
  }
};
</script>

<style lang="scss" scoped>
.left-status {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.today,
.container {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    .middle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 13px;
      .first {
        font-size: 19px;
        color: #303133;
      }
      .second {
        font-size: 16px;
        color: #909399;
      }
    }
  }
}

.title {
  margin: 27px 0 11px 17px;
  font-size: 16px;
  color: #333;
}
.svg {
  font-size: 43px;
  margin-left: 17px;
}
.time {
  margin: 0 17px 25px 0;
  font-size: 16px;
  color: #909399;
}
</style>
