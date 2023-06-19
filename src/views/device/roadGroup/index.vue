<template>
  <div class="app-container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>路段分組</span>
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
                     icon="el-icon-edit"
                     size="medium"
                     @click="dialogVisible = true">編輯</el-button>
        </template>
        <template slot="menuLeft">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="small"
                     @click="handleAdd">新 增</el-button>
        </template>
      </avue-crud>
    </el-card>
    <el-dialog title="路段分組"
               :visible.sync="dialogVisible"
               width="68%">
      <el-form label-width="100px"
               :model="form1"
               ref="form1"
               :rules="rules">
        <el-row>
          <el-col :span="15"
                  :offset="2">
            <el-form-item label="分組名稱:"
                          prop="name">
              <el-input placeholder="請輸入分組名稱"
                        v-model="form1.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <div class="edit_dev">
                <el-transfer :titles="['選擇路段', '已增加']"
                             :button-texts="['刪除', '增加']"
                             filterable
                             ref="transfer"
                             :render-content="renderFunc"
                             v-model="value"
                             :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                  }"></el-transfer>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   icon="el-icon-circle-close"
                   @click="dialogVisible = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   icon="el-icon-circle-plus-outline"
                   @click="dialogVisible = false">
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
      groupData: [],

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
        columnBtn: false,
        dialogWidth: "40%",
        labelWidth: 140,
        searchSpan: 6,
        searchMenuSpan: 8,
        searchGutter: 40,
        searchMenuPosition: 'left',
        addBtn: false,
        editBtn: false,
        delBtnText: "刪 除",
        column: [
          {
            label: "路段組編號",
            prop: "bianhao",
            width: 180,
          },
          {
            label: "分組名稱",
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
