<template>
  <div ref="graphChart" style="width: 100%; height: 100%"></div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      chart: null,
      // 原始数据
      echartList: [
        {
          name: '码头船只',
          value: 160,
          color: 'rgb(77, 231, 55)',
          lightColor: '#cd6679'
        },
        {
          name: '农业种植',
          value: 135,
          color: 'rgb(206, 188, 11)',
          lightColor: '#57ec94'
        },
        {
          name: '道路',
          value: 166,
          color: 'rgb(98, 224, 224)',
          lightColor: '#cda558'
        }
      ]
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
      this.chart.resize()
    },
    initEchart () {
      // 在函数中获取节点并渲染
      this.chart = this.$echarts.init(this.$refs.graphChart)
      // 获取北京天气指数的json数据
      this.getDashboards()
    },
    getDashboards () {
      const _this = this
      // 最大值
      let maxValue = 0
      this.echartList.forEach(function (item) {
        if (item.value > maxValue) {
          maxValue = item.value
        }
      })
      // 图表data数据
      const echartData = []
      this.echartList.forEach(function (item, index) {
        echartData.push({
          name: item.name,
          x: ((index * maxValue) / _this.echartList.length) * 1.5,
          y: _this.echartList.length === 2 ? 0 : (index % 2) * 50,
          value: item.value,
          symbolSize: 85,
          label: {
            show: true,
            fontSize: 17,
            fontWeight: 100
          },
          itemStyle: {
            color: {
              type: 'circle',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: item.lightColor // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: item.color // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: item.color // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        })
      })
      // 指定图表的配置项和数据
      const option = {
        tooltip: {},
        series: [
          {
            type: 'graph',
            layout: 'force',
            hoverAnimation: true,
            force: {
              // 力引导图基本配置
              layoutAnimation: true,
              gravity: 0.01, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 80 // 边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长},
            },
            symbolSize: 10,
            roam: true,
            nodeScaleRatio: 0.6,
            grid: {
              left: '20%',
              right: '30%'
            },
            label: {
              show: true,
              fontSize: 10
            },
            edgeSymbol: ['circle'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 10
            },
            left: '12%',
            right: '15%',
            data: echartData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
