<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>權限管理</span>
      </div>
      <avue-crud :option="option"
                 :page.sync="page"
                 v-model="form"
                 :data="data"
                 :before-open="beforeOpen"
                 @on-load="onLoad"
                 :table-loading="loading">
        <template slot="menu">
          <el-button type="text"
                     icon="el-icon-lock"
                     @click="dialog = true">權限設置</el-button>
        </template>
      </avue-crud>
    </el-card>
    <el-dialog :visible.sync="dialog"
               width="640px"
               title="修改權限">
      <div class="dialog-content role-list">
        <div style="padding:20px 0">
          <el-tree ref="tree"
                   :props="defaultProps"
                   :data="AuthList"
                   show-checkbox
                   node-key="url" />
        </div>
        <div slot="footer"
             class="dialog-footer">
          <div class="dialog-btn-wrap">
            <el-button type="primary"
                       class="btn"
                       @click="dialog = false">確 定</el-button>
            <el-button class="btn transparent-btn"
                       @click="dialog = false">取 消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Mock from "mockjs"
import { constantRoutes } from "@/router"
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: function (data) {
          return data.meta.title
        }
        // disabled: "hasChild",  //还可以使用disabled控制节点是否能被选择
      },
      AuthList: [],
      dialog: false,
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
        addBtnText: "新增權限",
        editBtnText: "編輯權限",
        delBtnText: "刪除權限",

        column: [{
          label: 'ID',
          prop: 'id',
          display: false,
        },
        {
          label: '權限名稱',
          prop: 'name',
          rules: [{
            required: true,
            message: "請輸入權限名稱",
            trigger: "blur"
          }],
          span: 12,
          offset: 4
        },
        {
          label: '權限說明',
          prop: 'remark',
          rules: [{
            required: true,
            message: "請輸入權限說明",
            trigger: "blur"
          }],
          span: 12,
          offset: 4
        },
        {
          label: '啟用狀態',
          prop: 'status',
          type: "radio",
          span: 12,
          offset: 4,
          value: 1,
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
        ]
      },
    };
  },
  mounted () {
    console.log('====================================');
    console.log(constantRoutes);
    console.log('====================================');
    this.AuthList = constantRoutes
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
            'remark': '',
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

<style lang="scss">
.role-list {
  .el-tree {
    color: #fff !important;
    background: none !important;
  }

  .el-tree-node__label {
    margin-left: 6px;
  }

  .el-tree-node__content {
    background: none !important;
  }

  .el-tree-node__content:hover {
    background: #177ddc !important;
  }

  .is-focusable {
    background: none !important;
  }

  .is-current.is-focusable > .el-tree-node__content {
    background: #177ddc !important;
  }
}
</style>
