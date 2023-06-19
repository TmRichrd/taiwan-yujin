<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>操作事件</span>
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
        size: "medium",
        index: false,
        headerAlign: 'center',
        srcollX: 1500,
        align: 'center',
        addBtn: false,
        searchIndex: 3,
        searchIcon: true,
        editBtn: false,
        menu: false,
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
            label: "紀錄用戶",
            prop: "user_login",
            search: true,
          },
          {
            label: "電子信箱",
            search: true,
            prop: "user_email",
          },
          {
            label: "事件類型",
            search: true,
            prop: "event_type",
            type: "select",
            dicData: [
              {
                label: "閃爍",
                value: 0
              },
              {
                label: "點亮",
                value: 1
              },
              {
                label: "熄滅",
                value: 2
              }
            ]
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
    searchChange (params, done) {
      done()
    },
    onLoad (page, params = {}) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.data = Mock.mock({
          "data|10": [
            {
              "id|+1": 1,
              time: "@datetime",
              user_login: "@name",
              user_email: "@EMAIL",
              event_type: "@integer(0, 2)",
            }
          ],
          page: {
            total: 100,
            pageSize: 10,
            currentPage: 1
          }
        }).data;
        this.page = Mock.mock({
          "data|10": [
            {
              "id|+1": 1,
              time: "@datetime",
              user_login: "@name",
              user_email: "@EMAIL",
              event_type: "@integer(0, 2)",
            }
          ],
          page: {
            total: 100,
            pageSize: 10,
            currentPage: 1
          }
        }).page;
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped></style>
