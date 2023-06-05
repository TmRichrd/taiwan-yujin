<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>路段列表</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
        <template slot="yellowLightForm">
          <avue-crud :option="option1" :data="data1"></avue-crud>
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
      data1: [],
      option1: {
        rowKey: "cid",
        reserveSelection: true,
        selection: true,
        border: false,
        size: "medium",
        index: false,
        headerAlign: 'center',
        align: 'center',
        addBtn: false,
        searchIndex: 1,
        searchIcon: true,
        editBtn: false,
        header: false,
        delBtn: false,
        menuSlot: true,
        column: [
          {
            width: 130,
            label: 'ID',
            prop: 'cid',
          },
          {
            label: "装置名称",
            prop: "set_name",
          },
          {
            label: '装置编号',
            prop: 'jizhongqi',
            slot: true,
          },
          {
            label: '状态',
            prop: 'on_status',
            type: "select",
            dicData: [
              {
                label: "在线",
                value: 1
              },
              {
                label: "离线",
                value: 0
              }
            ]
          },
        ]
      },
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
        editBtnText: "編 輯",
        delBtnText: "刪 除",
        column: [
          {
            label: "ID",
            display: false,
            prop: "id",
          },
          {
            label: "路段名",
            prop: "name",
            span: 24,
            search: true,
            rules: [{ required: true, message: "請輸入用戶名" }]
          },
          {
            label: "路段描述",
            prop: "desc",
            type: "textarea",
            span: 24,
          },
          {
            label: "路段里程",
            prop: "licheng",
            type: "number",
            rules: [{ required: true, message: "請輸入路段里程" }],
            span: 24,
          },
          {
            label: "路段分組",
            hide: true,
            display: false,
            span: 24,
            search: true,
            type: "select"
          },
          {
            label: '路段區域',
            prop: 'area',
            type: "cascader",
            props: {
              label: 'name',
              value: 'code'
            },
            span: 24,
            lazy: true,
            lazyLoad (node, resolve) {
              let stop_level = 2;
              let level = node.level;
              let data = node.data || {}
              let code = data.code;
              let list = [];
              let callback = () => {
                resolve((list || []).map(ele => {
                  return Object.assign(ele, {
                    leaf: level >= stop_level
                  })
                }));
              }
              if (level == 0)
              {
                axios.get(`${baseUrl}/getProvince`).then(res => {
                  list = res.data;
                  callback()
                })
              } else if (level == 1)
              {
                axios.get(`${baseUrl}/getCity/${code}`).then(res => {
                  list = res.data;
                  callback()
                })
              } else if (level == 2)
              {
                axios.get(`${baseUrl}/getArea/${code}`).then(res => {
                  list = res.data;
                  callback()
                })
              } else
              {
                callback()
              }
            }
          },
          {
            label: "管轄單位",
            prop: "danwei",
            span: 24,
          },
          {
            display: false,
            label: "創建日期",
            prop: "time",
          },
          {
            label: "霧區閃光黃燈",
            prop: "yellowLight",
            span: 24,
            hide: true,
            formSlot: true
          }
        ],
      },
    };
  },
  methods: {
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
            desc: "@cparagraph(1)",
            area: "@county",
            time: "@datetime",
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
