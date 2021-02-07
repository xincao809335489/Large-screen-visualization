<template>
  <div class="header-container">
    <div class="logo">
      <i class="iconfont icon-wunsun-logo"></i>
      <span>文杉科技有限公司</span>
    </div>
    <div class="exit">
      <span>{{ username }}</span>
      <i class="iconfont icon-31_tuichu" @click="logout"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  methods: {
    logout () {
      // 清空token
      sessionStorage.clear()
      this.$router.push('/login')
      window.location.reload()
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['username'])
  }

}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #222;
  color: #fff;
  height: 60px;
  padding: 0 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .iconfont {
    color: aliceblue;
    font-size: 27px;
    &.icon-wunsun-logo {
      margin-right: 10px;
    }
    &.icon-31_tuichu {
      margin-left: 10px;
      color: powderblue;
      cursor: pointer;
    }
  }
  .logo,
  .exit {
    display: flex;
    align-items: center;
  }
}
</style>
