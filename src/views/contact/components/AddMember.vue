<template>
  <div class="add-member">
    <div class="wrap">
      <svg-icon class="svg" icon-class="adduser" />
      <div class="add-txt">
        <span class="add-txt-top">添加团队成员</span>
        <span class="add-txt-bottom">即刻开启团队高效协作体验</span>
      </div>
      <el-button class="btn" type="primary">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddMember",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.add-member {
  .wrap {
    width: 357px;
    height: 107px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #e3f1ff;
    border-radius: 8px;
    .svg {
      font-size: 71px;
    }
    .add-txt {
      height: 47px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .add-txt-top {
        color: #333;
        font-size: 21px;
      }
      .add-txt-bottom {
        color: #999;
        font-size: 13px;
      }
    }
    .el-button {
      width: 64px;
      height: 37px;
      font-size: 16px;
      padding: 0;
      border-radius: 19px;
    }
  }
}
</style>