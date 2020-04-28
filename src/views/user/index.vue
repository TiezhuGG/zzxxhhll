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
@import '../../styles/user.scss';

// .user-container {
//   min-height: 100%;
//   width: 100%;
//   display: flex;
//   align-items: center;
// }
@media screen and(max-width: 1150px) {
  .login-container,
  .register-container,
  .code-container,
  .password-container,
  .enterprise-container,
  .has-enterprise-container {
    justify-content: center;
  }
  .swiper-container {
    display: none;
  }
}
</style>
