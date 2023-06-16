<template>
  <div>
    <el-card style="margin-bottom:20px">
      <div slot="header"
           class="clearfix">
        <span>回報資料</span>
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
      data: [
        {

        }
      ],
      option: {
        border: false,
        index: false,
        size: 'mini',
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
        addBtn: false,
        editBtn: false,
        delBtn: false,
        menu: false,
        header: false,
        column: [
          {
            label: "紀錄時間",
            prop: "time",
            range: true,
            searchRange: true,
            valueFormat: "yyyy-MM-dd",
            type: "daterange",
          },
          {
            label: "連線狀態",
            type: "select",
            prop: "status",
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
            prop: "Battery",
          },
          {
            label: "工作模式",
            type: "select",
            prop: "model",
          }
        ]
      },
    }
  },
  methods: {
    onLoad () {
      const time = [30, 60, 90, 120]
      const model = ['每分鐘閃爍']
      this.data = Mock.mock({
        'list|10': [{
          'time': '@datetime',
          'status|1': [0, 1],
          'yz_status|1': [0, 1],
          'Solar_panel_power_generation_status|1': [0, 1],
          Battery: "@integer(70, 100)%",
          model: `@pick(${time})次/@pick(${model})`,
        }]
      }).list
    }
  },
}
</script>

<style lang="scss" scoped></style>