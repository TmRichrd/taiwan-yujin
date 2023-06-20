<template>
  <div class="basic-info">
    <el-row :gutter="20">
      <el-col :lg="12">
        <el-card style="margin-bottom: 20px;">
          <div slot="header"
               class="clearfix">
            <span>基本訊息</span>
          </div>
          <avue-form :option="option"
                     @submit="submit"
                     class="system-form"
                     v-model="form">
            <template slot="create_time">
              <div class="basic-info-text">
                {{ form.create_time }}
              </div>
            </template>
            <template slot="Battery">
              <div class="Battery">
                <i class="fa fa-battery-4"></i>
                <span class="Digital">90%</span>
              </div>
            </template>
            <template slot="signal">
              <div class="signal">
                <svg width="20"
                     height="20">
                  <rect x="2"
                        y="16"
                        width="3"
                        height="4"
                        fill="#2ecc71" />
                  <rect x="7"
                        y="12"
                        width="3"
                        height="8"
                        fill="#2ecc71" />
                  <rect x="12"
                        y="8"
                        width="3"
                        height="12"
                        fill="#2ecc71" />
                  <rect x="17"
                        y="4"
                        width="3"
                        height="16"
                        fill="#2ecc71" />
                </svg>
              </div>
            </template>
          </avue-form>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <el-card style="margin-bottom: 20px;">
          <div slot="header"
               class="clearfix">
            <span>運作方案</span>
          </div>
          <avue-form class="system-form"
                     :option="menuOption"
                     @submit="handleSubmitMenuForm"
                     v-model="menuform">
            <template slot="time_control">
              <el-button type="primary"
                         size="medium">設 置</el-button>
            </template>
            <template slot="read_param">
              <el-button type="primary"
                         size="medium">立即回報</el-button>
            </template>
          </avue-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <avue-crud :option="option1"
                     @on-load='onLoad'
                     :data="data1">
            <template slot="time"
                      slot-scope="{row}">
              <span>{{row.time}}</span>
            </template>
          </avue-crud>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from 'mockjs';
export default {
  data () {
    return {
      form: {
        create_time: '2023-06-05 12:00:00',
        Battery: "80"
      },
      data1: [
        {

        }
      ],
      option1: {
        border: false,
        index: false,
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
      option: {
        span: 6,
        labelWidth: 110,
        labelPosition: "top",
        submitText: "保 存",
        emptyBtn: false,
        gutter: 20,
        column: [
          {
            label: "ID",
            disabled: true
          },
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
          {
            label: "設備電量",
            prop: "Battery",
            slot: true,
          },
          {
            label: "設備信號",
            prop: "signal",
            slot: true,
          },
          {
            label: "創建時間",
            prop: "create_time",
          },
          {
            label: "安裝圖片",
            type: "upload",
            prop: "install_img",
            accept: "image/*",
            fileType: 'img',
            dataType: "object",
            propsHttp: {
              res: "data",
              url: "url",
              fileName: "image"
            },
            limit: 9,
            listType: "picture-card",
            fileList: [],
            fileSize: 1024 * 10,
            multiple: true,
            slot: true,
            span: 24,
          },
        ]
        // column: [
        //   {
        //     label: "ID",
        //     disabled: true
        //   },
        //   {
        //     label: "設備名稱",
        //     offset: 2,
        //   },
        //   {
        //     label: "設備位置",
        //     offset: 2,
        //   },
        //   {
        //     label: "設備電量",
        //     prop: "Battery",
        //     slot: true,
        //   },
        //   {
        //     label: "創建時間",
        //     prop: "create_time",
        //     offset: 2,
        //   },
        //   {
        //     label: "安裝圖片",
        //     type: "upload",
        //     prop: "install_img",
        //     accept: "image/*",
        //     fileType: 'img',
        //     dataType: "object",
        //     propsHttp: {
        //       res: "data",
        //       url: "url",
        //       fileName: "image"
        //     },
        //     limit: 9,
        //     listType: "picture-card",
        //     fileList: [],
        //     fileSize: 1024 * 10,
        //     multiple: true,
        //     slot: true,
        //     span: 24,
        //   },
        // ]
      },
      menuform: {},
      menuOption: {
        span: 6,
        labelWidth: 110,
        labelPosition: "top",
        emptyBtn: false,
        submitText: "保 存",
        submitBtn: false,
        column: [
          {
            label: "工作模式",
            prop: "work_mode",
            type: "select",
          },
          {
            label: "亮度選擇",
            prop: "light_select",
            type: "select",
            offset: 3,
          },
          {
            label: "時段控制",
            prop: "time_control",
            offset: 3,
            type: "select",
          },
          {
            label: "工作週期",
            prop: "duty_ratio",
            type: "select",
          },
          {
            label: "回報資料",
            prop: "read_param",
            offset: 3,
            type: "select",
          }
        ]
      }
    }
  },
  methods: {
    handleViewGps () {

    },
    submit (form, done) {
      done()
    },
    handleSubmitMenuForm (form, done) {
      done()
    },
    onLoad () {
      const time = [30, 60, 90, 120]
      const model = ['每分鐘閃爍']
      this.data1 = Mock.mock({
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

<style lang="scss" scoped>
.basic-info-text {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}

.sound-row {
  margin-bottom: 20px;

  p {
    margin-bottom: 0;
    color: #fff;
    text-align: center;
  }
}

.dialog-content {
  width: 100%;
  height: 500px;

  &.hasPos {
    position: relative;
  }

  .save-gps,
  .gps-location {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
  }

  .save-gps {
    left: 10px;
  }

  .gps-location {
    left: 80px;
  }

  .map {
    width: 100%;
    height: 100%;
  }
}

.fixed-row {
  margin-bottom: 20px;

  .el-checkbox {
    color: #fff !important;
  }
}

.current-time {
  color: #fff;
  margin-right: 10px;
}

.system-form {
  height: 650px !important;
}

.inline-input {
  position: absolute;
  z-index: 99;
  top: 10px;
  left: 76px;
  width: 350px;

  ::v-deep.el-input-group__append {
    border: 1px solid #e6a23c !important;
  }
}

.search-btn {
  background: #e6a23c !important;
  color: #fff !important;
  border: none !important;
}

.handle-map {
  position: absolute;
  top: 10px;
  left: 450px;
}

.map-shu {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 32px;
}
.Battery {
  display: flex;
  align-items: center;
  i {
    margin-right: 10px;
  }
  span {
    color: rgb(45, 250, 58);
    flex: 1;
    font-size: 20px;
  }
}
.signal {
  width: 24px;
  height: 24px;
  background-color: #fff;
  padding: 2px;
  margin-top: 6px;
}
</style>