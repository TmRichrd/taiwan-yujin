<template>
  <div class="basic-info">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <avue-form :option="option" @submit="submit" class="system-form" v-model="form">
            <template slot="gps">
              <el-button type="primary" icon="el-icon-view" @click="handleViewGps" size="medium">查 看</el-button>
            </template>
            <template slot="create_time">
              <div class="basic-info-text">
                {{ form.create_time }}
              </div>
            </template>
          </avue-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="margin-bottom: 20px;">
          <div slot="header" class="clearfix">
            <span>運行方案</span>
          </div>
          <avue-form class="system-form" :option="menuOption" @submit="handleSubmitMenuForm" v-model="menuform">
            <template slot="time_control">
              <el-button type="primary" size="medium">設 置</el-button>
            </template>
            <template slot="read_param">
              <el-button type="primary" size="medium">一鍵回報</el-button>
            </template>
          </avue-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <avue-crud :option="option1" :data="data1">
          </avue-crud>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        create_time: '2023-06-05 12:00:00'
      },
      data1: [
        {
          
        }
      ],
      option1: {
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
            label: "創建時間",
            prop: "datetime"
          },
          {
            label: "最後一次濃霧時間",
            prop: "last_datetime"
          },
        ]
      },
      option: {
        span: 8,
        size: "large",
        labelWidth: 110,
        labelPosition: "top",
        submitText: "保 存",
        emptyBtn: false,
        column: [
          {
            label: "地圖定位",
            prop: "gps",
            span: 12,
          },

          {
            label: "創建時間",
            prop: "create_time",
            span: 12,
          },
          {
            label: "安裝圖片",
            type: "upload",
            prop: "install_img",
            // action: "/api/tuopu/yjzz/savefile",
            accept: "image/*",
            // tip: "只能上传图片文件，且不超过10M",
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
          },]
      },
      menuform: {},
      menuOption: {
        span: 6,
        size: "large",
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
            label: "時間段控制",
            prop: "time_control",
            offset: 3,
            type: "select",
          },
          {
            label: "占空比",
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
    }
  },
}
</script>

<style lang="scss" scoped>
.basic-info-text {
  color: #fff;
  font-size: 14px;
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
  height: 310px !important;
  /* height: 520px !important; */
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
</style>