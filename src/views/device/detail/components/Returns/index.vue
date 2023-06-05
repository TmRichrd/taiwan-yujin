<template>
  <div>
    <el-card style="margin-bottom:20px">
      <div slot="header" class="clearfix">
        <span>回報資料</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
      </avue-crud>
    </el-card>
  </div>
</template>

<script>
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
        delBtn:false,
        menu:false,
        header:false,
        column: [
          {
            label: "ID",
            prop: "id",
          },
          {
            label: "狀態",
            prop: "status"
          },
          {
            label: "設備方向",
            prop: "Equipment_direction",
          },
          {
            label: "路段特性",
            prop: "Road_section_characteristics"
          },
          {
            label: "設備位置",
            prop: "Equipment_location"
          },
          {
            label: "設備編碼",
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
            prop: "Jurisdictional_unit"
          },
          {
            label: "護欄型式",
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
          {
            label:"回報日期",
            prop:"return_date"
          }
        ]
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>