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
        addBtn:false,
        editBtn:false,
        column: [
          {
            label: "路段組編號",
            prop: "bianhao",
            width: 180,
          },
          {
            label: "管轄單位",
            prop: "danwei"
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
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.data = Mock.mock({
          "list|10": [{
            "bianhao|+1": 1,
            "danwei": '單位' + "@integer(1, 10)"
          }],
          total: 30
        }).list
      }, 500)
    }
  },
};
</script>

<style lang="scss" scoped></style>
