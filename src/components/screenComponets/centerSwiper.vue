<template>
  <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
    <swiper-slide class="slide-1"></swiper-slide>
    <swiper-slide class="slide-2"></swiper-slide>
    <swiper-slide class="slide-3"></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
  name: 'carrousel',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 'auto'
        // Some Swiper option/callback...
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.swiper.slideTo(3, 800, false)
  }
}
</script>

<style lang="less">
// .swiper-slide {
//   width: auto !important;
// }

.swiper {
  width: 98.4%;
  height: 96%;
  border-radius: 12px;
  box-sizing: border-box;
  .swiper-slide {
    background-position: center;
    background-size: cover;
    border-radius: 12px;
    &.slide-1 {
      background-image: url("../../assets/images/pictures/slider1.png");
    }
    &.slide-2 {
      background-image: url("../../assets/images/pictures/slider2.png");
    }
    &.slide-3 {
      background-image: url("../../assets/images/pictures/slider3.png");
    }
  }
}
</style>
