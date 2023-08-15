<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>資料備份</span>
      </div>
      <el-tabs v-model="activeName" type="card" class="box-nav">
        <el-tab-pane label="備份資料庫" name="1">
          <avue-crud :option="option" @selection-change="selectionChange" :page.sync="page" v-model="form" :data="data"
            :before-open="beforeOpen" @on-load="onLoad" :table-loading="loading">
            <template slot="size" slot-scope="{row}">
              <span>{{ row.size }} kb</span>
            </template>
            <template slot="redundancy" slot-scope="{row}">
              <span>{{ row.redundancy }} kb</span>
            </template>
            <template slot="menuLeft">
              <el-button type="primary" icon="el-icon-folder-opened" size="medium"
                @click="handleBackups">備份資料庫</el-button>
              <el-button type="primary" icon="el-icon-date" @click="showDialog" size="medium">自動備份</el-button>
            </template>
          </avue-crud>
        </el-tab-pane>
        <el-tab-pane label="還原資料庫" name="2">
          <avue-crud :option="option1" :page.sync="page1" v-model="form1" :data="data1" :before-open="beforeOpen1"
            @on-load="onLoad1" :table-loading="loading1">
            <template slot="menu">
              <el-button type="text" icon="el-icon-refresh">還 原</el-button>
              <el-button type="text" icon="el-icon-delete">刪 除</el-button>
            </template>
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs';
export default {
  data () {
    return {
      activeName: "1",
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      selectionList: [],
      form: {},
      data: [],
      option: {
        border: false,
        selection: true,
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
        menu: false,
        columnBtn: false,
        column: [
          {
            label: "錶名",
            prop: "name"
          },
          {
            label: "數據量",
            prop: "count"
          },
          {
            label: "大小",
            prop: "size"
          },
          {
            label: "冗餘",
            prop: "redundancy"
          },
          {
            label: "備註",
            prop: "remark"
          }
        ]
      },
      loading1: false,
      page1: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      form1: {},
      data1: [],
      option1: {
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
        delBtn: false,
        columnBtn: false,
        column: [
          {
            label: "備份名稱",
            prop: "name"
          },
          {
            label: "備份卷數",
            prop: "volume"
          },
          {
            label: "備份壓縮",
            prop: "compress"
          },
          {
            label: "備份大小",
            prop: "size"
          },
          {
            label: "備份時間",
            prop: "time"
          }
        ]
      },
      option2: {
        border: false,
        submitText: "保 存",
        emptyText: "關 閉",
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
        delBtn: false,
        columnBtn: false,
        column: [
          {
            label: "備份時間",
            prop: "name",
            type: "time",
            valueFormat: "HH:mm",
            format: "HH:mm",
            rules: [{
              required: true,
              message: "請選擇備份時間",
              trigger: "blur"
            }],
          },
        ]
      },
    };
  },
  methods: {
    showDialog () {
      this.$DialogForm.show({
        title: "自動備份",
        width: "30%",
        option: this.option2,
        beforeClose: (done) => {
          done()
        },
        callback: (res) => {
          res.done()
        }
      })
    },
    selectionChange (list) {
      console.log("🚀 ~ file: index.vue:159 ~ selectionChange ~ list:", list);
      this.selectionList = list
    },
    handleBackups () {
      if (!this.selectionList.length)
      {
        return this.$message.warning("請選擇要操作的數據")
      }
      return this.$message.success("備份成功")
    },
    beforeOpen (done, type) {
      if (["edit", "view"].includes(type))
      {

      }
      done()
    },
    beforeOpen1 () {
      if (["edit", "view"].includes(type))
      {

      }
      done()
    },
    searchChange (params, done) {
      done()
    },
    onLoad (page, params = {}) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.data = Mock.mock({
          "list|10": [{
            "id|+1": 1,
            "name": "@name",
            "count|1-10000": 1,
            "size|1-10000": 1,
            "redundancy|1-100": 1,
            "remark": "@word"
          }],
          total: 100
        }).list
        this.page = page
        this.page.total = 100
      }, 500)
    },
    onLoad1 (page, params = {}) {
      this.loading1 = true
      setTimeout(() => {
        this.loading1 = false
        this.data1 = Mock.mock({
          "list|10": [{
            "id|+1": 1,
            "name": "@datetime('yyyyMMdd-HHmm')",
            "volume|1-20": 1,
            "compress": "GZ",
            "size|1-10000": 1,
            "time": "@datetime"
          }],
          total: 100
        }).list
        this.page1 = page
        this.page1.total = 100
      }, 500)
    }
  },
};
</script>

<style lang="scss" scoped></style>
