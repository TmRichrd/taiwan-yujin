<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>設備狀態</span>
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
        <template slot="menuLeft">
          <el-button type="primary"
                     icon="el-icon-download"
                     size="small">導 出</el-button>
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
        index: false,
        size: "medium",
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        dialogWidth: "40%",
        labelWidth: 140,
        searchSpan: 6,
        searchIndex: 3,
        searchIcon: true,
        searchMenuSpan: 6,
        searchGutter: 40,
        searchMenuPosition: 'left',
        editBtn: false,
        addBtn: false,
        columnBtn: false,
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
            label: "設備編號",
            search: true,
            prop: "device_id",
          },
          {
            label: "連線狀態",
            type: "select",
            prop: "status",
            search: true,
            dicData: [{
              label: "斷線",
              value: 0
            },
            {
              label: "連線",
              value: 1
            }],
          },
          {
            label: "運作狀態",
            search: true,
            type: "select",
            prop: "yz_status",
            dicData: [{
              label: "異常",
              value: 0
            },
            {
              label: "正常",
              value: 1
            }],
          },
          {
            label: "太陽能板發電狀態",
            search: true,
            prop: "Solar_panel_power_generation_status",
            type: "select",
            dicData: [{
              label: "異常",
              value: 0
            },
            {
              label: "正常",
              value: 1
            }],
          },
          {
            label: "電池電量",
            search: true,
            prop: "Battery",
          },
          {
            label: "工作模式",
            search: true,
            type: "select",
            prop: "model",
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
      const time = [30, 60, 90, 120]
      const model = ['每分鐘閃爍']
      setTimeout(() => {
        this.loading = false;
        this.data = Mock.mock({
          "data|10": [{
            "id|+1": 1,
            "time": "@datetime",
            "device_id": "@string(16)",
            "status|1": [0, 1],
            "yz_status|1": [0, 1],
            "Solar_panel_power_generation_status|1": [0, 1],
            "Battery": "@integer(70, 100)%",
            "model": `@pick(${time})次/@pick(${model})`,
          }],
          page: {
            total: 100,
            pageSize: 10,
            currentPage: 1,
          }
        }).data;
        this.page = page;
        this.page.total = 100;
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped></style>
