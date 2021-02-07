<template>
  <div class="resources">
    <el-row>
      <el-col :span="6" v-for="(item, index) in resources" :key="index">
        <div
          class="grid-content"
          ref="grid"
          @mouseenter="transToWhite(index)"
          @mouseleave="transToBlack(index)"
        >
          <img
            :src="
              require(`../../assets/images/resources/bom_icon${
                index + 1
              }_off.png`)
            "
            alt=""
          />
          <span>{{ item }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Resources',
  data () {
    return {
      resources: ['大气质量', '污染源档案', '数据api', '智能检索']
    }
  },
  methods: {
    // 鼠标移入
    transToWhite (index) {
      // console.log(this.$refs.grid[index].querySelector(
      //   'img'
      // ))
      this.$refs.grid[index].querySelector(
        'img'
      ).src = require(`../../assets/images/resources/bom_icon${
        index + 1
      }_on.png`)
    },
    // 鼠标移除
    transToBlack (index) {
      this.$refs.grid[index].querySelector(
        'img'
      ).src = require(`../../assets/images/resources/bom_icon${
        index + 1
      }_off.png`)
    }
  }
}
</script>

<style lang="less" scoped>
.resources {
  border: 1px solid #ededed;
  margin: 15px 18px;
}
.el-col {
  &:last-child {
    .grid-content {
      border-right: none;
    }
  }
}
.grid-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ededed;
  padding: 12px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background: #0083ff !important;
    background-image: url("../../assets/images/resources/box_bg.png") !important;
  }
  span {
    display: inline-block;
    margin-top: 20px;
  }
}
</style>
