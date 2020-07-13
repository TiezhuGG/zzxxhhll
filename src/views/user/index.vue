<template>
  <div class="user-container">
    <!-- 轮播图 -->
    <Swiper />
    <router-view />
  </div>
</template>

<script>
import Swiper from "./components/Swiper";

export default {
  name: "User",
  data() {
    return {};
  },
  components: {
    Swiper
  }
};
</script>

<style lang="scss">
@import '@/styles/user.scss';
// @import "../../styles/user.scss";

// @media screen and(max-width: 1150px) {
//   .login-container,
//   .register-container,
//   .code-container,
//   .password-container,
//   .enterprise-container,
//   .has-enterprise-container {
//     justify-content: center;
//   }
//   .swiper-container {
//     display: none;
//   }
// }

// .el-form-item__content {
//   width: 430px;
//   margin: auto;
//   padding: 0;
// }

// .el-select {
//   height: 60px;
//   line-height: 60px;
// }

// .input-container .input-with-select .el-input__inner,
// .el-input__inner {
//   height: 60px;
// }

// .input-password .el-input__inner {
//   width: 430px;
//   height: 60px;
// }

// .input-with-select .el-input-group__prepend {
//   width: 89px;
//   color: #333;
//   background-color: #fff;
// }

// .el-checkbox {
//   margin-top: 118px;
//   margin-bottom: 21px;
//   color: #999;
//   font-size: 19px;
// }

// // 处理input type = number的上下箭头
// input::-webkit-outer-spin-button,
// input::-webkit-inner-spin-button {
//   -webkit-appearance: none;
// }
// input[type="number"] {
//   -moz-appearance: textfield;
// }
</style>
