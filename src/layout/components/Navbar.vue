<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

      <breadcrumb class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <div class="full">
        <el-tooltip effect="dark" :content="isFullscreen ? '取消全屏' : '全屏'" placement="bottom">
          <i class="el-icon-full-screen" @click="handleFullScreen"></i>
        </el-tooltip>
      </div>
      <el-menu mode="horizontal" class="el-menu-demo">
        <el-submenu index="2" popper-class="infoItem">
          <template slot="title">
            <img :src="avatar" class="avatar" alt="">
            <div class="welcome">
              <!-- <span class="name">{{$t('commons.hi')}},</span> -->
              <span class="name avatarname"> {{ name }}</span>
            </div>
          </template>
          <el-menu-item index="2-2" @click="handleChangePwd">修改密碼</el-menu-item>
          <el-menu-item index="2-3" @click.native="logout">退出登錄</el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              回到首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="640px" title="修改密碼" append-to-body>
      <div class="dialog-content">
        <el-form ref="userForm" :model="userForm" :inline="true" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="old_password" label="原密碼：">
                <el-input v-model="userForm.old_password" class="" type="password" placeholder="請輸入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="password" label="新密碼：">
                <el-input v-model="userForm.password" class="" type="password" placeholder="請輸入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="re_password" label="密碼確認：">
                <el-input v-model="userForm.re_password" class="" type="password" placeholder="請輸入" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <el-button type="primary" class="btn" @click="dialogTableVisible = false">確定</el-button>
          <el-button class="btn transparent-btn" @click="dialogTableVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { editPwd } from '@/api'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
const avatarImg = require('../../assets/images/head_avtor.png')
import md5 from "js-md5"
import _ from "lodash"
import { pwdExgValidate } from "@/config/validate"

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (_.trim(value) === '')
      {
        callback(new Error('請輸入密碼'));

      } else if (!pwdExgValidate.test(value)
        && value !== '')
      {
        callback(new Error('大寫字母、數位、特殊字元至少各有一個，長度大於8。'));
      } else
      {
        callback();
      }
    }
    return {
      name: 'admin',
      avatar: avatarImg,
      isFullscreen: false,
      dialogTableVisible: false,
      userForm: {
        old_password: '',
        password: '',
        re_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: '請輸入密碼 ', trigger: 'blur' },
          { min: 2, max: 16, message: '長度在2到16個字元', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        re_password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  mounted () {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    this.isFullscreen = document.fullscreenElement ? true : false
  },
  beforeDestroy () {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
  },
  methods: {
    handleFullscreenChange () {
      this.isFullscreen = !!document.fullscreenElement;
    },
    saveData (userForm) {
      this.$refs[userForm].validate(async (valid) => {
        if (valid)
        {
          if (this.userForm.password !== this.userForm.re_password)
          {
            this.$message.error('两次新密码不一致')
            return
          }
          const authorCode = localStorage.getItem("authorCode") || ''
          const model = {
            old_password: '###' + md5(md5(authorCode + this.userForm.old_password)),
            password: '###' + md5(md5(authorCode + this.userForm.password)),
            re_password: '###' + md5(md5(authorCode + this.userForm.re_password)),
          }
          const res = await editPwd(model)
          this.$message.success('密码修改成功')
          this.dialogTableVisible = false
        }
      })
    },
    handleChangePwd () {
      this.dialogTableVisible = true
    },
    handleFullScreen () {
      this.isFullscreen ? this.exitFullscreen() : this.requestFullscreen()
    },
    // 全屏
    requestFullscreen () {
      const element = document.documentElement
      if (element.requestFullscreen)
      {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen)
      {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullscreen)
      {
        element.mozRequestFullscreen()
      } else if (element.webkitRequestFullscreen)
      {
        element.webkitRequestFullscreen()
      }
      this.isFullscreen = true
    },
    // 退出全屏
    exitFullscreen () {
      if (document.exitFullscreen)
      {
        document.exitFullscreen()
      } else if (document.msExitFullscreen)
      {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen)
      {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen)
      {
        document.webkitCancelFullScreen()
      }
      this.isFullscreen = false
    },
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #346cd7;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    /* float: left; */
  }

  .right-menu {
    /* float: right; */
    height: 100%;
    line-height: 50px;
    width: 131px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  max-width: 68.3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .name {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }

  .avatarname {
    color: #fff;
    font-weight: bolder;
    font-size: 13px;
  }
}

.el-menu-demo {
  background: none;
  height: 50px;
  margin-left: 10px;
}

.el-menu.el-menu--horizontal {
  border: none;
}

.el-submenu {
  height: 50px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.full {
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 28px;
    cursor: pointer;
    margin-top: 6px;
    color: #89b2ff;
  }
}
</style>

<style lang="scss">
.dialog-content {
  .el-form {
    .el-form-item {
      .el-form-item__label {
        color: #fff !important;
      }
    }
  }
}
</style>