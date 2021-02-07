<template>
  <el-container class="about">
    <el-header class="desc">
      生态环境部信息中心承担生态环境部网络安全和信息化发展规划、技术标准及规范、项目立项论证及实施等方面的技术支撑工作；承担生态环境基础数据库环境数据共享平台建设与管理，以及环境数据整合、减缓、更像和汇合，建设环境信息资源中心；承载环境信息资源综合开发和利用工作，为环境管理部门和社会提供环境数据服务；承担生态环境部政务信息系统、政府网站、网站群、政府服务平台、环境信息化基础设施等的建设、运行和维护，承担环境信息公开技术支持工作；承担环境信息网络安全技术支撑工作；承担生态环境部与国务院其他部门之间的政务信息系统互联互通、业务协同和数据共享等技术支撑工作；承担生态环境部信息化双重管理工作；承担全国环境系统环境信息化技术指导工作，开展环境信息研究、培训、咨询、交流与合作
    </el-header>
    <el-main class="content">
      <el-header class="title"> 部门员工 </el-header>
      <el-main class="pic-content">
        <el-row>
          <el-col :span="4" v-for="(item, index) in pics" :key="index">
            <div class="img-content">
              <el-image
                style="width: 200px; height: 200px"
                :src="item.path"
                :fit="fit"
              ></el-image>
              <span>{{ item.title }}</span>
            </div></el-col
          >
        </el-row>
      </el-main>
    </el-main>
  </el-container>
</template>

<script type="text/javascript">
export default {
  name: 'About',
  data () {
    return {
      fit: 'cover',
      pics: [
        {
          title: '杨幂01',
          path: require('../../assets/images/pictures/01.jpg')
        },
        {
          title: '杨幂02',
          path: require('../../assets/images/pictures/02.jpg')
        },
        {
          title: '杨幂03',
          path: require('../../assets/images/pictures/03.jpg')
        },
        {
          title: '杨幂04',
          path: require('../../assets/images/pictures/04.jpg')
        },
        {
          title: '杨幂04',
          path: require('../../assets/images/pictures/04.jpg')
        },
        {
          title: '杨幂04',
          path: require('../../assets/images/pictures/04.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.desc {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  background: #fafbfc;
  text-indent: 2em;
  font-size: 16px;
  line-height: 2;
  height: 100% !important;
  margin: 15px 18px;
  padding: 10px;
  box-sizing: border-box;
}
.content {
  text-align: center;
  margin-top: 20px;
  .pic-content {
    padding: 28px 18px;
    box-sizing: border-box;
  }
  .title {
    height: auto !important;
    display: inline-block;
    color: #000000;
    font-size: 15px;
    text-align: center;
    border-bottom: 2px solid #409eff;
    padding-bottom: 10px;
  }
  .img-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .el-image {
      -webkit-clip-path: polygon(0px 50%, 50% 0px, 100% 50%, 50% 100%, 0px 50%);
      position: relative;
      &::before,
      &::after {
        transition: height 0.5s;
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 200px;
        display: inline-block;
        height: 0;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }
      &::after {
        top: auto;
        bottom: 0;
        content: "大幂幂";
      }
      &:hover {
        cursor: pointer;
        &::before {
          height: 50%;
          background: rgba(204, 205, 205, 0.6);
        }
        &::after {
          height: 50%;
          background: rgba(204, 205, 205, 0.6);
        }
      }
    }
    span {
      display: inline-block;
      margin-top: 13px;
    }
  }
}
</style>
