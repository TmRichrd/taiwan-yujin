<template>
  <div class="app-container">
    <div class="road-detail">
      <el-tabs type="card"
               v-model="activeName"
               class="box-nav">
        <el-tab-pane label="基本訊息"
                     name="1">
          <BasicInfo v-if="activeName === '1'" />
        </el-tab-pane>
        <el-tab-pane label="回報資料"
                     name="2">
          <Returns v-if="activeName === '2'" />
        </el-tab-pane>
        <el-tab-pane label="設備維護"
                     name="3">
          <Maintenance v-if="activeName === '3'" />
        </el-tab-pane>
      </el-tabs>
      <div class="back">
        <div class="back-btn"
             @click="handleGoBack">
          <i class="el-icon-arrow-left"></i>返回
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BasicInfo from "./components/BasicInfo/index.vue";
import Returns from "./components/Returns/index.vue";
import Maintenance from "./components/Maintenance/index.vue";
export default {
  components: {
    BasicInfo,
    Returns,
    Maintenance
  },
  data () {
    return {
      activeName: '1'
    }
  },
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    }
  },
}
</script>
<style lang="scss" scoped>
.road-detail {
  position: relative;

  .back {
    position: absolute;
    top: 0;
    right: 0;
    width: 96px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      margin-right: 4px;
      font-size: 16px;
    }

    .back-btn {
      width: 100%;
      height: 100%;
      background-color: #177ddc !important;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>