<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>濃霧事件</span>
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
        filterBtn: false,
        headerAlign: 'center',
        size: "medium",
        align: 'center',
        dialogWidth: "40%",
        labelWidth: 140,
        searchSpan: 6,
        searchIndex: 3,
        searchIcon: true,
        searchMenuSpan: 6,
        searchGutter: 40,
        searchMenuPosition: 'left',
        searchLabelWidth: 100,
        editBtn: false,
        addBtn: false,
        menu: false,
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
            label: "事件代碼",
            prop: "event_code",
          },
          {
            label: "濃霧類型",
            prop: "dense_fog_type",
            type: "select",
            dicData: [
              {
                label: "濃霧",
                value: 0
              },
              {
                label: "濃霧聯動",
                value: 1
              },
              {
                label: "豪雨",
                value: 2
              }
            ]
          },
          {
            label: "國道編號",
            prop: "highway_id",
            search: true
          },
          {
            label: "起始公里數",
            prop: "start_km",
          },
          {
            label: "結束公里數",
            prop: "end_km",
          },
          {
            label: "能見度等級",
            prop: "visibility_level",
            search: true,
          },
          {
            label: "發生日期及時間",
            prop: "start_time",
          },
          {
            label: "結束日期及時間",
            prop: "end_time",
          }
        ]
      },
    };
  },
  methods: {
    searchChange (params, done) {
      done()
    },
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type))
      {

      }
      done()
    },
    onLoad (page, params = {}) {
      this.loading = true;
      this.page = page;
      this.form = params;
      setTimeout(() => {
        this.loading = false;
        this.data = Mock.mock({
          "items|10": [{
            "id|+1": 1,
            "time": "@datetime",
            "event_code|1": '@string(10)',
            "dense_fog_type|1": ["0", "1", "2"],
            "highway_id|1": `@pick(['國道1號','國道2號'])`,
            "start_km|1": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "end_km|1": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "visibility_level|1": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "start_time": "@datetime",
            "end_time": "@datetime",
          }],
        }).items;
        this.page.total = 100;
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped></style>
