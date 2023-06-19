<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>霧區閃光黃燈</span>
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
                     icon="el-icon-info"
                     @click="handleDetail(row)"
                     size="small">詳 情</el-button>
          <el-button type="text"
                     icon="el-icon-download"
                     size="small">匯 出</el-button>
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
      data: [
        {

        }
      ],
      option: {
        border: false,
        index: false,
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        searchSpan: 6,
        searchIndex: 3,
        searchIcon: true,
        columnBtn: false,
        searchMenuSpan: 6,
        searchGutter: 40,
        searchMenuPosition: 'left',
        menuWidth: 300,
        column: [
          {
            label: "設備編號",
            prop: "equipment_number",
            display: false,
            search: true,
          },
          {
            label: "連線狀態",
            prop: "status",
            dicData: [{
              label: "斷線",
              value: 0
            },
            {
              label: "連線",
              value: 1
            }],
            display: false
          },
          {
            label: "運作狀態",
            prop: "yz_status",
            display: false,
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
            display: false,
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
            display: false,
          },
          {
            label: "工作模式",
            prop: "model",
            display: false
          },
          {
            label: "網路位址",
            prop: "ip",
            hide: true,
          },
          {
            label: "系統類別",
            prop: "system_type",
            type: "select",
            hide: true,
            width: 120,
            dicData: [{
              label: "霧區閃光黃燈",
              value: 1
            }]
          },
          {
            label: "路段特性",
            prop: "road_section_characteristics",
            type: "select",
            hide: true,
            width: 80,
            dicData: [{
              label: "主線",
              value: 1
            }]
          },
          {
            label: "設備位置",
            prop: "equipment_location",
            hide: true,
            width: 220,
          },
          {
            label: "設備類別",
            prop: "equipment_type",
            type: "select",
            hide: true,
            width: 100,
            dicData: [{
              label: "閃光黃燈(FI)",
              value: 1
            }]
          },
          {
            label: "國道路線",
            hide: true,
            prop: "national_road",
          },
          {
            label: "安裝方向",
            type: "select",
            hide: true,
            prop: "installation_direction",
            dicData: [{
              label: "北上(N)",
              value: 1
            },
            {
              label: "南下(S)",
              value: 0
            }]
          },
          {
            label: "主線里程",
            prop: "main_line_mileage",
            hide: true,
            width: 220,
          },
          {
            label: "安裝位置",
            type: "select",
            hide: true,
            prop: "installation_position",
            dicData: [{
              label: "外側(O)",
              value: 1
            },
            {
              label: "內側(I)",
              value: 0
            }]
          },
          {
            label: "管轄單位",
            type: "select",
            hide: true,
            prop: "jurisdictional_unit",
            dicData: [{
              label: "苗栗工務段",
              value: 1
            },
            {
              label: "大甲工務段",
              value: 0
            }]
          },
          {
            label: "護欄形式",
            type: "select",
            hide: true,
            prop: "guardrail_type",
            dicData: [{
              label: "紐澤西護欄",
              value: 0
            },
            {
              label: "紐澤西護欄+鋼管",
              value: 1
            },
            {
              label: "紐澤西護欄+防眩板",
              value: 2
            },
            {
              label: "RC紐澤西護欄",
              value: 3
            },
            {
              label: "RC紐澤西護欄+鋼管",
              value: 4
            },
            {
              label: "鋼板護欄",
              value: 5
            },
            ]
          },
          {
            label: "GPS座標",
            hide: true,
            prop: "gps_coordinate",
            width: 220,
          },
          {
            label: "閃爍頻率",
            type: "select",
            hide: true,
            prop: "flicker_frequency",
            width: 100,
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
            label: "亮度選擇",
            type: "select",
            prop: "brightness",
            dicData: [
              {
                label: "10%",
                value: 1
              },
              {
                label: "20%",
                value: 2
              },
              {
                label: "40%",
                value: 3
              },
              {
                label: "60%",
                value: 4
              },
              {
                label: "80%",
                value: 5
              },
              {
                label: "100%",
                value: 6
              },
            ]
          },
          {
            label: "回傳周期",
            hide: true,
            prop: "return_period",
            width: 120,
          },
        ]
      },
    };
  },
  methods: {
    handleDetail (row) {
      this.$router.push("/devices/lightDetail?id=" + row.id + "&yjzz_no=" + row.equipment_number)
    },
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type))
      {

      }
      done()
    },
    onLoad (page, params = {}) {
      this.loading = true;
      const lightmodel = [10, 20, 40, 60, 80, 100]
      const time = [30, 60, 90, 120]
      const model = ['每分鐘閃爍']
      const data = Mock.mock({
        code: 0,
        msg: "success",
        data: {
          total: 100,
          [`list|${page.pageSize}`]: [
            {
              "id|+1": 1,
              equipment_number: "FI-N1-S-140.150-O",
              ip: "@ip",
              status: "@integer(0, 1)",
              yz_status: "@integer(0, 1)",
              Solar_panel_power_generation_status: "@integer(0, 1)",
              Battery: "@integer(70, 100)%",
              model: `@pick(${time})次/@pick(${model})`,
              system_type: "霧區閃光黃燈",
              road_section_characteristics: "主線",
              equipment_location: `@pick(['銅鑼交流道-泰安服務區','中港交流道-龍井交流道'])`,
              equipment_type: "閃光黃燈(FI)",
              national_road: `@pick(['國道1號','國道2號'])`,
              installation_direction: `@pick(['北上','南下'])`,
              main_line_mileage: "詳設備編號文件(140K+150)",
              installation_position: "@pick(['外側','內側'])",
              jurisdictional_unit: "@pick(['苗栗工務段','大甲工務段'])",
              guardrail_type: "鋼板護欄",
              gps_coordinate: "北緯(24.172950)，東經(120.62998)",
              flicker_frequency: "120次/每分鐘",
              brightness: `@pick(${lightmodel})%`,
              return_period: "5分鐘至24小時",
            }
          ]
        }
      })
      this.data = data.data.list;
      this.page.total = data.data.total;
      this.loading = false;

    }
  },
};
</script>

<style lang="scss" scoped></style>
