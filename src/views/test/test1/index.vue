<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>路段列表</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
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
        dialogWidth: "40%",
        labelWidth: 140,
        searchSpan: 6,
        searchMenuSpan: 8,
        searchGutter: 40,
        searchMenuPosition: "left",
        column: [
          {
            label: "ID",
            display: false,
            prop: "id",
          },
          {
            label: "路段名",
            prop: "name",
            span: 18,
            search: true,
            rules: [{ required: true, message: "請輸入用戶名" }]
          },
          {
            label: "路段描述",
            prop: "desc",
            type: "textarea",
            span: 18
          },
          {
            label: "路段里程",
            prop: "licheng",
            type: "number",
            rules: [{ required: true, message: "請輸入路段里程" }],
            span: 18
          },
          {
            label: "路段分組",
            hide: true,
            display: false,
            span: 18,
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
            span: 18,
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
            span: 18
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
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type))
      {
      }
      done();
    },
    onLoad (page, params = {}) {
      const arr = ['S219 华祁线 k25-740', 'S219 华祁线 k22-150左', 'S219 华祁线 k2-0000', 'S219 华祁线 k9-100', 'G320 沪瑞线 k906-560', 'G320 沪瑞线 k903-760']
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
