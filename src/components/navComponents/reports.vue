<template>
  <div class="reports">
    <el-row :gutter="12" class="nav-card">
      <el-col :span="10">
        <el-card shadow="always">
          <i class="el-icon-s-data icon-title"></i>
          <span>热门数据</span>
        </el-card>
        <ul class="collpase">
          <li v-for="(item, index) in collapse" :key="index">
            <i :class="item.className" class="icon"></i>
            <span>{{ item.content }}</span>
          </li>
        </ul>
      </el-col>
      <el-col :span="14">
        <el-card shadow="always" class="air-card"> 全国空气质量AQI日报</el-card>
        <div ref="chart" style="width: 100%; height: 346px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
import { airQualities } from '../../api/http'
export default {
  name: 'Reports',
  data () {
    return {
      collapse: [
        {
          content: '全国城市空气质量小时报',
          className: 'el-icon-cloudy-and-sunny'
        },
        {
          content: '全国站点空气质量实时浓度数据',
          className: 'el-icon-cloudy'
        },
        {
          content: '地表水环境自动检测小时数据',
          className: 'el-icon-sunrise'
        },
        {
          content: '地面观测气象数据',
          className: 'el-icon-pie-chart'
        },
        {
          content: '精细化气象预报数据',
          className: 'el-icon-ice-cream-round'
        }
      ],
      chart: null
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
      this.chart = this.$echarts.init(this.$refs.chart)
      // 获取北京天气指数的json数据
      this.getAirQualities()
    },
    getAirQualities () {
      airQualities().then((res) => {
        const data = res.data
        if (res.status === 200) {
          const air = parseInt(data.air)
          const tem = parseInt(data.tem)
          const winSpeed = parseInt(data.win_speed)
          const option = {
            backgroundColor: '#012248',
            tooltip: {
              formatter: '{a} : {c}' // 修改格式
            },
            series: [
              {
                name: '空气指数',
                title: {
                  color: '#fff'
                },
                type: 'gauge',
                radius: '31%',
                center: ['25%', '60%'],
                min: 0,
                max: 500,
                endAngle: 45,
                splitNumber: 5,
                axisLine: {
                  // 坐标轴线
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    width: this.changeFontSize(5)
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  length: this.changeFontSize(9), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                  }
                },
                axisLabel: {
                  distance: this.changeFontSize(2)
                },
                splitLine: {
                  // 分隔线
                  length: this.changeFontSize(12), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                  }
                },
                pointer: {
                  width: this.changeFontSize(3)
                },
                data: [
                  {
                    value: air,
                    name: '空气指数'
                  }
                ],
                detail: {
                  formatter: function (value) {
                    if (value !== 0) {
                      var num = Math.round(value)
                      return '空气指数：' + parseInt(num).toFixed(0)
                    } else {
                      return 0
                    }
                  },
                  offsetCenter: [0, '110%'],
                  textStyle: {
                    fontSize: this.changeFontSize(14),
                    color: '#fff'
                  }
                }
              },
              {
                name: '温度',
                title: {
                  color: '#fff'
                },
                type: 'gauge',
                center: ['50%', '50%'],
                // radius: this.changeFontSize(70)+'rem',
                radius: '50%',
                min: -10,
                max: 50,
                splitNumber: 6,
                axisLine: {
                  // 坐标轴线
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    width: this.changeFontSize(5)
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  splitNumber: 10,
                  length: this.changeFontSize(10), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                  }
                },
                splitLine: {
                  // 分隔线
                  length: this.changeFontSize(15), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                  }
                },
                axisLabel: {
                  backgroundColor: 'auto',
                  borderRadius: this.changeFontSize(2),
                  color: '#eee',
                  padding: this.changeFontSize(3),
                  textShadowBlur: this.changeFontSize(2),
                  textShadowOffsetX: this.changeFontSize(1),
                  textShadowOffsetY: this.changeFontSize(1),
                  textShadowColor: '#222'
                },
                detail: {
                  formatter: function (value) {
                    if (value !== 0) {
                      var num = Math.round(value)
                      return '温度：' + parseInt(num).toFixed(0) + '°C'
                    } else {
                      return 0
                    }
                  },
                  offsetCenter: [0, '110%'],
                  textStyle: {
                    fontSize: this.changeFontSize(14),
                    color: '#fff'
                  }
                },
                data: [
                  {
                    value: tem,
                    name: '温度'
                  }
                ],
                pointer: {
                  width: this.changeFontSize(5) // 指针粗细
                }
              },
              {
                name: '风级',
                title: {
                  color: '#fff'
                },
                type: 'gauge',
                center: ['75%', '56%'],
                // radius: this.changeFontSize(45)+'rem',
                radius: '30%',
                min: 0,
                max: 10,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: {
                  // 坐标轴线
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    width: this.changeFontSize(5)
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  splitNumber: 5,
                  length: this.changeFontSize(9), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                  }
                },
                axisLabel: {
                  distance: this.changeFontSize(2)
                },
                splitLine: {
                  // 分隔线
                  length: this.changeFontSize(12), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                  }
                },
                pointer: {
                  width: this.changeFontSize(2)
                },
                data: [
                  {
                    value: winSpeed,
                    name: '风级'
                  }
                ],
                detail: {
                  show: false
                }
              },
              {
                name: '风级',
                title: {
                  color: '#fff'
                },
                type: 'gauge',
                center: ['75%', '56%'],
                // radius: this.changeFontSize(45)+'rem',
                radius: '30%',
                min: 0,
                max: 10,
                startAngle: 315,
                endAngle: 225,
                splitNumber: 2,
                axisLine: {
                  // 坐标轴线
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    width: this.changeFontSize(5)
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  splitNumber: 5,
                  length: this.changeFontSize(9), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto'
                  }
                },
                axisLabel: {
                  distance: this.changeFontSize(2)
                },
                splitLine: {
                  // 分隔线
                  length: this.changeFontSize(12), // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                  }
                },
                pointer: {
                  width: this.changeFontSize(2)
                },
                data: [
                  {
                    value: winSpeed,
                    name: '风级'
                  }
                ],
                detail: {
                  formatter: function (value) {
                    if (value !== 0) {
                      var num = Math.round(value)
                      return '风级：' + parseInt(num).toFixed(0) + '级'
                    } else {
                      return '风级：' + 0 + '级'
                    }
                  },
                  offsetCenter: [0, '140%'],
                  textStyle: {
                    fontSize: this.changeFontSize(14),
                    color: '#fff'
                  }
                }
              }
            ]
          }
          this.chart.setOption(option)
        }
      })
    },
    changeFontSize (val) {
      return val
    }
  }
}
</script>

<style lang="less">
.reports{
  margin:15px 10px;
}
.el-card {
  border-radius: 0;
  font-weight: 400;
  color: #fff;
  font-size: 17px;
  .el-card__body {
    background: #0082ff;
    padding: 18px;
  }
  .icon-title {
    margin-right: 10px;
    color: #fff;
    font-size: 18px;
  }
  &.air-card {
    .el-card__body {
      text-align: center !important;
    }
  }
}
.collpase {
  margin: 10px 0;
  li {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #606266;
    padding: 16px;
    margin: 18px 0;
    box-sizing: border-box;
    .icon {
      margin-right: 10px;
      font-size: 18px;
    }
    &:hover {
      border-color: #0082ff;
      box-shadow: 0 0 8px #0082ff;
      font-weight: 700;
      text-decoration: none;
      color: #303133;
      cursor: pointer;
      .icon {
        color: #0082ff;
      }
    }
  }
}
</style>
