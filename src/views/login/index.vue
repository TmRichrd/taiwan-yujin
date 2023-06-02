<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer four-border">
        <div class="titleArea rflex">
          <span class="title">霧區閃光黃燈管理平台</span>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
          <el-form-item prop="username" class="login-item">
            <span class="loginTips"><i class="icon icon-user" /></span>
            <el-input v-model="loginForm.username" class="area" type="text" placeholder="用戶名"
              @keyup.enter.native="submitForm('loginForm')" />
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <span class="loginTips"><i class="icon icon-password" /></span>
            <el-input v-model="loginForm.password" class="area" type="password" placeholder="密碼"
              @keyup.enter.native="submitForm('loginForm')" />
          </el-form-item>
          <el-form-item prop="yzmCode" class="login-item">
            <div class="flex-row">
              <span class="loginTips"><i class="icon icon-yzm" /></span>
              <el-input v-model="loginForm.yzmCode" class="area flex1" type="text" placeholder="驗證碼"
                @keyup.enter.native="submitForm('loginForm')" />
              <div class="yzm-img">
                <yzm-code ref="yzmcode" :value.sync="validCode" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="loading" :icon="loading ? 'el-icon-loading' : ''" class="submit_btn"
              @click="submitForm('loginForm')">登錄</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
    <!-- <div v-if="tech_support"
         class="footer">技术支持 ：{{ tech_support }}</div> -->
  </div>

  <!-- <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div> -->
</template>

<script>
import { validUsername } from '@/utils/validate'
import yzmCode from '@/components/yzmCode'
import logoImg from '@/assets/img/logo.png'
import md5 from "js-md5"
// import { getTechSupport } from '@/api'
export default {
  name: 'Login',
  components: {
    yzmCode
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value))
      {
        callback(new Error('Please enter the correct user name'))
      } else
      {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6)
      {
        callback(new Error('The password can not be less than 6 digits'))
      } else
      {
        callback()
      }
    }
    return {
      authorCode: "",
      tech_support: '',
      validCode: '',
      logo: logoImg,
      loginForm: {
        username: '',
        password: '',
        yzmCode: ""
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      rules: {
        username: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在2-25之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' }
        ]
        // yzmCode: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted () {
    this.getFootInfo()
  },
  methods: {
    async getFootInfo () {
      // const res = await getTechSupport()
      // console.log(res)
      // this.authorCode = res.authorcode
      // this.tech_support = res.system.tech_support
      // localStorage.setItem("authorCode", res.authorcode)
    },
    submitForm () {
      if (this.validCode !== this.loginForm.yzmCode.toLowerCase())
      {
        this.$message.error('驗證碼錯誤，請重新輸入')
        // 验证码填写错误直接重置，减少用户再次点击操作
        return this.$refs.yzmcode.createdCode()
      }
      this.$refs.loginForm.validate(valid => {
        if (valid)
        {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })

          // const userinfo = {
          //   username: this.loginForm.username,
          //   password: '###' + md5(md5(this.authorCode + this.loginForm.password))
          // }
          // this.$store.dispatch('user/Login', userinfo).then(res => {
          //   this.$router.push({ path: this.redirect || '/' })
          // })
        } else
        {
          console.log('error submit!!')
          return false
        }
      })
    },
    showPwd () {
      if (this.passwordType === 'password')
      {
        this.passwordType = ''
      } else
      {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid)
        {
          this.$router.push({ path: this.redirect || '/' })
          // this.loading = true
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
        } else
        {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #070b40;
  background-image: url("../../assets/img/login_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.form_contianer {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: #0e3482;
  box-shadow: inset 0px 1px 22px 0px #14429e;
  // width: 450px;
  right: 149px;
  padding: 37px 64px;
  text-align: center;

  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    margin-bottom: 32px;

    .title {
      line-height: 33px;
      font-size: 24px;
      color: #58b3d5;
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }

    .yzm-img {
      width: 117px;
      height: 50px;
      background: #fff;
      margin-left: 13px;
    }

    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      // color: #FF7C1A;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);

      .icon {
        display: block;
        width: 24px;
        height: 24px;

        &.icon-user {
          background: url("../../assets/img/uname_icon2x.png") no-repeat;
          background-size: 24px;
        }

        &.icon-password {
          background: url("../../assets/img/password_icon2x.png") no-repeat;
          background-size: 24px;
        }

        &.icon-yzm {
          background: url("../../assets/img/yzm_icon2x.png") no-repeat;
          background-size: 24px;
        }
      }
    }
  }
}

@media screen and(max-width:900px) {
  .form_contianer {
    left: 50%;
    top: 50%;
    right: unset;
    transform: translate(-50%, -50%);
  }
}

.manage_tip {
  margin-bottom: 20px;

  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }

  .logo {
    width: 60px;
    height: 60px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}

.loginForm {
  .el-button--primary {
    background-color: #008aff;
    border: 1px solid #008aff;
  }
}

.footer {
  background: none;
  position: absolute;
  bottom: 10px;
  text-align: center;
  width: 100%;
  line-height: 60px;
  font-size: 18px;
  color: #58b3d5;
}
</style>
