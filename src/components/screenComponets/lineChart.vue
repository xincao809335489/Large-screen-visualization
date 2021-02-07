<template>
  <div class="barEchart">
    <div ref="bar" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      bar: null
    }
  },
  mounted () {
    // 注：此处要用addEventListener,如果用 window.onresize = function(){},如果别的组件也用了onresize事件，就容易覆盖掉此处的函数
    window.addEventListener('resize', this.chartResize)
    this.initEchart()
  },
  destroyed () {
    window.removeEventListener('resize', this.chartResize)
  },
  methods: {
    chartResize () {
      this.bar.resize()
    },
    initEchart () {
      // 在函数中获取节点并渲染
      this.bar = this.$echarts.init(this.$refs.bar)
      // 获取北京天气指数的json数据
      this.getBarDatas()
    },
    getBarDatas () {
      // 使用刚指定的配置项和数据显示图表
      const option = {
        color: ['#4150d8', '#28bf7e', '#ed7c2f'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}',
          axisPointer: { // 鼠标移到柱子上的样式设置
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 15
          }
        },
        grid: [
          {
            z: 1
          },
          {
            z: 2
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: { // x轴文字的颜色
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false // y轴刻度线是否显示
            },
            axisLabel: {
              color: '#fff'
            }
          },
          {
            type: 'value',
            max: 100
          }
        ],
        dataZoom: {
          xAxisIndex: [0],
          start: 10,
          end: 80// 初始化滚动条
        },
        series: [
          {
            name: '水源一',
            type: 'bar',
            stack: 'A',
            barWidth: 30, // 柱子的宽度
            slient: true, // 鼠标移到柱子上是否高亮,
            data: [35, 20, 18, 42, 62, 23, 40]
          },
          {
            name: '水源二',
            type: 'bar',
            stack: 'A',
            barWidth: 40,
            silent: true,
            data: [35, 45, 32, 15, 26, 52, 22]
          },
          {
            name: '水源三',
            type: 'bar',
            stack: 'A',
            barWidth: 40,
            silent: true,
            data: [30, 35, 50, 43, 12, 25, 38]
          }
        ]
      }
      this.bar.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.barEchart {
  width: 100%;
  height: 100%;
}
</style>
