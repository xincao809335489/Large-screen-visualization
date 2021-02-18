<template>
  <div class="example-3d">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in swiperData" :key="index">
        <div class="water-title">{{item.title}}</div>
        <ul class="water-list">
          <li v-for="(child,idx) in item.lists" :key="idx">
            <p class="name">{{child.name}}</p>
            <p class="value">{{child.value}}</p>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  name: 'swiper-example-3d-coverflow',
  title: '3D Coverflow effect',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    swiperData: {
      type: Array,
      required: true
    }
  },
  mounted () {
    console.log(this.swiperData)
  },
  data () {
    return {
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.example-3d {
  width: 100%;
  height: 100%;
  padding: 12px 10px;
  box-sizing: border-box;
}
.swiper {
  height: 100%;
  width: 100%;
  .swiper-slide {
    width: 46%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    background-image: url("../../assets/images/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: #fff;
    .water-title {
      height: 34px;
      line-height: 22px;
      font-size: 20px;
      color: #fff;
      font-weight: 400;
      width: 177px;
      margin: 5px auto;
    }
    .water-list {
      margin: 30px 30px 0;
      li {
        overflow: hidden;
        margin-top:23px;
        p {
          float: left;
          font-size: 16px;
          color: #fff;
          &.value {
            float: right;
            font-size: 16px;
            color: #ffea00;
            font-weight: bold;
          }
        }
      }
    }
  }
  .swiper-pagination {
    /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: #fff;
    }
  }
}
</style>
