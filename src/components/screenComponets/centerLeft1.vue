<template>
  <div>
    <dv-capsule-chart :config="config" id="capsule-chart" style="width: 300px; height: 200px" />
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      config: {
        data: [
          {
            name: '市级',
            value: 150
          },
          {
            name: '县级',
            value: 220
          },
          {
            name: '乡镇级',
            value: 300
          }
        ],
        colors: ['#00FF5A', '#FCFF00', '#FF7E15'],
        unit: '单位',
        showValue: true
      }
    }
  }
}
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 75%;
  #capsule-chart{
    height:100% !important;
  }
}
</style>
