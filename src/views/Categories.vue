<template>
  <div class="about">
    <el-divider></el-divider>
    <div class="container">
      <!-- 传入字符串的形式 -->
      <div v-color="'red'">加油中国</div>
      <!-- 传入变量的形式 -->
      <div v-color="color">加油武汉</div>
      <!-- input框自动获取焦点 -->
      <input type="text" v-focus placeholder="请输入文本信息" />
      <!-- 模仿百度图片未加载出来时显示随机背景色自定义指令 -->
      <div
        v-img="img.href"
        v-for="(img, index) in imgs"
        :key="index"
        class="imgBox"
      ></div>
      <!-- 局部自定义拖拽指令 -->
      <div v-direcDrag class="direcDrag"></div>
      <!-- 全局自定义拖拽指令 -->
      <div class="box" v-drag></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Categories',
  data () {
    return {
      color: 'blue',
      imgs: [
        {
          href:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=345259012,3351842855&fm=26&gp=0.jpg'
        },
        {
          href:
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1198144648,3404515358&fm=26&gp=0.jpg'
        },
        {
          href:
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1230608394,2312171092&fm=26&gp=0.jpg'
        },
        {
          href:
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3458375795,575616333&fm=26&gp=0.jpg'
        }
      ]
    }
  },
  directives: {
    color: {
      inserted (el, bind) {
        console.log(bind)
        el.style.color = bind.value
      }
    },
    focus: {
      inserted (el, binding) {
        console.log(el)
        el.focus()
      }
    },
    direcDrag: {
      inserted (el, binding) {
        el.onmousedown = (ev) => {
          // ev.clientX,ev.clientY为鼠标的位置
          // el.offsetLeft, el.offsetTop为元素的位置
          // disX,disY为鼠标相对元素的位置
          const disX = ev.clientX - el.offsetLeft
          const disY = ev.clientY - el.offsetTop
          document.onmousemove = function (event) {
            const l = event.clientX - disX
            const t = event.clientY - disY
            el.style.left = l + 'px'
            el.style.top = t + 'px'
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    },
    img: {
      inserted (el, binding) {
        // const color = Math.floor(Math.random() * 5000)
        // el.style.backgroundColor = '#' + color // 设置随机背景色
        el.style.backgroundColor = '#F1F3F4'
        const img = new Image()
        img.src = binding.value // 获取传给指令的值
        img.onload = function () {
          setTimeout(() => {
            el.style.backgroundPosition = 'center center'
            el.style.backgroundSize = 'cover'
            el.style.backgroundRepeat = 'no-repeat'
            el.style.backgroundImage = 'url(' + binding.value + ')'
          }, 2000)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-divider--horizontal {
  margin: 2px 0;
}
.container {
  padding: 0 50px;
  .box,
  .direcDrag {
    position: absolute;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: red;
    color: #fff;
    font-size: 22px;
    cursor: pointer;
  }
  .box {
    right: 100px;
    top: 354px;
  }
  .imgBox {
    width: 200px;
    height: 200px;
    display: inline-block;
    margin:3px;
  }
}
</style>
