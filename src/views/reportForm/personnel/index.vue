<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>人員登入</span>
      </div>
      <avue-crud :option="option"
                 :page.sync="page"
                 v-model="form"
                 :data="data"
                 :before-open="beforeOpen"
                 @on-load="onLoad"
                 :table-loading="loading"
                 @search-change="searchChange">
        <template slot="time"
                  slot-scope="{row}">
          {{row.time}}
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
      data: [],
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      form: {},
      option: {
        border: false,
        index: false,
        size: "medium",
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        dialogWidth: "40%",
        labelWidth: 140,
        searchSpan: 5,
        searchMenuSpan: 5,
        searchGutter: 40,
        searchMenuPosition: 'left',
        menu: false,
        addBtn: false,
        columnBtn: false,
        column: [
          {
            label: "紀錄時間",
            prop: "time",
            search: true,
            range: true,
            searchRange: true,
            valueFormat: "yyyy-MM-dd",
            type: "daterange",
          },
          {
            label: "登入用戶",
            prop: "user_login",
            search: true,
          },
          {
            label: "電子信箱",
            prop: "user_email",
            search: true,
          },
          {
            label: "登入IP",
            prop: "ip"
          }
        ]
      }
    }
  },
  methods: {
    onLoad () {
      this.loading = true;
      setTimeout(() => {
        this.data = Mock.mock({
          "items|10": [{
            id: "@id",
            time: "@datetime",
            user_login: "@name",
            user_email: "@EMAIL",
            ip: "@ip",
          }],
          total: 100
        }).items;
        this.loading = false;
        this.page.total = 100
      }, 500);
    },
    searchChange (params, done) {
      done()
    }
  },
}
</script>

<style lang="scss" scoped></style>