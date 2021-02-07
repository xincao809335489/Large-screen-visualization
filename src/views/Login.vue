<template>
  <div class="login_container">
    <div class="login_box">
      <h3 class="title">商品系统登录</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="login-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="iconfont icon-icon"
            @focus="onUserFocus"
            @blur="onUserBlur"
            :class="['input', isUserFocus ? 'active' : '']"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-zu"
            v-model="ruleForm.password"
            @focus="onPassFocus"
            @blur="onPassBlur"
            :class="['input', isPassFocus ? 'active' : '']"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submit('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import { login } from '../api/http'
export default {
  name: 'login',
  data () {
    return {
      isUserFocus: false,
      isPassFocus: false,
      ruleForm: {
        username: '',
        password: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onUserFocus () {
      this.isUserFocus = true
    },
    onPassFocus () {
      this.isPassFocus = true
    },
    onUserBlur () {
      this.isUserFocus = false
    },
    onPassBlur () {
      this.isPassFocus = false
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    submit (form) {
      this.$refs[form].validate((valid) => {
        if (!valid) return false
        login(this.ruleForm).then((res) => {
          // 返回值
          if (res.list.meta.status !== 200) return this.$message.error('登录失败')
          this.$message.success(res.list.meta.msg)
          this.$store.commit('setMenus', res.list.data.lists)
          this.$store.commit('setUsername', res.list.data.username)
          this.$store.commit('setToken', res.list.data.token)
          this.$router.replace('/')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 26px 0 0 0;
    box-sizing: border-box;
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
    .title {
      padding-left: 20px;
      float: left;
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(41, 151, 246, 1);
    }
  }
  .login-ruleForm {
    position: absolute;
    top: 90px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    /deep/ .el-input--prefix .el-input__inner {
      padding-left: 40px;
    }
    /deep/ .el-input__prefix {
      padding-left: 10px;
    }
    .active {
      /deep/ .el-input__prefix,
      .el-input__suffix {
        color: skyblue;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
