<template>
  <div>
    <el-divider></el-divider>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-nav"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="report">数据统计</el-menu-item>
      <el-menu-item index="cate">数据分类</el-menu-item>
      <el-menu-item index="resource">数据资源</el-menu-item>
      <el-menu-item index="about">关于我们</el-menu-item>
    </el-menu>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script type="text/javascript">
import About from '../components/navComponents/about'
import Category from '../components/navComponents/category'
import Reports from '../components/navComponents/reports'
import Resources from '../components/navComponents/resources'
export default {
  data () {
    return {
      activeIndex: 'report',
      currentView: 'v-report'
    }
  },
  components: {
    'v-about': About,
    'v-cate': Category,
    'v-report': Reports,
    'v-resource': Resources
  },
  methods: {
    handleSelect (key, keyPath) {
      this.currentView = 'v-' + key
      this.activeIndex = key
      window.sessionStorage.setItem('currentView', this.currentView)
      window.sessionStorage.setItem('activeIndex', this.activeIndex)
    }
  },
  computed: {},
  mounted () {
    const currentView = window.sessionStorage.getItem('currentView')
    const activeIndex = window.sessionStorage.getItem('activeIndex')
    this.currentView = currentView || 'v-report'
    this.activeIndex = activeIndex || 'report'
  }
}
</script>

<style lang="less" scoped>
.el-divider--horizontal {
  margin: 2px 0;
}
.el-menu--horizontal > .el-menu-item {
  font-weight: 400;
  color: #606266;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff;
  font-weight: 700;
  text-decoration: none;
  color: #303133;
}
</style>
