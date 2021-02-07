<template>
  <div class="container">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside :class="['sidebar', { 'active-collapse': isCollapse }]">
          <v-aside></v-aside>
        </el-aside>
        <el-container class="content">
          <el-main>
            <v-nav-aside></v-nav-aside>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/Header'
import Aside from '../components/Aside'
import NavAside from '../components/NavAside'
import { mapState } from 'vuex'
export default {
  name: 'Layput',
  data () {
    return {}
  },
  mounted () {},
  computed: {
    ...mapState(['isCollapse'])
  },
  components: {
    'v-header': Header,
    'v-aside': Aside,
    'v-nav-aside': NavAside
  }
}
</script>
<style lang="less">
.container,
.el-container {
  height: 100%;
  width:100%;
}
.el-header {
  padding: 0;
  margin: 0;
}
.el-main {
  color: #333;
  text-align: initial;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
