<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>優先等級</span>
      </div>
      <avue-crud :option="option"
                 :page.sync="page"
                 v-model="form"
                 :data="data"
                 :before-open="beforeOpen"
                 @on-load="onLoad"
                 :table-loading="loading">
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

        delBtn: false,
        header: false,
        column: [
          {
            label: "等級",
            prop: "level",
            type: "number",
            span: 16,
          },
          {
            label: "能見度",
            type: "select",
            span: 16,
            prop: "type",
            dicData: [
              {
                label: ">300",
                value: 0
              },
              {
                label: "200-300",
                value: 1
              },
              {
                label: "100-200",
                value: 2
              },
              {
                label: "50-100",
                value: 3
              },
              {
                label: "<50",
                value: 4
              },
            ]
          },
          {
            label: "工作模式",
            type: "select",
            span: 16,
            prop: "mode",
            dicData: [
              {
                label: "40次/分鐘同閃",
                value: 0
              },
              {
                label: "60次/分鐘同閃",
                value: 1
              },
              {
                label: "30次/分鐘同閃",
                value: 2
              }
            ]
          },
          {
            label: "亮度選擇",
            type: "select",
            span: 16,
            prop: "ld",
            dicData: [
              {
                label: "100%",
                value: 0
              },
              {
                label: "80%",
                value: 1
              },
              {
                label: "60%",
                value: 2
              },
              {
                label: "40%",
                value: 3
              },
              {
                label: "20%",
                value: 4
              }
            ]
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
    onLoad (page, params = {}) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        const zkb = ['']
        this.data = Mock.mock({
          'list|5': [{
            'id': "@increment(1)",
            'level|+1': 1,
            'type|1-4': 1,
            'mode': `@pick(['40','60','30'])次/分鐘同閃`,
            'ld': `@pick(['100','80','60','40','20'])%`,
            'zkb': '閃亮/熄滅比',
            'name': '路段' + '@integer(1, 10)',
          }],
        }).list
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped></style>
