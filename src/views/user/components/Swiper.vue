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
        autoplay: {
          delay: 2000
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(1, 1000, false);
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 587px;
  height: 22rem;

  .img {
    width: 100%;
  }
  .swiper-pagination-bullets {
    bottom: 0;
  }
}
</style>
