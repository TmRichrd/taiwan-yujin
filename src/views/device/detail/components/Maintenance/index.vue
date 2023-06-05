<template>
  <div>
    <el-card style="margin-bottom:20px">
      <div slot="header" class="clearfix">
        <span>設備維護</span>
      </div>
      <el-row>
        <el-col :span="13">
          <avue-form :option="option" ref="form" v-model="form" @reset-change="resetChange" @submit="submit">
          </avue-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>設備維護記錄表</span>
      </div>
      <avue-crud :option="crudOption" :data="data" :table-loading="loading" v-model="curdForm" :page.sync="page"
        @on-load="onLoad">
        <template slot="menu" slot-scope="{row}">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)">編 輯</el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)">刪 除</el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>

<script>
// import { addLoadLog, delLoadLog, getLoadLogDet, getLoadLogList, editLoadLogList } from '@/api'
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
          {
            label: "上傳圖片",
            prop: "OperateImage",
            type: "upload",
            span: 13,
            action: "/api/Upload/UploadFile",
            rules: [{
              required: true,
              message: "上傳圖片不能爲空",
              trigger: "change"
            }],
            propsHttp: {
              res: 'data',
              url: 'url'
            },
            props: {
              type: 'image',
              thumb: 'url'
            },
            tip: "只能上传图片文件，且不超过10M",
            accept: "image/*",
            fileType: 'img',
            dataType: "object",
            listType: "picture-card",

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
      // this.loading = true
      // try
      // {
      //   const params = {
      //     LuduanId: this.$route.query.id,
      //     PageSize: page.pageSize,
      //     PageIndex: page.currentPage
      //   }
      //   const res = await getLoadLogList(params)
      //   console.log(res)
      //   this.data = res.list || []
      //   this.page.total = res.total
      // } catch (error)
      // {

      // } finally
      // {
      //   this.loading = false
      // }
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