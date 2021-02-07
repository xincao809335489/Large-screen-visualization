<template>
  <div class="d-flex">
    <div
      :class="className"
      :style="{ width: width, height: height }"
      id="waveEchart"
      ref="waveEchart"
    />
  </div>
</template>

<script type="text/javascript">
import 'echarts-liquidfill' // 在这里引入
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '130px'
    },
    height: {
      type: String,
      default: '60%'
    },
    waterData: {
      type: Object,
      default: () => ({
        text: '总用户数',
        value: 0.5
      })
    }
  },
  data () {
    return {
      chart: null
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  // 写watch监听父页面向本组件传递过来的值,改动之后
  // 重新调用this.initWater()渲染视图数据
  watch: {
    waterData (curVal, oldVal) {
      if (curVal) {
        this.waterData = curVal
        this.$nextTick(() => {
          this.initWave()
        })
      }
    }
  },
  mounted () {
    this.initWave()
  },
  methods: {
    initWave () {
      const _this = this
      setTimeout(() => {
        _this.chart = this.$echarts.init(_this.$refs.waveEchart)
        // 把配置和数据放这里
        _this.chart.setOption({
          title: {
            // 标题
            text: _this.waterData.text,
            textStyle: {
              // 标题的样式
              color: '#fff', // 字体颜色
              fontFamily: 'Microsoft YaHei', // 字体
              fontSize: 14,
              fontWeight: '400',
              align: 'center', // 文字的水平方式
              baseline: 'middle',
              position: 'inside',
              verticalAlign: 'middle' // 文字的垂直方式
            },
            left: 'center', // 定位
            top: '55%'
          },
          series: [
            {
              type: 'liquidFill',
              radius: '95%',
              waveAnimation: true,
              data: [
                {
                  value: _this.waterData.value,
                  direction: 'left',
                  itemStyle: {
                    normal: {
                      color: '#00BCF7',
                      opacity: 0.7
                    }
                  }
                }
              ],
              outline: {
                // show: true , //是否显示轮廓 布尔值
                borderDistance: 1, // 外部轮廓与图表的距离 数字
                itemStyle: {
                  borderColor: '#67E0E3', // 边框的颜色
                  borderWidth: 3, // 边框的宽度
                  shadowBlur: 5 // 外部轮廓的阴影范围 一旦设置了内外都有阴影
                  // shadowColor: '#000' // 外部轮廓的阴影颜色
                }
              },
              itemStyle: {
                opacity: 0.4, // 波浪的透明度
                shadowBlur: 0 // 波浪的阴影范围
              },
              backgroundStyle: {
                color: '#1A5CD7' // 图表的背景颜色
              },
              label: {
                // 数据展示样式
                show: true,
                color: '#fff',
                insideColor: '#fff',
                fontSize: 18,
                fontWeight: 400,
                align: 'center',
                baseline: 'middle',
                position: 'inside'
              }
            }
          ]
        })
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.d-flex {
  width: 100%;
  height: 66%;
  #waveEchart {
    width: 100%;
    height: 100%;
  }
}
</style>
