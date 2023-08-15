<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>路段日誌</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading" @search-change="searchChange">
        <template slot="time" slot-scope="{row}">
          {{ row.time }}
        </template>
        <template slot="menuLeft">
          <el-button type="primary" icon="el-icon-download" size="small">導 出</el-button>
        </template>
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
            label: "日誌類型",
            search: true,
            prop: "event_type",
            type: "select",
            dicData: [
              {
                label: "故障排除",
                value: 0
              },
              {
                label: "修復",
                value: 1
              },
              {
                label: "維護",
                value: 2
              }
            ]
          },
          {
            label: "内容",
            search: true,
            prop: "content",
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
      this.loading = true;
      const content = ['故障排除', '修復', '維護']
      setTimeout(() => {
        this.loading = false;
        this.data = Mock.mock({
          "data|10": [
            {
              id: "@increment",
              time: "@datetime",
              user_login: "@name",
              user_email: "@EMAIL",
              event_type: "@integer(0, 2)",
              content: `@pick(${content})`,
            }
          ],
          page: {
            total: 100,
            pageSize: 10,
            currentPage: 1
          }
        }).data;
        this.page.total = 100
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped></style>
