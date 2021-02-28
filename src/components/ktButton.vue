<template>
  <el-button :size="size" :type="type" :disabled="!hasPerms(perms)">{{
    label
  }}</el-button>
</template>

<script>
import { hasPermission } from '../btnPermissions'
export default {
  name: 'KtButton',
  props: {
    label: { // 按钮显示文本
      type: String,
      default: 'Button'
    },
    size: { // 按钮尺寸
      type: String,
      default: 'medium'
    },
    type: { // 按钮类型
      type: String,
      default: 'primary'
    },
    disabled: { // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: { // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    }
  },
  data () {
    return {}
  },
  methods: {
    // 根据返回的权限判断是否可以点击
    hasPerms (perms) {
      return hasPermission(perms)
    }
  }
}
</script>
