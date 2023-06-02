<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>權限管理</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
        <template slot="menu">
          <el-button type="text" icon="el-icon-lock">權限設置</el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>

<script>
import Mock from "mockjs"
export default {
  data () {
    return {
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      form: {},
      data: [],
      option: {
        size: "medium",
        border: false,
        index: false,
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        dialogWidth: "40%",
        menuWidth: 300,
        column: [{
          label: 'ID',
          prop: 'id',
          display: false,
        },
        {
          label: '角色名稱',
          prop: 'name',
          rules: [{
            required: true,
            message: "請輸入角色名稱",
            trigger: "blur"
          }],
          span: 12,
          offset: 4
        },
        {
          label: '角色描述',
          prop: 'remark',
          rules: [{
            required: true,
            message: "請輸入角色描述",
            trigger: "blur"
          }],
          span: 12,
          offset: 4
        },
        {
          label: '狀態',
          prop: 'status',
          type: "radio",
          span: 12,
          offset: 4,
          value: 1,
          dicData: [
            {
              label: "啓用",
              value: 1
            },
            {
              label: "禁用",
              value: 0
            }
          ]
        },
        ]
      },
    };
  },
  methods: {
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type))
      {

      }
      done()
    },
    onLoad (page, params = {}) {
      const arr = ['管理員', '超級管理員', '用戶']
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.data = Mock.mock({
          'list|10': [{
            'id|+1': 1,
            'name': `@pick(${arr})`,
            'remark': '@cword(2,10)',
            'status|1': [0, 1],
          }],
          page: {
            total: 100,
            pageSize: 10,
            currentPage: 1
          }
        }).list
      }, 300)
    }
  },
};
</script>

<style lang="scss" scoped></style>
