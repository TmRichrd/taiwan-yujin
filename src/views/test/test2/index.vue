<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>優先等級</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
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
        addBtn: true,
        column: [
          {
            label: "等級",
            prop: "level",
            type: "number"
          },
          {
            label: "類型",
            type: "select",
            prop: "type",
            dicData: [
              {
                label: "濃霧事件",
                value: 1
              },
              {
                label: "時段控制",
                value: 2
              }
            ]
          },
          {
            label: "閃爍模式",
            type: "select",
            prop: "mode",
          },
          {
            label: "亮度",
            type: "select",
            prop: "ld",
          },
          {
            label: "佔空比",
            type: "select",
            prop: "zkb",
          },
          {
            label: "路段名",
            prop: "name",
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
    onLoad (page, params = {}) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        const zkb = ['']
        this.data = Mock.mock({
          'list|10': [{
            'id|+1': 1,
            'level|1-10': 1,
            'type|1-2': 1,
            'mode': `@pick(['40','60','30'])次/分鐘同閃`,
            'ld': `@pick(['100','80','60','40','20'])%`,
            'zkb': '閃亮/熄滅比',
            'name': '路段' + '@integer(1, 10)',
          }],
        }).list
        this.page.total = 100;
      }, 300);
    }
  },
};
</script>

<style lang="scss" scoped></style>
