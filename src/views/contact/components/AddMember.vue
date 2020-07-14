<template>
  <div class="add-member">
    <div class="wrap">
      <svg-icon class="svg" icon-class="adduser" />
      <div class="add-txt">
        <span class="add-txt-top">添加团队成员</span>
        <span class="add-txt-bottom">开启团队高效协作体验</span>
      </div>
      <el-button class="btn" type="primary" @click.native.prevent="$router.push('/contact/add')">添加</el-button>
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
    padding: 10px;
    background-color: #e3f1ff;
    border-radius: 8px;
    .svg {
      font-size: 71px;
      margin-right: 6px;
    }
    @media screen and (max-width: 1700px) {
      .svg {
        font-size: 65px;
        margin-right: 14px;
      }
    }
    @media screen and (max-width: 1440px) {
      .svg {
        font-size: 51px;
        margin-right: 14px;
      }
    }
    .add-txt {
      height: 47px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .add-txt-top {
        color: #333;
        font-size: 21px;
        margin-bottom:5px;
      }
      .add-txt-bottom {
        color: #999;
        font-size: 13px;
      }
      @media screen and (max-width: 1700px) {
        .add-txt-top {
          font-size: 18px;
          margin-right: 14px;
        }
        .add-txt-bottom {
          margin-right: 14px;
        }
      }
      @media screen and (max-width: 1440px) {
        .add-txt-top {
          font-size: 11px;
          margin-right: 14px;
        }
        .add-txt-bottom {
          margin-right: 14px;
        }
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