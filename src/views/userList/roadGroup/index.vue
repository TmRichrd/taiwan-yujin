<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>路段列表</span>
      </div>
      <avue-crud :option="option" :page.sync="page" v-model="form" :data="data" :before-open="beforeOpen"
        @on-load="onLoad" :table-loading="loading">
        <template slot="menu" slot-scope="{row}">
          <el-button type="text" icon="el-icon-edit" size="medium" @click="dialogVisible  = true">編輯</el-button>
        </template>
        <template slot="menuLeft">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
        </template>
      </avue-crud>
    </el-card>
    <el-dialog title="路段分組" :visible.sync="dialogVisible" width="60%">
      <el-form label-width="100px" :model="form1" ref="form1" :rules="rules">
        <el-row>
          <el-col :span="13" :offset="4">
            <el-form-item label="分組名稱:" prop="name">
              <el-input placeholder="請輸入分組名稱" v-model="form1.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <div class="edit_dev">
                <el-transfer :titles="['选择路段', '已添加']" :button-texts="['去除', '添加']" filterable ref="transfer"
                  :render-content="renderFunc" v-model="value" :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                  }" ></el-transfer>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" icon="el-icon-circle-close" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = false">
          確 定</el-button>
      </span>
    </el-dialog>
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
      value: [],
      form1: {},
      rules: {
        name: [{ required: true, message: "請輸入分組名稱" }]
      },
      groupData: [
        {
          "id": 32,
          "luduan": "S219 华祁线 k25-740",
          "createdate": "2023-05-12 17:55:45",
          "cat_id": 2,
          "description": "在邹梅附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 31,
          "luduan": "S219 华祁线 k22-150",
          "createdate": "2023-05-12 17:55:14",
          "cat_id": 2,
          "description": "在碧田附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 30,
          "luduan": "S219 华祁线 k2-000",
          "createdate": "2023-05-12 17:54:31",
          "cat_id": 2,
          "description": "八百洞天风景区",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 29,
          "luduan": "S219 华祁线 k9-100",
          "createdate": "2023-05-12 17:52:38",
          "cat_id": 2,
          "description": "615县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 26,
          "luduan": "S218 K233",
          "createdate": "2023-05-12 15:35:12",
          "cat_id": null,
          "description": "中国石化莲塘加油站",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 27,
          "luduan": "G320 沪瑞线 k906-560",
          "createdate": "2023-05-12 17:22:37",
          "cat_id": 2,
          "description": "高安市杨陈段8号在塘头村村委会附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 38,
          "luduan": "G320 沪瑞线 k903-760",
          "createdate": "2023-05-17 14:30:51",
          "cat_id": 2,
          "description": "高安市320国道在江西柱龙实业附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 39,
          "luduan": "G320 沪瑞线 k903-440",
          "createdate": "2023-05-17 14:34:20",
          "cat_id": 2,
          "description": "高安市320国道52号在江西柱龙实业附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 40,
          "luduan": "G320 沪瑞线 k876-200",
          "createdate": "2023-05-17 14:38:47",
          "cat_id": 2,
          "description": "高安市320国道在棚林村综治中心附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 41,
          "luduan": "G320 沪瑞线 k873-315",
          "createdate": "2023-05-17 14:44:44",
          "cat_id": 2,
          "description": "高安市320国道838公桩号在在洲子上村附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 42,
          "luduan": "G320 沪瑞线 k869-290",
          "createdate": "2023-05-17 14:48:06",
          "cat_id": 2,
          "description": "高安市320国道838公桩号在蓝城桃花源附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 43,
          "luduan": "G320 沪瑞线 k868-865",
          "createdate": "2023-05-17 14:49:36",
          "cat_id": 2,
          "description": "高安市320国道838公桩号在草本养生堂附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 44,
          "luduan": "G320 沪瑞线 k866-257",
          "createdate": "2023-05-17 14:50:58",
          "cat_id": 2,
          "description": "高安市320国道838公桩号在大城镇附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 45,
          "luduan": "G320 沪瑞线 k865-263",
          "createdate": "2023-05-17 14:54:54",
          "cat_id": 2,
          "description": "高安市320国道838公桩号在大城智康幼儿园附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 46,
          "luduan": "S307 尚黄线K155+410",
          "createdate": "2023-05-17 15:03:39",
          "cat_id": null,
          "description": "宜丰县 院前村民委员会",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 47,
          "luduan": "S307 尚黄线K145+850",
          "createdate": "2023-05-17 15:08:09",
          "cat_id": null,
          "description": "宜丰县307省道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 48,
          "luduan": "S307 尚黄线K144+000",
          "createdate": "2023-05-17 15:09:27",
          "cat_id": null,
          "description": "宜丰县307省道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 49,
          "luduan": "S307 尚黄线K136+600",
          "createdate": "2023-05-17 15:10:35",
          "cat_id": null,
          "description": "宜丰县574县道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 50,
          "luduan": "S307 尚黄线K120+200",
          "createdate": "2023-05-17 15:12:22",
          "cat_id": null,
          "description": "宜丰县花桥大道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 51,
          "luduan": "S307 尚黄线K92+500",
          "createdate": "2023-05-17 15:15:00",
          "cat_id": null,
          "description": "宜春市宜丰县318省道568县号在兰溪附近",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 52,
          "luduan": "S307 尚黄线K87+300",
          "createdate": "2023-05-17 15:17:03",
          "cat_id": null,
          "description": "高安市318省道64号在口溪村卫生所附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 53,
          "luduan": "S307 尚黄线 k79-200",
          "createdate": "2023-05-17 15:22:30",
          "cat_id": 2,
          "description": "宜春市高安市616县道在长屳里附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 54,
          "luduan": "S307 尚黄线 k76-330",
          "createdate": "2023-05-17 15:26:12",
          "cat_id": 2,
          "description": "宜春市高安市616县道在车塘附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 55,
          "luduan": "G220东深线K1606+500",
          "createdate": "2023-05-17 16:59:21",
          "cat_id": null,
          "description": "宜丰县车上中心小学",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 57,
          "luduan": "G320 沪瑞线 K908-783（待定）",
          "createdate": "2023-05-19 10:19:14",
          "cat_id": null,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 58,
          "luduan": "G320 沪瑞线 k913-389（待定）",
          "createdate": "2023-05-19 10:22:15",
          "cat_id": 2,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 59,
          "luduan": "G320 沪瑞线 k865-263（待定）",
          "createdate": "2023-05-19 10:23:44",
          "cat_id": null,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 60,
          "luduan": "G320 沪瑞线 K908+783（待定）",
          "createdate": "2023-05-19 10:26:36",
          "cat_id": 2,
          "description": "（待定）",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 61,
          "luduan": "S219 华祁线 K15+850（待定）",
          "createdate": "2023-05-19 13:49:27",
          "cat_id": 2,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 62,
          "luduan": "S219 华祁线 K19+200",
          "createdate": "2023-05-19 13:50:26",
          "cat_id": 2,
          "description": "宜春市高安市318省道52号在压上附近",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 63,
          "luduan": "S219 华祁线 K62+900",
          "createdate": "2023-05-19 13:52:08",
          "cat_id": 2,
          "description": "高安市江西国虎食品开发有限公司",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 64,
          "luduan": "S309 抚长线 K128+085",
          "createdate": "2023-05-19 13:55:57",
          "cat_id": 2,
          "description": "高安市309省道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 65,
          "luduan": "S309 抚长线 K133+700",
          "createdate": "2023-05-19 13:57:37",
          "cat_id": 2,
          "description": "高安市新街二中",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 66,
          "luduan": "S309 抚长线 K136+160",
          "createdate": "2023-05-19 14:00:08",
          "cat_id": 2,
          "description": "高安市中国历史文化名村畲山贾村",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 67,
          "luduan": "S309 抚长线 K139+594",
          "createdate": "2023-05-19 14:12:10",
          "cat_id": 2,
          "description": "高安市228省道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 68,
          "luduan": "S309 抚长线 K158+295（待定）",
          "createdate": "2023-05-19 14:13:54",
          "cat_id": 2,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 69,
          "luduan": "S219 华祁线 K5+250（待定）",
          "createdate": "2023-05-19 14:15:37",
          "cat_id": 2,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 70,
          "luduan": "S418 赤汪线 K17+000",
          "createdate": "2023-05-19 14:18:23",
          "cat_id": 2,
          "description": "高安市526县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 71,
          "luduan": "S418 赤汪线 K19+283",
          "createdate": "2023-05-19 14:20:26",
          "cat_id": 2,
          "description": "高安市536县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 72,
          "luduan": "S418 赤汪线 K20+374",
          "createdate": "2023-05-19 14:22:19",
          "cat_id": 2,
          "description": "高安市536县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 73,
          "luduan": "S418 赤汪线 K25+966",
          "createdate": "2023-05-19 14:24:28",
          "cat_id": 2,
          "description": "高安市536县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 74,
          "luduan": "S527 黄上线 K1+754",
          "createdate": "2023-05-19 14:26:43",
          "cat_id": 2,
          "description": "高安市黄灰段",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 75,
          "luduan": "S527 黄上线 K39+800",
          "createdate": "2023-05-19 14:27:40",
          "cat_id": 2,
          "description": "高安市618县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 76,
          "luduan": "S527 黄上线 K36+600",
          "createdate": "2023-05-19 14:28:42",
          "cat_id": 2,
          "description": "高安市618县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 77,
          "luduan": "S527 黄上线 K31+700",
          "createdate": "2023-05-19 14:29:40",
          "cat_id": 2,
          "description": "高安市618县道",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 78,
          "luduan": "S527 黄上线 K10+780",
          "createdate": "2023-05-19 14:32:20",
          "cat_id": 2,
          "description": "高安市高安富霖针织服饰有限公司",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 79,
          "luduan": "S527 黄上线 K8+852",
          "createdate": "2023-05-19 14:33:18",
          "cat_id": 2,
          "description": "高安市黄灰段",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 80,
          "luduan": "S527 黄上线 K2+750",
          "createdate": "2023-05-19 14:35:11",
          "cat_id": 2,
          "description": "高安市湖田村",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 81,
          "luduan": "S527 黄上线 K20+100（待定）",
          "createdate": "2023-05-19 15:19:45",
          "cat_id": 2,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 83,
          "luduan": "S219 华祁线 k7-100",
          "createdate": "2023-05-19 15:52:33",
          "cat_id": 2,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360983"
        },
        {
          "id": 84,
          "luduan": "G320 沪瑞线 K953+800(待定)",
          "createdate": "2023-05-22 08:50:15",
          "cat_id": null,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 85,
          "luduan": "G320 沪瑞线 K961+150",
          "createdate": "2023-05-22 08:53:33",
          "cat_id": null,
          "description": "宜丰县320国道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 86,
          "luduan": "G220 东深线 K1602+820",
          "createdate": "2023-05-22 08:56:57",
          "cat_id": null,
          "description": "宜丰县港口大道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 87,
          "luduan": "G220东深线K1622+320",
          "createdate": "2023-05-22 11:48:35",
          "cat_id": null,
          "description": "宜丰县港口大道",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 88,
          "luduan": "G220 东深线 K99+700（待定）",
          "createdate": "2023-05-22 11:50:10",
          "cat_id": null,
          "description": "待定",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 89,
          "luduan": "G220 东深线 K1628+220",
          "createdate": "2023-05-23 08:58:34",
          "cat_id": null,
          "description": "宜丰县芳溪木材检查站",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        },
        {
          "id": 90,
          "luduan": "G220 东深线 K1597+150",
          "createdate": "2023-05-23 09:00:23",
          "cat_id": null,
          "description": "宜丰县官山林场老年人活动中心",
          "province": "360000",
          "city": "360900",
          "county": "360924"
        }
      ],

      dialogVisible: false,
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
        addBtn: false,
        editBtn: false,
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
    renderFunc (h, option) {
      return <span>{option.key} - {option.label}</span>
    },
    handleAdd () {
      this.dialogVisible = true
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

<style lang="scss">
.el-transfer-panel,
.el-transfer-panel__header {
  text-align: left;
  background: #0a3079 !important;
  color: #fff !important;
}

.el-checkbox__label,
.el-checkbox__label span {
  color: #fff !important;
}

.el-transfer-panel {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

.el-transfer-panel__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
}

.el-transfer__button {
  padding: 7px 12px;
}

.el-transfer__button.is-disabled {
  color: #333;
  background: #999;
  border-color: #999;
}

.el-form-item__label {
  color: #fff;
}
</style>
