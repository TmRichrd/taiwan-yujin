<template>
  <div class="add-road bread-content app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>TCP設定</span>
      </div>
      <div class="form-wrap">
        <el-form ref="tcpForm" :model="tcpForm" :rules="rules" class="tcpForm" label-width="120px">
          <el-form-item prop="ip" class="login-item" label="IP位址：">
            <el-input v-model="tcpForm.ip" label="IP位址：" class="area" type="text" placeholder="請輸入IP位址" />
          </el-form-item>
          <el-form-item prop="texpPort" class="login-item" label="TEXT埠：">
            <el-input v-model="tcpForm.texpPort" label="TEXT埠：" class="area" type="text" placeholder="請輸入TEXT埠" />
          </el-form-item>
          <el-form-item prop="tcpPort" class="login-item" label="TCP埠：">
            <el-input v-model="tcpForm.tcpPort" label="TCP埠：" class="area" type="text" placeholder="請輸入TCP埠" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('tcpForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { getTcpInfo, setTcpInfo } from '@/api'
import Mock from "mockjs"
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      tcpForm: {
        ip: '',
        texpPort: '',
        tcpPort: ''
      },
      rules: {
        ip: [
          { required: true, message: '請輸入IP位址', trigger: 'blur' }
        ],
        texpPort: [
          { required: true, message: '請輸入TEXT埠', trigger: 'blur' }
        ],
        tcpPort: [
          { required: true, message: '請輸入TCP埠', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const data = Mock.mock({
        ip: "@ip",
        texpPort: "@integer(1000, 9999)",
        tcpPort: "@integer(1000, 9999)"
      })
      this.tcpForm.ip = data.ip
      this.tcpForm.texpPort = data.texpPort
      this.tcpForm.tcpPort = data.tcpPort
      // const res = await getTcpInfo({ pathUrl: this.pathUrl })
      // console.log(res)
      // this.tcpForm.ip = res.ip
      // this.tcpForm.texpPort = res.text
      // this.tcpForm.tcpPort = res.tcp

    },
    submitForm (tcpForm) {
      // this.$refs[tcpForm].validate(async (valid) => {
      //   if (valid)
      //   {
      //     console.log(this.tcpForm)
      //     const params = {
      //       ip: this.tcpForm.ip,
      //       text: this.tcpForm.texpPort,
      //       tcp: this.tcpForm.tcpPort,
      //       pathUrl: this.pathUrl
      //     }
      //     const res = await setTcpInfo(params)
      //     this.$message.success('保存成功')
      //     console.log(res)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-road {
  overflow: hidden;

  .form-wrap {
    background: #0a2354;

    .submit_btn {
      width: 140px;
      height: 40px;
    }
  }
}
</style>

<style lang="scss">
.tcpForm {
  .el-form-item {
    .el-form-item__label {
      color: #fff !important;
    }
  }
}
</style>