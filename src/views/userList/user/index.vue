<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>路段列表</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading" @search-change="searchChange">
      </avue-crud>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs';
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
        border: false,
        index: false,
        size: 'medium',
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        dialogWidth: "40%",
        labelWidth: 140,
        searchSpan: 6,
        searchMenuSpan: 8,
        searchGutter: 40,
        searchMenuPosition: 'left',
        addBtnText: "新增用戶",
        editBtnText: "編輯用戶",
        delBtnText: "刪除用戶",
        columnBtn: false,
        column: [{
          label: 'ID',
          prop: 'id',
          display: false,
        },
        {
          label: '用戶名',
          prop: 'user_login',
          search: true,
          rules: [{
            required: true,
            message: "請輸入用戶名",
            trigger: "blur"
          },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
          ],
          span: 13,
          searchSpan: 6,
        },
        {
          label: '密碼',
          prop: 'password',
          type: "password",
          hide: true,
          // rules: [{
          //   validator: validatePass,
          //   trigger: "blur"
          // },
          // ],
          span: 13,
          searchSpan: 6,
        },

        {
          label: '電子信箱',
          prop: 'user_email',
          search: true,
          hide: false,
          rules: [
            {
              required: true,
              message: "請輸入電子信箱",
              trigger: "blur"
            },
          ],
          span: 13,
          searchSpan: 6,
        },
        {
          label: '用戶說明',
          prop: 'company_name',
          span: 13,
        },
        {
          label: "啟用狀態",
          prop: "status",
          type: "radio",
          dicData: [
            {
              label: "啟用",
              value: 1
            },
            {
              label: "禁用",
              value: 0
            }
          ]
        },
        {
          label: '所屬設備群組',
          multiple: true,
          type: "select",
          prop: 'cat_ids',
          maxCount: 2,
          rules: [{
            required: true,
            message: "請選擇所屬設備群組",
            trigger: "change"
          }],
          span: 13,
          searchSpan: 6,
          hide: true,
          dicData: [
            {
              label: "設備組1",
              value: 1
            },
            {
              label: "設備組2",
              value: 2
            }
          ],
        },
        {
          label: '權限',
          type: "select",
          multiple: true,
          prop: 'role_ids',
          rules: [{
            required: true,
            message: "請選擇權限",
            trigger: "change"
          }],
          // props: {
          //   label: 'name',
          //   value: 'id'
          // },
          dicData: [
            {
              label: "超級管理員",
              value: 0
            },
            {
              label: "管理員",
              value: 1
            },
            {
              label: "用戶",
              value: 2
            }
          ],
          span: 13,
          searchSpan: 6,
          hide: true
        },
        {
          label: '最後登錄IP',
          prop: 'last_login_ip',
          span: 12,
          offset: 2,
          display: false,
        },
        {
          label: '最後登錄時間',
          prop: 'last_login_time',
          format: "yyyy-MM-dd",
          slot: true,
          span: 12,
          display: false,
          offset: 2,
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
    searchChange (params, done) {
      done()
    },
    onLoad (page, params = {}) {
      const data = Mock.mock({
        'list|10': [{
          'id|+1': 1,
          'user_login': '@name',
          'status': '@integer(0, 1)',
          'password': '@word',
          'last_login_ip': '@ip',
          'last_login_time': '@datetime',
          'user_email': '@email',
          'company_name': '@title',
          'cat_ids|1': [1, 2],
          'role_ids|1': [0, 1, 2],
        }],
        'total': 100
      })
      this.data = data.list
      this.page.total = data.total
    }
  },
};
</script>

<style lang="scss" scoped></style>
