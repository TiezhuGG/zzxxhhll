<template>
  <div class="user-container">
    <!-- 轮播图 -->
    <swiper class="swiper" />
    <div>
      <router-view />
    </div>
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
.user-container {
  width: 1131px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .swiper {
    flex-shrink: 0;
    margin: 0;
  }
  > div {
    flex-grow: 0;
  }
}
</style>
