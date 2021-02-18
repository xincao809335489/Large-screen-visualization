<template>
  <div>
    <template v-if="!item.children">
      <el-menu-item :index="item.path">
        <i class="iconfont" :class="item.meta.icon"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        <i class="iconfont" :class="item.meta.icon"></i>
        <span>{{ item.name }}</span>
      </template>

      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.path"
        />
        <el-menu-item v-else :key="child.path" :index="child.path">
          <i class="iconfont" :class="child.meta.icon"></i>
          <span>{{ child.name }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }

}
</script>

<style lang="less">
.el-menu-item,
.el-submenu__title {
  text-align: initial;
  font-size: 16px;
  i {
    font-size: 20px;
    margin-right: 8px;
  }
}
</style>
