<template>
  <div class="fog-lamp">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>閃光黃燈</span>
      </div>
      <div class="other-info blue7 bluetab">
        <div class="info-wrap">
          <div class="text-info flex-row">
            <div class="left-info info-item">
              <div class="info-top">
                <p>方向（逆向）：{{ direction_left }}</p>
                <p>設備数量（逆向）：{{ quantity_left }}</p>
                <p>連線（逆向）：{{ wudenglonline }}</p>
                <p>斷線（逆向）：{{ wudengloffline }}</p>
              </div>
              <div v-if="showTabData=='1'"
                   class="tab-wrap el-scrollbar">
                <el-button icon="el-icon-circle-plus-outline"
                           type="primary"
                           style="margin-bottom:20px"
                           size="medium"
                           @click="visible = true">新增</el-button>
                <el-table :data="wudengl"
                          highlight-current-row
                          style="width:100%">
                  <el-table-column prop="light_no"
                                   label="設備編號"
                                   align="center"
                                   width="120" />
                  <el-table-column label="電池電量"
                                   align="center">
                    <template slot-scope="{row}">
                      <div class="elec-wrap">
                        <span>{{row.dianliang}}%</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date"
                                   label="連線狀態"
                                   align="center"
                                   width="120">
                    <template slot-scope="scope">
                      <span v-if="scope.row.State=='1'"
                            class="greenTxt">連線</span>
                      <span v-else
                            class="redTxt">斷線</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="menu"
                                   label="操作"
                                   align="center">
                    <el-button type="text"
                               icon="el-icon-delete">刪除</el-button>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="right-info info-item">
              <div class="info-top">
                <p>方向（順向）：{{ direction_right }}</p>
                <p>設備数量（順向）：{{ quantity_right }}</p>
                <p>連線（順向）：{{ wudengronline }}</p>
                <p>斷線（順向）：{{ wudengroffline }}</p>
              </div>
              <div v-if="showTabData=='1'"
                   class="tab-wrap el-scrollbar">
                <el-button icon="el-icon-circle-plus-outline"
                           type="primary"
                           style="margin-bottom:20px"
                           size="medium">新增</el-button>
                <el-table :data="wudengr"
                          highlight-current-row
                          style="width:100%">
                  <el-table-column prop="light_no"
                                   label="設備編號"
                                   align="center"
                                   width="120" />
                  <el-table-column label="電池電量"
                                   align="center">
                    <template slot-scope="{row}">
                      <div class="elec-wrap">
                        <span>{{row.dianliang}}%</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date"
                                   label="連線狀態"
                                   align="center"
                                   width="120">
                    <template slot-scope="scope">
                      <span v-if="scope.row.State=='1'"
                            class="greenTxt">連線</span>
                      <span v-else
                            class="redTxt">斷線</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="menu"
                                   label="操作"
                                   align="center">
                    <el-button type="text"
                               icon="el-icon-delete">刪除</el-button>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog :visible="visible"
                 close-on-click-modal
                 title="新增設備"
                 @close="visible = false"
                 custom-class="avue-dialog avue-crud__dialog"
                 width="60%">
        <el-transfer :titles="['選擇設備', '已增加']"
                     :button-texts="['刪除', '增加']"
                     filterable
                     ref="transfer"
                     :render-content="renderFunc"
                     v-model="value"
                     :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                  }"></el-transfer>
        <!-- <avue-crud v-model="form"
                   :data='data'
                   :option="option"
                   :page.sync="page"
                   @on-load="onLoad">

        </avue-crud> -->
        <div slot="footer"
             class="avue-dialog__footer avue-dialog__footer--right">
          <el-button type="primary"
                     size="medium"
                     icon="el-icon-circle-plus-outline"
                     @click="visible = false">保存</el-button>
          <el-button type="default"
                     size="medium"
                     icon="el-icon-circle-close"
                     @click="visible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>

import Mock from 'mockjs';

export default {
  name: 'FogLamp',
  data () {
    return {
      value: [],
      loading: false,
      form: {},
      data: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0,
      },
      option: {
        rowKey: "id",
        reserveSelection: true,
        selection: true,
        border: false,
        index: false,
        filterBtn: false,
        headerAlign: 'center',
        align: 'center',
        searchSpan: 6,
        searchIndex: 3,
        searchIcon: true,
        searchMenuSpan: 6,
        searchGutter: 40,
        searchMenuPosition: 'left',
        addBtn: false,
        header: false,
        menu: false,
        column: [
          {
            label: "id",
            prop: "id",
          },
          {
            label: "設備編號",
            prop: "equipment_number",
            display: false,
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

        ]
      },
      eleOpt: {
        '00': 'fa fa-battery-1',
        '01': 'fa fa-battery-2',
        '02': 'fa fa-battery-3',
        '03': 'fa fa-battery-4',
        'f0': 'fa fa-battery-1',
        'f1': 'fa fa-battery-2',
        'f2': 'fa fa-battery-3',
        'f3': 'fa fa-battery-4'
      },
      visible: false,
      enbleEdit: false,
      pathUrl: this.$route.path,
      baseForm: {
        direction_left: '',
        quantity_left: '',
        direction_right: '',
        quantity_right: '',
        jizhongqi: ''
      },
      showTabData: 1,
      direction_left: '145',
      quantity_left: '146',
      direction_right: '168',
      quantity_right: '167',
      wudengl: [
        {
          "id": 66791,
          "jizhongqi": "00ff",
          "light_no": "000000",
          "dianliang": "80",
          "State": "0",
          "create_date": 1673399162,
          "modify_date": null,
          "position": "L"
        },
        {
          "id": 66759,
          "jizhongqi": "00ff",
          "light_no": "000001",
          "dianliang": "95",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66760,
          "jizhongqi": "00ff",
          "light_no": "000002",
          "dianliang": "50",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66761,
          "jizhongqi": "00ff",
          "light_no": "000003",
          "dianliang": "80",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66791,
          "jizhongqi": "00ff",
          "light_no": "000000",
          "dianliang": "59",
          "State": "0",
          "create_date": 1673399162,
          "modify_date": null,
          "position": "L"
        },
        {
          "id": 66759,
          "jizhongqi": "00ff",
          "light_no": "000001",
          "dianliang": "87",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66760,
          "jizhongqi": "00ff",
          "light_no": "000002",
          "dianliang": "65",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66761,
          "jizhongqi": "00ff",
          "light_no": "000003",
          "dianliang": "45",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66791,
          "jizhongqi": "00ff",
          "light_no": "000000",
          "dianliang": "67",
          "State": "0",
          "create_date": 1673399162,
          "modify_date": null,
          "position": "L"
        },
        {
          "id": 66759,
          "jizhongqi": "00ff",
          "light_no": "000001",
          "dianliang": "78",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66760,
          "jizhongqi": "00ff",
          "light_no": "000002",
          "dianliang": "47",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66761,
          "jizhongqi": "00ff",
          "light_no": "000003",
          "dianliang": "98",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66791,
          "jizhongqi": "00ff",
          "light_no": "000000",
          "dianliang": "20",
          "State": "0",
          "create_date": 1673399162,
          "modify_date": null,
          "position": "L"
        },
        {
          "id": 66759,
          "jizhongqi": "00ff",
          "light_no": "000001",
          "dianliang": "46",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66760,
          "jizhongqi": "00ff",
          "light_no": "000002",
          "dianliang": "68",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66761,
          "jizhongqi": "00ff",
          "light_no": "000003",
          "dianliang": "46",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66791,
          "jizhongqi": "00ff",
          "light_no": "000000",
          "dianliang": "86",
          "State": "0",
          "create_date": 1673399162,
          "modify_date": null,
          "position": "L"
        },
        {
          "id": 66759,
          "jizhongqi": "00ff",
          "light_no": "000001",
          "dianliang": "65",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66760,
          "jizhongqi": "00ff",
          "light_no": "000002",
          "dianliang": "89",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66761,
          "jizhongqi": "00ff",
          "light_no": "000003",
          "dianliang": "92",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66791,
          "jizhongqi": "00ff",
          "light_no": "000000",
          "dianliang": "87",
          "State": "0",
          "create_date": 1673399162,
          "modify_date": null,
          "position": "L"
        },
        {
          "id": 66759,
          "jizhongqi": "00ff",
          "light_no": "000001",
          "dianliang": "45",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66760,
          "jizhongqi": "00ff",
          "light_no": "000002",
          "dianliang": "36",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        },
        {
          "id": 66761,
          "jizhongqi": "00ff",
          "light_no": "000003",
          "dianliang": "68",
          "State": "1",
          "create_date": 1673399162,
          "modify_date": 1677032823,
          "position": "L"
        }
      ],
      wudengr: [],
      wudenglonline: '10',
      wudengloffline: '14',
      wudengronline: '56',
      wudengroffline: '25',
      rules: {
        direction_left: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        quantity_left: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /\d/, message: '请输入数字', trigger: 'blur' }
        ],
        direction_right: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        quantity_right: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /\d/, message: '请输入数字', trigger: 'blur' }
        ]
      },
      tableData3: []
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.id != from.meta.id)
      {
        this.initPage()
      }
    }
  },
  mounted () {
    // this.initPage()
  },


  methods: {
    renderFunc (h, option) {
      return <span>{option.key} - {option.label}</span>
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
              'id|+1': 1,
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

    },
    initPage () {
      this.enbleEdit = true
      this.itemId = this.$route.meta.id
      this.baseForm.jizhongqi = this.$route.meta.id
      this.getData()
    },
    async getData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      const res = await getFogLamp(params)
      this.quantity_left = this.baseForm.quantity_left = res.wudeng && res.wudeng.quantity_left
      this.direction_left = this.baseForm.direction_left = res.wudeng && res.wudeng.direction_left.replace('&gt;', '>') || ''
      this.quantity_right = this.baseForm.quantity_right = res.wudeng && res.wudeng.quantity_right
      this.direction_right = this.baseForm.direction_right = res.wudeng && res.wudeng.direction_right.replace('&gt;', '>') || ''
      this.wudengronline = res.wudengronline
      this.wudengroffline = res.wudengroffline
      this.wudenglonline = res.wudenglonline
      this.wudengloffline = res.wudengloffline
      this.wudengl = res.wudengl
      this.wudengr = res.wudengr
      this.showTabData = res.show
      console.log(res)
    },
    submitForm (editForm) {
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            pathUrl: this.pathUrl,
            ...this.baseForm
          }
          const res = await saveFogLamp(params)
          console.log(res)
          this.$message.success('保存成功')
          this.initPage()
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.fog-lamp {
  .greenTxt {
    color: rgb(55, 185, 55);
  }
  .redTxt {
    color: #f14343;
  }
  .inner-form-wrap {
    .baseForm {
      ::v-deep.el-form-item__label {
        color: white !important;
      }
    }
    .submit_btn {
      width: 140px;
    }
  }
  .other-info {
    margin-top: 20px;
    .info-wrap {
      .text-info {
        .info-item {
          padding: 25px 0;
          width: 50%;
          border: 1px solid #274785;
          &:first-child {
            border-right: none;
          }
          .info-top {
            padding: 0 25px;
            color: white;
            p {
              margin: 0;
            }
          }
          .tab-wrap {
            max-height: 400px;
            overflow-y: auto;
            border-top: 1px solid #274785;
            margin-top: 20px;
            padding: 25px 25px 0;
          }
        }
      }
    }
  }
}
.elec-wrap {
  justify-content: center;
  display: flex;
  line-height: 14px;
  .elec-box {
    width: 136px;
    height: 14px;
    background: #fff;
    border-radius: 14px;
    .elec {
      background: #f7b500;
      height: 100%;
      border-radius: 14px;
    }
  }
  .elec-val {
    margin-left: 14px;
  }
}
</style>

