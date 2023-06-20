<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>時段控制</span>
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

        column: [
          {
            label: "起始時間",
            prop: "start_time",
            span: 16,
            type: "time",
            format: "HH:mm",
            dataFormat: "HH:mm"
          },
          {
            label: "結束時間",
            prop: "end_time",
            span: 16,
            type: "time",
            format: "HH:mm",
            dataFormat: "HH:mm"
          },
          {
            label: "工作模式",
            type: "select",
            prop: "mode",
            span: 16,
            dicData: [
              {
                label: "40次/分鐘同閃",
                value: 40
              },
              {
                label: "60次/分鐘同閃",
                value: 60
              },
              {
                label: "30次/分鐘同閃",
                value: 30
              }
            ]
          },
          {
            label: "亮度選擇",
            type: "select",
            prop: "ld",
            span: 16,
            dicData: [
              {
                label: "100%",
                value: 100
              },
              {
                label: "80%",
                value: 80
              },
              {
                label: "60%",
                value: 60
              },
              {
                label: "40%",
                value: 40
              },
              {
                label: "20%",
                value: 20
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
        this.data = Mock.mock({
          "list|10": [
            {
              "id|+1": 1,
              "start_time": "@time('HH:mm')",
              "end_time": "@time('HH:mm')",
              'mode': `@pick(['40','60','30'])次/分鐘同閃`,
              'ld': `@pick(['100','80','60','40','20'])%`,
            }
          ],
          total: 30
        }).list;
        this.page.total = 100
      }, 500);
    }
  },
};
</script>

<style lang="scss" scoped></style>
