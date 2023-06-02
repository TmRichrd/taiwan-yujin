<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>操作日誌</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
        <template slot="menuLeft">
          <el-button type="primary" size="small" icon="el-icon-download">导 出</el-button>
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
        addBtn: false,
        editBtn:false,
        delBtn:false,
        menu:false,
        column: [
          {
            label: "ID",
            prop: "id"
          },
          {
            label: "用戶名",
            prop: "username"
          },
          {
            label: "操作類型",
            prop: "type"
          },
          {
            label: "操作内容",
            prop: "content"
          },
          {
            label: "日期",
            prop: "date",
            type: "daterange",
            valueFormat: "yyyy-MM-dd",
            range: true,
            searchRange: true,
            search: true,
          },
          {
            label: "ip地址",
            prop: "ip"
          }
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
      const data = Mock.mock({
        "data|10": [
          {
            id: "@increment",
            username: "@cname",
            type: "@cword(3, 5)",
            content: "@cword(3, 5)",
            date: "@datetime",
            ip: "@ip"
          }
        ],
        total: 100
      })
      this.data = data.data
      this.page.total = data.total
    }
  },
};
</script>

<style lang="scss" scoped></style>
