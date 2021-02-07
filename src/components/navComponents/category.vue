<template>
  <div class="category">
    <a
      href="javascript:void(0)"
      v-for="(card, index) in cards"
      :key="index"
      class="card"
    >
      <i :class="card.line" class="line"></i>
      <dl>
        <dt><img :src="imgPath[index]" alt="" /></dt>
        <dd>
          <span
            ><b>{{ card.title }}</b></span
          >
          <span>{{ card.resources }}</span>
        </dd>
      </dl>
      <ul class="site">
        <li v-for="(item, index) in card.site" :key="index">
          <span
            ><b>{{ item.munber }}</b
            >个</span
          >
          <span>{{ item.sizeInfo }}</span>
        </li>
      </ul>
      <p>{{ card.desc }}</p>
    </a>
  </div>
</template>

<script type="text/javascript">
import { categories } from '../../api/http'
export default {
  name: 'Category',
  data () {
    return {
      cards: [],
      imgPath: {
        0: require('../../assets/images/category/center_icon1.png'),
        1: require('../../assets/images/category/center_icon2.png'),
        2: require('../../assets/images/category/center_icon3.png'),
        3: require('../../assets/images/category/center_icon4.png'),
        4: require('../../assets/images/category/center_icon5.png')
      }
    }
  },
  created () {
    this.getCatgories()
  },
  methods: {
    getCatgories () {
      categories().then((res) => {
        if (res.status === 200) {
          this.cards = res.data.categorits
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.category {
  width: 100%;
  height: 100%;
  margin: 15px 10px;
  display: flex;
  justify-content: space-around;
  .card {
    width: 33.3%;
    height: 100%;
    display: inline-block;
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    color: #606266;
    margin-right: 13px;
    border-radius: 3px;
    margin-bottom: 36px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      border-color: #e6e6e6;
      box-shadow: 0 0 20px 0 #e6e6e6;
    }
    &:last-child {
      margin-right: 0;
    }
    .line {
      display: inline-block;
      width: 100%;
      height: 15px;
      border-radius: 3px 3px 0 0;
    }
    p {
      text-align: center;
      color: #999999;
      margin-bottom: 22px;
      background: #fcfdfd;
    }
    dl {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      padding-top: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ececec;
      span:last-child {
        margin-top: 10px;
        display: block;
      }
      b {
        display: block;
        padding-top: 15px;
        font-size: 20px;
      }
    }
    .site {
      padding-top: 35px;
      padding-bottom: 40px;
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span:first-child {
          margin-bottom: 10px;
        }
        b {
          font-size: 16px;
          color: #0082ff;
        }
      }
    }
  }
}
</style>
