<template>
  <div class="full-screen">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="body">
        <div class="jc-flex">
          <dv-decoration-10 style="width: 33.3%; height: 0.0625rem" />
          <div class="jc-flex">
            <dv-decoration-8
              :color="['#568aea', '#000000']"
              style="width: 2.5rem; height: 0.625rem"
            />
            <div class="title">
              <span class="title-text">大数据可视化平台</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width: 3.125rem; height: 0.1rem"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width: 2.5rem; height: 0.625rem"
            />
          </div>
          <dv-decoration-10
            style="width: 33.3%; height: 0.0625rem; transform: rotateY(180deg)"
          />
        </div>
        <div class="jc-flex jc-between px-2">
          <div class="jc-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="
                width: 6.25rem;
                text-align: left;
                background-color: #0f1325;
              "
            >
              <span class="react-before"></span>
              <span class="text">数据分析1</span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325">
              <span class="text colorBlue">数据分析2</span>
            </div>
          </div>
          <div style="width: 40%" class="jc-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">vue-big-screen</span>
            </div>
            <div
              class="react-left"
              style="
                width: 6.25rem;
                background-color: #0f1325;
                text-align: right;
              "
            >
              <span class="react-after mr-4"></span>
              <span class="text">2020年03月16日 周一 12:00</span>
            </div>
          </div>
        </div>
        <div class="figure">
          <div class="flex-d">
            <div class="water-body">
              <dv-border-box-12>
                <h3>
                  <span class="iconfont icon-title-mark"></span
                  >饮用水源地达标情况
                </h3>
                <div class="jc-justify h-1">
                  <v-centerLeft2
                    v-for="(item, index) in waterData"
                    :key="index"
                    :waterData="item"
                    width="120px"
                    height="64%"
                  ></v-centerLeft2>
                </div>
              </dv-border-box-12>
            </div>
          </div>
          <div class="flex-dd">
            <div class="h-1">
              <dv-border-box-12>
                <v-centerSwiper :swiperData="swiperData"></v-centerSwiper>
              </dv-border-box-12>
            </div>
          </div>
          <div class="flex-d">
            <div class="h-1">
              <dv-border-box-12>
                <h3>
                  <span class="iconfont icon-title-mark"></span
                  >饮用水源地取水量达标现状
                </h3>
                <v-centerLeft1></v-centerLeft1>
              </dv-border-box-12>
            </div>
          </div>
        </div>
        <div class="map-box jc-justify">
          <div class="flex-d">
            <div class="capsule">
              <dv-border-box-12><v-lineLeft></v-lineLeft></dv-border-box-12>
            </div>
          </div>
          <div class="flex-dd">
            <div class="capsule">
              <dv-border-box-12>
                <v-lineChart></v-lineChart>
              </dv-border-box-12>
            </div>
          </div>
          <div class="flex-d">
            <div class="capsule">
              <dv-border-box-12>
                <v-dashboard></v-dashboard>
              </dv-border-box-12>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script type="text/javascript">
import CenterLeft1 from '../components/screenComponets/centerLeft1'
import CenterLeft2 from '../components/screenComponets/centerLeft2'
import centerSwiper from '../components/screenComponets/centerSwiper'
import LineLeft from '../components/screenComponets/lineLeft'
import Dashboard from '../components/screenComponets/dashboard'
import LineChart from '../components/screenComponets/lineChart'
export default {
  data () {
    return {
      loading: false,
      waterData: [
        {
          text: '总用户数',
          value: 0.4
        },
        {
          text: '买家数',
          value: 0.6
        },
        {
          text: '卖家数',
          value: 0.5
        }
      ],
      swiperData: [
        {
          title: '水质',
          lists: [
            {
              name: '水质目标',
              value: '饮用水'
            },
            {
              name: '水质类别',
              value: '50000'
            },
            {
              name: '主要污染物',
              value: '50000'
            }
          ]
        },
        {
          title: '水源',
          lists: [
            {
              name: '水源地类型',
              value: '饮用水'
            },
            {
              name: '取水量(万吨)',
              value: '50000'
            },
            {
              name: '水质类别',
              value: '50000'
            },
            {
              name: '水源地级别',
              value: '50000'
            }
          ]
        },
        {
          title: '断面名称三',
          lists: [
            {
              name: '水源地类型',
              value: '饮用水'
            },
            {
              name: '取水量(万吨)',
              value: '50000'
            },
            {
              name: '水质类别',
              value: '50000'
            },
            {
              name: '水源地级别',
              value: '50000'
            }
          ]
        }
      ]
    }
  },
  components: {
    'v-centerLeft1': CenterLeft1,
    'v-centerLeft2': CenterLeft2,
    'v-centerSwiper': centerSwiper,
    'v-lineLeft': LineLeft,
    'v-dashboard': Dashboard,
    'v-lineChart': LineChart
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/screen";
.full-screen {
  color: #d3d6dd;
  background-color: #000000;
  width: 100%;
  height: 100vh;
  .bg {
    padding: 0.8rem 0.2rem 0 0.2rem;
    background-image: url("../assets/images/all_bg.png");
    background-size: cover;
    background-position: center center;
    .body {
      .jc-flex {
        .flex-jc(center,center,center);
      }
      .jc-justify {
        .flex-jc(center,space-around,justify);
      }
      .jc-between {
        .flex-jc(center,space-between,justify);
        margin: 0.3rem 0;
      }
      .flex-d {
        .flex(1);
      }
      .flex-dd {
        .flex(2);
      }
      .flex-ddd {
        .flex(3);
      }
      .graph {
        .flex(1.5);
      }
      .title {
        position: relative;
        width: 6.25rem;
        text-align: center;
        background-size: cover;
        background-repeat: no-repeat;
        .title-text {
          font-size: 0.3rem;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%);
        }
        .title-bototm {
          position: absolute;
          bottom: -0.375rem;
          left: 50%;
          transform: translate(-50%);
        }
      }
      // 平行四边形
      .react-left {
        cursor: pointer;
        font-size: 0.225rem;
        width: 3.75rem;
        height: 0.625rem;
        line-height: 0.625rem;
        text-align: center;
        transform: skewX(-45deg);

        .react-after {
          position: absolute;
          right: -0.3125rem;
          top: 0;
          height: 0.625rem;
          width: 0.625rem;
          background-color: #0f1325;
          transform: skewX(45deg);
        }

        .text {
          display: inline-block;
          transform: skewX(45deg);
        }
      }

      .react-right {
        cursor: pointer;
        font-size: 0.225rem;
        width: 3.75rem;
        height: 0.625rem;
        line-height: 0.625rem;
        text-align: center;
        transform: skewX(45deg);

        .react-before {
          position: absolute;
          left: -0.3125rem;
          top: 0;
          height: 0.625rem;
          width: 0.625rem;
          background-color: #0f1325;
          transform: skewX(-45deg);
        }

        .text {
          display: inline-block;
          transform: skewX(-45deg);
        }
      }
      .capsule {
        height: 100%;
      }

      h3 {
        height: 50px;
        line-height: 44px;
        text-align: left;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        padding: 5px 22px;
        box-sizing: border-box;
        border-bottom: 1px solid #7ce7fd;
        .icon-title-mark {
          display: inline-block;
          margin-right: 10px;
          font-size: 18px;
        }
      }
      .figure {
        margin-top: 0.25rem;
        height: 240px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 12px;
        // background: green;
        .water-body {
          height: 100%;
          .ar-flex {
            height: 78%;
          }
        }
      }
      .map-box {
        margin-top: 0.25rem;
        padding: 10px 12px;
        position: relative;
        height: 470px;
      }
    }
  }
}
</style>
<style>
.dv-capsule-chart .unit-label {
  display: none !important;
}
.dv-capsule-chart .capsule-container {
  justify-content: space-around;
}
.dv-capsule-chart .label-column div {
  height: 0px;
  line-height: 40px;
}
.dv-capsule-chart .capsule-item .capsule-item-column {
  position: inherit;
}
.dv-capsule-chart .capsule-item {
  box-shadow: 0 0 4px #7ce7fd;
}
.dv-capsule-chart .unit-text {
  line-height: 7px;
}
</style>
