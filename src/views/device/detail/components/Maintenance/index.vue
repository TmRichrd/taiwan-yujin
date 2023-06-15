<template>
  <div>
    <el-card style="margin-bottom:20px">
      <div slot="header"
           class="clearfix">
        <span>設備維護</span>
      </div>
      <el-row>
        <el-col :span="13">
          <avue-form :option="option"
                     ref="form"
                     v-model="form"
                     @reset-change="resetChange"
                     @submit="submit">
          </avue-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>路段日誌報表</span>
      </div>
      <avue-crud :option="crudOption"
                 :data="data"
                 :table-loading="loading"
                 v-model="curdForm"
                 :page.sync="page"
                 @on-load="onLoad">
        <template slot="menu"
                  slot-scope="{row}">
          <el-button type="text"
                     icon="el-icon-edit"
                     @click="handleEdit(row)">編 輯</el-button>
          <el-button type="text"
                     icon="el-icon-delete"
                     @click="handleDelete(row)">刪 除</el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>

<script>
// import { addLoadLog, delLoadLog, getLoadLogDet, getLoadLogList, editLoadLogList } from '@/api'
import Mock from 'mockjs'
export default {
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40
      },
      loading: false,
      curdForm: {},
      data: [
        {

        }
      ],
      form: {},
      crudOption: {
        border: false,
        index: false,
        size: 'medium',
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        dialogWidth: "40%",
        labelWidth: 140,
        header: false,
        editBtn: false,
        delBtn: false,
        column: [
          {
            label: "Id",
            prop: "Id"
          },
          {
            label: "日誌類型",
            prop: "OperateType",
          },
          {
            label: "時間",
            prop: "OperateDate"
          },
          {
            label: "内容",
            prop: "OperateContent"
          },
          {
            label: "創建日期",
            prop: "CreateDate"
          }
        ]
      },
      option: {
        span: 8,
        size: "large",
        labelWidth: 110,
        menuPosition: "right",
        submitText: "保 存",
        emptyText: '取 消',
        column: [
          {
            label: "日誌類型",
            prop: "OperateType",
            span: 13,
            type: "select",
            rules: [{
              required: true,
              message: "日誌類型不能爲空",
              trigger: "change"
            }],
            dicData: [
              {
                label: "故障排除",
                value: 1
              },
              {
                label: "維護",
                value: 2
              },
              {
                label: "修復",
                value: 3
              },
            ]
          },
          {
            label: "時間",
            type: "datetime",
            prop: "OperateDate",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            format: "yyyy-MM-dd HH:mm:ss",
            span: 13,
            rules: [{
              required: true,
              message: "時間不能爲空",
              trigger: "change"
            }]
          },
          {
            label: "内容",
            prop: "OperateContent",
            type: "textarea",
            span: 13,
            rules: [{
              required: true,
              message: "内容不能爲空",
              trigger: "change"
            }]
          },
        ]
      },
    }
  },
  methods: {
    resetChange () {
      // this.form = {
      //   OperateDate: '',
      //   OperateContent: ''
      // }
      // this.form.Id = undefined
    },
    handleEdit (row) {
      // this.form = {
      //   OperateDate: row.OperateDate,
      //   OperateContent: row.OperateContent,
      //   Id: row.Id
      // }
    },
    async handleDelete (row) {
      // this.$confirm('是否确定删除该日志?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   const res = await delLoadLog({ Id: row.Id })
      //   this.onLoad(this.page)
      // })
    },
    async onLoad (page) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.data = Mock.mock({
          'list|10': [{
            'Id|+1': 1,
            'OperateType': `@pick(['故障排除', '維護', '修復'])`,
            'CreateDate': '@datetime',
            'OperateDate': '@datetime',
            'OperateContent': '',
          }],
        }).list
      }, 300)
      this.page.total = 100
    },
    async submit (form, done) {
      // const model = {
      //   luduanId: this.$route.query.id,
      //   ...form
      // }
      // if (model.Id)
      // {
      //   editLoadLogList(model)
      // } else
      // {
      //   addLoadLog(model)
      // }
      // this.$message.success('保存成功')
      // this.resetChange()
      // this.$refs.form.resetForm()
      // this.onLoad(this.page)
      done()
    }
  },
}
</script>

<style lang="scss" scoped></style>