<template>
  <div class="swiper-container">
    <!-- 轮播图 -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="img" src="../../../assets/imgs/login.png" />
      </swiper-slide>
      <swiper-slide>
        <img class="img" src="../../../assets/imgs/register.png" />
      </swiper-slide>
      <swiper-slide>
        <img class="img" src="../../../assets/imgs/code.png" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "User",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;

  .img {
    width: 587px;
    height: 373px;
    margin: 0 156px 0 267px;
  }
}
</style>
