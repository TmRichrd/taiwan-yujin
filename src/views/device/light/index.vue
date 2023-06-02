<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>霧區閃光黃燈</span>
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
        column: [
          {
            label: "ID",
            prop: "id",
            search: true,
          },
          {
            label: "狀態",
            search: true,
            prop: "status"
          },
          {
            label: "設備方向",
            prop: "Equipment_direction",
            search: true,
          },
          {
            label: "路段特性",
            prop: "Road_section_characteristics"
          },
          {
            label: "設備位置",
            search: true,
            prop: "Equipment_location"
          },
          {
            label: "設備編碼",
            search: true,
            prop: "Equipment_coding"
          },
          {
            label: "主綫里程",
            prop: "Main_line_mileage"
          },
          {
            label: "安裝位置",
            prop: "Installation_position"
          },
          {
            label: "管轄單位",
            search: true,
            prop: "Jurisdictional_unit"
          },
          {
            label: "護欄型式",
            search: true,
            prop: "Guardrail_type"
          },
          {
            label: "蓄電池",
            prop: "Battery"
          },
          {
            label: "太陽能板發電狀態",
            prop: "Solar_panel_power_generation_status"
          },
          {
            label: "回報周期",
            prop: "Return_period"
          },
          {
            label: "閃爍頻率",
            prop: "Flicker_frequency"
          },
          {
            label: "亮度",
            prop: "light"
          },
          {
            label: "運作狀態",
            prop: "yz_status"
          },
          {
            label: "維修記錄",
            prop: "record"
          },
          {
            label: "創建時間",
            prop: "datetime"
          },
          {
            label: "最後一次濃霧時間",
            prop: "last_datetime"
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
      //   this.loading = true;
      //   const data = Mock.mock({
      //     code: 0,
      //     msg: "success",
      //     data: {
      //       total: 100,
      //       [`list|${page.pageSize}`]: [
      //         {
      //           id: "@increment",
      //           name: "@cname",
      //           desc: "@cparagraph(1, 3)",
      //           datetime: "@datetime",
      //           last_datetime: "@datetime",
      //           status: "@integer(0, 1)",
      //           Equipment_direction: "@integer(0, 1)",
      //           Road_section_characteristics: "@integer(0, 1)",
      //           Equipment_location: "@integer(0, 1)",
      //           Equipment_coding: "@integer(0, 1)",
      //           Main_line_mileage: "@integer(0, 1)",
      //           Installation_position: "@integer(0, 1)",
      //           Jurisdictional_unit: "@integer(0, 1)",
      //           Guardrail_type: "@integer(0, 1)",
      //           Battery: "@integer(0, 1)",
      //           Solar_panel_power_generation_status: "@integer(0, 1)",
      //           Return_period: "@integer(0, 1)",
      //           Flicker_frequency: "@integer(0, 1)",
      //           light: "@integer(0, 1)",
      //           yz_status: "@integer(0, 1)",
      //           record: "@integer(0, 1)",
      //         }
      //       ]
      //     }
      //   });
      //   console.log('====================================');
      //   console.log(data);
      //   console.log('====================================');
      //   this.data = data.data.list;
      //   this.page.total = data.data.total;
      //   this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped></style>
