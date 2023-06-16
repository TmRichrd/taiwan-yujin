<template>
  <div>
    <el-card style="margin-bottom:20px">
      <div slot="header"
           class="clearfix">
        <span>運作模式</span>
      </div>
      <avue-form class="system-form"
                 :option="menuOption"
                 :defaults.sync="defaults"
                 @submit="handleSubmitMenuForm"
                 v-model="form">
        <!-- <template slot="time_control">
          <el-button type="primary"
                     size="medium">設 置</el-button>
        </template> -->
        <template slot="read_param">
          <el-button type="primary"
                     size="medium">一鍵回報</el-button>
        </template>
      </avue-form>
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
      defaults: {},
      form: {},
      data: [
        {

        }
      ],
      menuOption: {
        size: "large",
        labelWidth: 110,
        labelPosition: "top",
        emptyBtn: false,
        submitText: "保 存",
        // submitBtn: false,
        column: [
          {
            label: "工作模式",
            prop: "work_mode",
            type: "select",
            span: 6,
          },
          {
            label: "亮度選擇",
            prop: "light_select",
            span: 6,
            type: "select",
            offset: 7,
            dicData: [
              {
                label: "10%",
                value: 0
              },
              {
                label: "自動控制",
                value: 1
              }
            ]
          },
          {
            label: "時段列表",
            prop: "time_list",
            span: 6,
            type: "select",
          },
          {
            label: "能見度列表",
            prop: "visibility_list",
            span: 6,
            offset: 7,
            type: "select",

          },
          // {
          //   label: "占空比",
          //   prop: "duty_ratio",
          //   type: "select",
          // },
          // {
          //   label: "回報資料",
          //   prop: "read_param",
          //   offset: 3,
          //   type: "select",
          // }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>