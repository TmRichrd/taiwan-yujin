<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>路段列表</span>
      </div>
      <avue-crud :option="option"
                 :page.sync="page"
                 v-model="form"
                 :data="data"
                 :before-open="beforeOpen"
                 @on-load="onLoad"
                 :table-loading="loading">
        <template slot="menu"
                  slot-scope="{row}">
          <el-button type="text"
                     size="medium"
                     icon="el-icon-edit"
                     @click="handleDetail(row)">編 輯</el-button>
          <el-button type="text"
                     size="medium"
                     icon="el-icon-delete">刪 除</el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs'
let baseUrl = 'https://cli.avuejs.com/api/area'
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
        headerAlign: "center",
        align: "center",
        labelWidth: 140,
        searchSpan: 6,
        searchMenuSpan: 8,
        searchGutter: 40,
        searchMenuPosition: "left",
        delBtn: false,
        editBtn: false,

        column: [
          {
            label: "路段名稱",
            prop: "name",
            span: 16,
            search: true,
            rules: [{ required: true, message: "請輸入路段名稱" }]
          },
          {
            label: "路段說明",
            prop: "desc",
            type: "textarea",
            span: 16,
          },
          {
            label: "路段分組",
            prop: "danwei",
            hide: true,
            display: false,
            span: 24,
            search: true,
            type: "select"
          },
          {
            label: "霧區閃光黃燈数量",
            prop: "yellowLightNum",
            display: false,
          },
          {
            label: "工作模式",
            prop: "frequency",
            display: false,
            dicData: [
              {
                label: "30次/每分鐘",
                value: 1
              },
              {
                label: "60次/每分鐘",
                value: 2
              },
              {
                label: "90次/每分鐘",
                value: 3
              },
              {
                label: "120次/每分鐘",
                value: 4
              },
            ]
          },
          {
            label: "亮度",
            prop: "brightness",
            display: false,
          },
          {
            display: false,
            label: "創建日期",
            prop: "time",
          },
        ],
      },
    };
  },
  methods: {
    handleDetail (row) {
      this.$router.push('/device/detail?id=' + row.id)
    },
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type))
      {
      }
      done();
    },
    onLoad (page, params = {}) {
      const arr = [
        "N151K + 500~N147K + 700",
        "N124K +000~N121K + 700",
        "S106K + 120~S107K + 600",
        "S121K + 100~S123K + 100",
        "S199K + 375~S204 + 320",
        "S206K + 820~S210K + 175",
        "N112K + 500~N110K + 703",
        "N186K +050~N181K + 300",
        "N214K +000~N212K + 300",
        "N206K + 700~N203K + 300",
      ]
      const data = Mock.mock({
        [`list|${page.pageSize}`]: [
          {
            "id|+1": 1,
            name: `@pick(${arr})`,
            licheng: "@integer(1, 1000)",
            danwei: '單位' + '@integer(1, 10)',
            area: "@county",
            time: "@datetime",
            yellowLightNum: "@integer(1, 100)",
            frequency: "@integer(1, 4)",
            brightness: "@integer(1, 100)%"
          },
        ],
        total: 100,
      })
      this.data = data.list
      this.page.total = data.total
    },
  },
};
</script>

<style lang="scss" scoped></style>
