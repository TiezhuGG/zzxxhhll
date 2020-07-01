<template>
  <div class="invite-member">
    <div class="background">
      <img class="index-img" src="../../assets/imgs/team-bg.png" />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "InviteMember",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../styles/user.scss";

.invite-member {
  display: flex;

  .background {
    width: 827px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #409eff;
    .index-img {
      width: 572px;
      height: 401px;
    }
  }
}

.el-input__inner {
  height: 60px;
}

.el-select .el-input {
  width: 100px;
  color: #333;
}

.el-select {
  height: 60px;
  line-height: 60px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-form-item__content {
  width: 430px;
}

// 处理input type = number的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>