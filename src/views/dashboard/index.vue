<template>
  <div class="dashboard">
    <div class="top-bg">
      <span v-if="companyName">{{ companyName }}道路预警平台</span>
      <span v-else>霧區閃光黃燈管理平台</span>
      <div class="time">
        <span class="Digital" style="margin-right:20px">{{ newYear }}</span>
        <span class="Digital">{{ newTime }}</span>
      </div>
    </div>
    <div class="data-content">
      <!-- 左 -->
      <div class="box-left">
        <div class="index-box">
          <div class="title">連線狀態</div>
          <div class="con-text">
            <div class="con-left">
              <div class="col">
                <span class="col-label">啟用設備</span>
                <span class="col-num Digital huanbi">{{ pieData.jihuoshu }}</span>
              </div>
              <div class="col">
                <span class="col-label">連線設備</span>
                <span class="col-num Digital huanbi">{{ pieData.onlineshu }}</span>
              </div>
              <div class="col">
                <span class="col-label">離線設備</span>
                <span class="col-num Digital huanbi">{{ pieData.offlineshu }}</span>
              </div>
            </div>
            <div class="con-right">
              <div class="status-pie" id="status-pie"></div>
            </div>
          </div>
        </div>
        <div class="index-box">
          <div class="title">電量統計</div>
          <div class="con-texts">
            <el-row :gutter="20" style="margin-left:20px;">
              <el-col :span="6">
                <span class="green">
                  <img src="@/assets/images/dc3.png" style="width: 64px;" alt="">
                </span>
              </el-col>
              <el-col :span="6">
                <span class="yellow">
                  <img src="@/assets/images/dc2.png" style="width: 64px;" alt="">
                </span>
              </el-col>
              <el-col :span="6">
                <img src="@/assets/images/dc1.png" style="width: 64px;" alt="">
              </el-col>
              <el-col :span="6">
                <img src="@/assets/images/dc0.png" style="width: 64px;" alt="">
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-left:20px;">
              <el-col :span="6">
                <span class="c1">2368</span>
              </el-col>
              <el-col :span="6">
                <span class="c2">80</span>
              </el-col>
              <el-col :span="6">
                <span class="c3">15</span>
              </el-col>
              <el-col :span="6">
                <span class="c4">5</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-left:20px;margin-top:20px">
              <el-col :span="6">
                <span class="c1">≥80%</span>
              </el-col>
              <el-col :span="6">
                <span class="c2">79%~50%</span>
              </el-col>
              <el-col :span="6">
                <span class="c3">49~30%</span>
              </el-col>
              <el-col :span="6">
                <span class="c4">≤29%</span>
              </el-col>
            </el-row>
            <!-- <div class="electricity-count" id="electricity"></div> -->
          </div>
        </div>
        <div class="index-box">
          <div class="title">資料回報</div>
          <div class="cont-texts" style="padding-top:20px;height:100%">
            <dv-scroll-board :config="config1" ref="scrollBoard" v-if="config1.data.length"
              style="width:100%;height:100%" />
          </div>
        </div>

      </div>
      <!-- 地图 -->
      <div class="center-map">
        <div class="map-title">地圖概覽</div>
        <div class="map-wrap four-border">
          <!-- <img src="@/assets/images/map.png"
               class="map"
               alt=""> -->
          <OlMap />
          <!-- <baidu-map class="map" :scroll-wheel-zoom="true" :center="markArr[0]" :zoom="6" @ready="mapReady">
            <template v-for="(item, index) in dotArr">
              <bm-marker v-if="item.gps" :key="index" :position="item.gps" @dblclick="toDotDetail($event, item)"
                @mouseover="showWindowInfo(index)" @mouseout="showWindowInfo">
                <bm-info-window :show="Boolean(infoIndex === index)" :offset="{ width: '0', height: '40' }"
                  :auto-pan="true" style="font-size:14px">
                  <div class="map-info-wrap four-border">
                    <div>{{ item.set_name }}</div>
                    <div>位置：{{ item.location }}</div>
                  </div>
                </bm-info-window>
              </bm-marker>
            </template>
          </baidu-map> -->
        </div>
        <div class="charts_title">事件資訊</div>
        <div class="center-charts">
          <el-row style="height:100%">
            <dv-scroll-board :config="config2" ref="scrollBoard" v-if="config2.data.length"
              style="width:100%;height:100%" />
          </el-row>
        </div>
      </div>
      <div class="box-right">
        <div class="index-box hindex-box">
          <div class="title" style="height:5%">運作狀態</div>
          <div class="con-text">
            <div class="con-left">
              <div class="col">
                <span class="col-label">啟動</span>
                <span class="col-num Digital huanbi">1000</span>
              </div>
              <div class="col">
                <span class="col-label">關閉</span>
                <span class="col-num Digital huanbi">1463</span>
              </div>
              <div class="col">
                <span class="col-label">異常</span>
                <span class="col-num Digital huanbi">68</span>
              </div>
            </div>
            <div class="con-right">
              <div class="redian" id="redian"></div>
            </div>
          </div>
        </div>
        <div class="index-box hindex-box">
          <div class="title">路段數據</div>
          <div class="cont-texts" style="padding-top:20px;height:81.5%">
            <dv-scroll-board :config="config" ref="scrollBoard" v-if="config.data.length"
              style="width:100%;height:100%" />
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <!-- <div class="echart-wrap">
        <div class="echart-item four-border">
          <pie-pic :id="'pie-two'"
                   title="预警情况"
                   :pie-data="pieData" />
        </div>
        <div class="echart-item four-border">
          <pie-pic :id="'pie-two2'"
                   title="在线情况"
                   :pie-data="pieData2" />
        </div>
        <div class="echart-item four-border">
          <bar-pic :bar-data="barData" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
// import { getIndexInfo } from '@/api'
// import BMapJson from '@/config/BMap.json'
import Mock from 'mockjs'
import LinePic from './components/linePic.vue'
import BarPic from './components/barPic.vue'
import PiePic from './components/piePic.vue'
import echarts from 'echarts'
import { hexToDec } from "@/utils/mUtils"
import OlMap from "@/components/OlMap/index.vue";
export default {
  name: 'Dashboard',
  filters: {
    fliterBianhao (val) {
      return hexToDec(val)
    }
  },
  components: {
    LinePic,
    BarPic,
    PiePic,
    OlMap
  },
  data () {
    return {
      config: {
        columnWidth: [370, 120, 250, 250, 120],
        header: ['路段分類', '國道別', '管轄單位', '閃爍頻率', '亮度'],
        data: [],
        align: ['center', 'center', 'center', 'center', 'center']
      },
      config1: {
        columnWidth: [450, 250, 450, 250, 200],
        header: ['時間', '週期設定', '設備編碼', '太陽能板發電', '蓄電池',],
        data: [],
        align: ['center', 'center', 'center', 'center', 'center']
      },
      config2: {
        columnWidth: [],
        header: ['事件類別', '事件詳情', '時間'],
        data: [
          ['設備異常', '設備通訊中斷', '2023/9/10 15:20:10'],
          ['濃霧事件', '小霧事件發佈', '2023/9/10 15:25:10'],
          ['濃霧事件', '中霧事件發佈', '2023/9/10 15:30:10'],
          ['濃霧事件', '大霧事件發佈', '2023/9/10 15:35:10'],
          ['濃霧事件', '大霧事件發佈', '2023/9/10 15:40:10'],
          ['濃霧事件', '大霧事件發佈', '2023/9/10 15:40:10'],
          ['濃霧事件', '大霧事件發佈', '2023/9/10 15:40:10'],
          ['濃霧事件', '大霧事件發佈', '2023/9/10 15:40:10'],
        ],
        align: ['center', 'center', 'center', 'center']
      },
      companyName: '', // 公司名称
      markerPoint: { lng: 116.4, lat: 39.9 },
      markArr: [],
      infoIndex: '',
      dotArr: [],
      lineData: [],
      barData: [],
      pieData: [],
      item4: [{
        "electricity": "80%",
        "color": "绿",
        "shuliang": 0
      },
      {
        "electricity": "50%",
        "color": "黄",
        "shuliang": 0
      },
      {
        "electricity": "20%",
        "color": "红",
        "shuliang": 0
      }],
      pieData2: [
        {
          dayhuanbi: 0,
          dayyujingshu: 0
        },
        {
          weekhuanbi: 0,
          weekyujingshu: 0
        },
        {
          monthhuanbi: 0,
          monthyujingshu: 0
        },
        {
          seasonhuanbi: 0,
          seasonyujingshu: 0
        }
      ],

      cardList: [
        { name: '激活数量', num: 0, key: 'jihuoshu' },
        { name: '在线数量', num: 0, key: 'onlineshu' },
        { name: '当日预警', num: 0, key: 'todayyujing' },
        { name: '累计预警', num: 0, key: 'leijiyujing' },
        { name: '摄像头', num: 0, key: 'camera' },
        { name: '智能机箱', num: 0, key: 'smartbox' }
      ],
      myChart: null,
      redianChart: null,
      electricityChart: null,
      newYear: '',
      newTime: '',
      item1: [],
      item7: {}
    }
  },
  created () {
    setTimeout(() => {
      this.newYear = dayjs(new Date).format('YYYY-MM-DD')
      this.newTime = dayjs(new Date).format('HH:mm:ss')
    }, 0);
    setTimeout(() => {
      setInterval(() => {
        this.newYear = dayjs(new Date).format('YYYY-MM-DD')
        this.newTime = dayjs(new Date).format('HH:mm:ss')
      }, 1000);
    }, 0);
    window.addEventListener('resize', () => {
      this.myChart.resize()
      this.redianChart.resize()
      // this.electricityChart.resize()
    })

  },
  mounted () {
    console.log('====================================');
    console.log(this.$route.path);
    console.log('====================================');
    this.getData()
  },
  methods: {
    initRedianOption () {
      const data = {
        color: ['#67C23A', '#F7507F', '#D73247', '#E6A438'],
        title: {
          top: '0',
          text: this.title,
          textStyle: {
            fontSize: 14,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          icon: 'rect',
          textStyle: {
            color: '#0E9DE0'
          }
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            labelLine: {
              show: false
            },
            stack: '总量',
            radius: [0, '50%'],
            center: ['50%', '60%'],
            label: {
              position: 'inner',
              fontSize: 10,
              formatter: '{d}%'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#F7507F' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3B2442' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: [
              { value: 1000 || 0, name: '啟動' },
              { value: 1463 || 0, name: '關閉' },
              { value: 68 || 0, name: '異常' },
            ]
          }
        ]
      }
      return data
    },
    initEleCtricity () {
      const data = {
        color: ['green', '#E6A438', 'red'],
        title: {
          top: '0',
          text: this.title,
          textStyle: {
            fontSize: 14,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          bottom: 0,
          left: 'center',
          icon: 'rect',
          textStyle: {
            color: '#0E9DE0'
          }
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            labelLine: {
              show: false
            },
            stack: '总量',
            radius: [0, '50%'],
            center: ['50%', '60%'],
            label: {
              position: 'inner',
              fontSize: 10,
              formatter: '{d}%'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#F7507F' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3B2442' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: [
              { value: this.item4[0].shuliang, name: `电量${this.item4[0].electricity}` },
              { value: this.item4[1].shuliang, name: `电量${this.item4[1].electricity}` },
              { value: this.item4[2].shuliang, name: `电量${this.item4[2].electricity}` },
            ]
          }
        ]
      }
      return data
    },
    initOption () {
      const data = {
        color: ['#67C23A', '#F7507F', '#D73247', '#E6A438'],
        title: {
          top: '0',
          text: this.title,
          textStyle: {
            fontSize: 14,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          bottom: 0,
          left: 'center',
          icon: 'rect',
          textStyle: {
            color: '#0E9DE0'
          }
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            labelLine: {
              show: false
            },
            stack: '总量',
            radius: [0, '50%'],
            center: ['50%', '60%'],
            label: {
              position: 'inner',
              fontSize: 10,
              formatter: '{d}%'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#F7507F' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3B2442' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: [
              { value: this.item1[0].onlineshu || 0, name: '連線設備' },
              { value: this.item1[0].offlineshu || 0, name: '離線設備' },
            ]
          }
        ]
      }
      return data
    },
    async getData () {
      // const res = await getIndexInfo({ pathUrl: this.$route.path })
      const arr = [
        "N151K + 500~N147K + 700",
        "N124K +000~N121K + 700",
        "S106K + 120~S107K + 600",
        "S121K + 100~S123K + 100",
        "S199K + 375~S204 + 320",
        "S206K + 820~S210K + 175",
        "N112K + 500~N110K + 703",
        "N186K +050~N181K + 300",
        "N214K +000~N212K + 300",
        "N206K + 700~N203K + 300",
      ]
      const danwei = [
        "苗栗工務段",
        "苗栗工務段",
        "苗栗工務段",
        "苗栗工務段",
        "斗南工務段",
        "斗南工務段",
        "大甲工務段",
        "大甲工務段",
        "南投工務段",
        "南投工務段",
      ]
      const res = Mock.mock({
        'item1': [{
          "jihuoshu": "2468",
          "offlineshu": "68",
          "onlineshu": "2400",
        }],
        "item2": [],
        "item3": [],
        "item4": [],
        "item5|10": [{
          "name": `@pick(${arr})`,
          "yjzz": '國道' + "@integer(0, 3)",
          "number": `@pick(${danwei})`,
          "datetime": `@pick(${['40', '30', '60']})次/分鐘同閃`,
          "liangdu": `@pick(${['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']})%`
        }],
        "item6": [],
      })
      const zhouqi = ['5分鐘', '10分鐘', '30分鐘', '120分鐘']
      const bianma = ['FI-N1-S-140.150-0', 'FI-N1-S-140.150-1', 'FI-N1-S-145.155-0', 'FI-N1-S-176.300-0']
      this.config1.data = Mock.mock({
        'list|10': [
          ["@datetime('yyyy/MM/dd HH:mm:ss')", `@pick(${zhouqi})`, `@pick(${bianma})`, `正常`, `@pick(${['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']})%`]
        ]
      }).list
      this.item7 = Mock.mock({
        "100": "@integer(0, 1000)",
        "66": "@integer(0, 1000)",
        "33": "@integer(0, 1000)",
        "0": "@integer(0, 1000)",
      })
      console.log('====================================');
      console.log(this.item7);
      console.log('====================================');
      if (res.item1 && res.item1.length)
      {
        this.item1 = res.item1
      }
      // const panleData = res.item1[0]
      // this.cardList.forEach(item => {
      //   if (panleData[item.key])
      //   {
      //     item.num = panleData[item.key]
      //   }
      // })
      this.dotArr = res.item2 || []
      if (this.dotArr && this.dotArr.length)
      {
        this.dotArr.forEach(async (item) => {
          if (item.map_position)
          {
            const dot = item.map_position.split(',')
            // const newPoint = await this.transformGps(new window.BMap.Point(dot[0], dot[1]))
            const newPoint = new window.BMap.Point(dot[0], dot[1])
            // item.gps = { lng: dot[0], lat: dot[1] }
            // this.markArr.push(item.gps)
            // eslint-disable-next-line require-atomic-updates
            item.gps = newPoint
            this.markArr.push(newPoint)
          }
        })
        if (!this.markArr.length)
        {
          this.markArr = [
            {
              lat: 39.915,
              lng: 116.404
            }
          ]
        }
        this.markerPoint = this.dotArr[0].gps
      } else
      {
        // 如果初始化没有坐标系就添加一个北京的默认坐标值
        this.markArr = [
          {
            lat: 39.915,
            lng: 116.404
          }
        ]
      }

      if (res.item1 && res.item1.length)
      {
        this.pieData = res.item1[0]
      } else
      {
        this.pieData = {}
      }

      // if (res.item3 && res.item3.length)
      // {
      //   const row = res.item3[0]
      //   const model = [
      //     {
      //       dayhuanbi: Math.round(row.dayhuanbi) || 0,
      //       dayyujingshu: Math.round(row.dayyujingshu) || 0
      //     },
      //     {
      //       weekhuanbi: Math.round(row.weekhuanbi) || 0,
      //       weekyujingshu: Math.round(row.weekyujingshu) || 0
      //     },
      //     {
      //       monthhuanbi: Math.round(row.monthhuanbi) || 0,
      //       monthyujingshu: Math.round(row.monthyujingshu) || 0
      //     },
      //     {
      //       seasonhuanbi: Math.round(row.seasonhuanbi) || 0,
      //       seasonyujingshu: Math.round(row.seasonyujingshu) || 0
      //     }
      //   ]
      //   this.pieData2 = model
      // } else
      // {
      //   this.pieData2 = []
      // }

      if (res.item4 && res.item4.length)
      {
        let arr = [[], []]
        res.item4.forEach(item => {
          arr[0].push(item.name)
          arr[1].push(item.quantity)
        })
        this.barData = arr
      } else
      {
        this.barData = [[], []]
      }
      let tableData = []
      if (res.item5 && res.item5.length)
      {
        res.item5.forEach(item => {
          let arr = []
          arr[0] = item.name || '-'
          arr[1] = (item.yjzz)
          arr[2] = item.number
          arr[3] = item.datetime
          arr[4] = item.liangdu
          tableData.push(arr)
        })
        this.config.data = tableData
      }

      // if (res.item6 && res.item6.length)
      // {
      //   this.item4 = res.item6
      // } else
      // {
      //   this.item4 = []
      // }

      this.myChart = echarts.init(document.getElementById('status-pie'))
      this.myChart.setOption(this.initOption())
      this.redianChart = echarts.init(document.getElementById('redian'))
      this.redianChart.setOption(this.initRedianOption())
      // this.electricityChart = echarts.init(document.getElementById('electricity'))
      // this.electricityChart.setOption(this.initEleCtricity())
      // this.pieData = res.item5[0]
      // this.pieData2 = res.item5[1]
      // console.log(this.cardList)
      // console.log(res)
    },
    transformGps (pointArr) {
      return new Promise(function (resolve, reject) {
        function translateCallback (data) {
          if (data.status === 0)
          {
            var point = new window.BMap.Point(data.points[0].lng, data.points[0].lat)
            resolve(point)
          } else
          {
            resolve(pointArr)
          }
        }
        const convertor = new window.BMap.Convertor()
        convertor.translate([pointArr], 1, 5, translateCallback)
      })
    },
    toDotDetail (event, item) {
      if (event.type == 'ondblclick' && item.cat_id)
      {
        this.$router.push({ path: `/roadManage/roadList/road${item.cat_id}` })
      }
    },
    mapReady ({ BMap, map }) { // 地图初始化完成-添加自定义样式
      // map.setMapStyle({
      //   styleJson: BMapJson
      // })
      map.setMapStyleV2({ styleId: 'b2a5cf3f2709221ab9a68e0872eec809' })
    },
    showWindowInfo (index) {
      this.infoIndex = index
    }
  }
}
</script>

<style></style>
<style lang="scss" scoped>
.dashboard {
  // width: 100%;
  padding-bottom: 22px;
  height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/images/dashboard_bg.png");
  background-size: cover;
  background-repeat: no-repeat;

  .top-bg {
    position: relative;
    text-align: center;
    width: 100%;
    height: 66px;
    background: url("./../../assets/images/home_top_bg.png") no-repeat left;
    background-size: 100% auto;

    span {
      font-size: 2rem;
      line-height: 60px;
      color: #89b2ff;
    }

    .time {
      position: absolute;
      top: 30%;
      left: 1%;

      span {
        font-size: 32px;
      }
    }
  }

  .data-content {
    width: 100%;
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .card-wrap {
    width: 100%;
    height: 70.6px;
    display: flex;
    justify-content: space-between;

    .card-item {
      width: 144px;
      height: 70.6px;
      box-shadow: inset 0px 1px 22px 0px #14429e;
      text-align: center;
      // padding: 13px;

      .num {
        margin-top: 13px;
        font-size: 24px;
        line-height: 32px;
        color: #39e5ef;
      }

      .tit {
        line-height: 18px;
        font-size: 12px;
        color: #87b0fc;
      }
    }
  }

  .map-wrap {
    width: 100%;
    padding: 2px;
    height: 446px;
    flex: 3;

    .map {
      width: 100%;
      height: 100%;
    }
  }

  .echart-wrap {
    width: 100%;
    height: 21.5vh;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .echart-item {
      padding: 20px;
      width: 24%;
      box-shadow: inset 0px 1px 22px 0px #14429e;
      margin-right: 20px;

      &:last-child {
        margin-right: 0px;
      }
    }

    .two-pie-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .pie-item {
        width: 100%;
        height: 50%;
      }
    }
  }
}

.box-left {
  width: 30%;
  color: #89b2ff;
  padding-right: 1%;
}

.box-right {
  width: 30%;
  color: #89b2ff;
  padding-left: 1%;
}

.index-box {
  height: 30.7%;
  width: 100%;

  .title {
    height: 8%;
    line-height: 8%;
    font-size: 1.125rem;
    font-weight: 600;
    border-bottom: 2px solid #89b2ff;
    color: #89b2ff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 4%;
  }

  .con-text {
    display: flex;
    justify-content: space-between;
    height: 80%;
    box-sizing: border-box;
    padding: 4% 0;

    .con-left {
      width: 50%;
      padding-left: 6%;

      .col {
        margin-bottom: 12px;

        .col-label {
          font-size: 24px;
          margin-right: 20px;
          width: 120px;
          display: inline-block;
        }

        .col-num {
          font-size: 24px;
        }
      }
    }

    .con-right {
      width: 50%;

      #status-pie {
        margin-top: -65px;
        width: 100%;
        height: 125%;
      }
    }
  }

  .con-texts {
    padding: 4% 0;
    height: 80%;
    font-size: 24px;
  }
}

.map-title {
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2.4%;
}

.charts_title {
  width: 100%;
  margin: 20px 0;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
}

.event-play {
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  span {
    margin-right: 4px;
  }
}

.center-charts {
  flex: 1;
}

.center-map {
  display: flex;
  flex: 1;
  flex-direction: column;
  color: #89b2ff;
}

.yjrow {
  margin-left: 20px;
  text-align: center;

  &:last-child {
    margin-top: 30px;
  }
}

.huanbi {
  color: #39e5ef;
  margin-top: 10px;
}

.hindex-box {
  height: 50%;
}

#redian {
  height: 85%;
}

.green {}

.yellow {}

.red {}

#electricity {
  height: 90%;
}

.c1 {
  color: #375623;
  font-size: 20px;
}

.c2 {
  color: #a9d08e;
  font-size: 20px;
}

.c3 {
  color: #ed7d31;
  font-size: 20px;
}

.c4 {
  color: #ff0000;
  font-size: 20px;
}
</style>
