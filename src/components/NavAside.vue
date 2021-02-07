<template>
  <div class="breadcrumb">
    <i
      class="iconfont"
      :class="isCollapse ? 'icon-shouqi' : 'icon-zhankai'"
      @click="toggleNavCollapse"
    ></i>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template>
          <el-breadcrumb-item
            :key="route.path"
            :to="{ path: route.path }"
            :class="{ 'is-last-link': i == crumbList.length - 1 }"
            v-for="(route,i) in crumbList"
             @click.native="changeNav(route)"
            >{{ route.name }}
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'NavAside',
  data () {
    return {}
  },
  computed: {
    ...mapState(['isCollapse', 'crumbList'])
  },
  methods: {
    toggleNavCollapse () {
      this.$store.commit('toggleCollapse')
    },
    changeNav (item) {
      if (item.name === '首页') this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb {
  width: 100%;
  text-align: left;
  padding: 14px 16px;
  font-size: 11px;
  display: flex;
  align-items: center;
  box-sizing: inherit;
  .iconfont {
    font-size: 22px;
    margin-right: 20px;
    cursor: pointer;
  }
  .el-breadcrumb__item {
    font-size: 16px;
  }
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}
</style>
