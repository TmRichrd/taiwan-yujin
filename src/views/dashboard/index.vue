<template>
  <div class="dashboard">
    <div class="top-bg">
      <span v-if="companyName">{{ companyName }}道路预警平台</span>
      <span v-else>霧區閃光黃燈管理平台</span>
      <div class="time">
        <span style="font-size: 24px;">GPS校時 </span>
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
                <span class="col-label">激活設備</span>
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
                <span class="green">绿</span>
              </el-col>
              <el-col :span="6">
                <span class="yellow">黄</span>
              </el-col>
              <el-col :span="6">
                <span class="red">红</span>
              </el-col>
              <el-col :span="6">
                <span class="red">红</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-left:20px;margin-top:10%">
              <el-col :span="6" style="font-family: Digital;font-size: 36px;">
                {{ item7['100'] }}
              </el-col>
              <el-col :span="6" style="font-family: Digital;font-size: 36px;">
                {{ item7['66'] }}
              </el-col>
              <el-col :span="6" style="font-family: Digital;font-size: 36px;">
                {{ item7['33'] }}
              </el-col>
              <el-col :span="6" style="font-family: Digital;font-size: 36px;">
                {{ item7['0'] }}
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
          <img src="@/assets/images/map.png" class="map" alt="">
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
            <el-col :span="12" style="height:100%">
              <div class="event-play four-border">
                <span>加载中</span><i class="el-icon-loading"></i>
              </div>
            </el-col>
            <el-col :span="12" style="height:100%">
              <div class="event-play four-border">
                <span>加载中</span><i class="el-icon-loading"></i>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="box-right">
        <div class="index-box hindex-box">
          <div class="title" style="height:5%">運作狀態</div>
          <div class="redian" id="redian">

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
    PiePic
  },
  data () {
    return {
      config: {
        columnWidth: [250, 150, 150, 250],
        header: ['路段分類', '閃爍頻率', '亮度', '資料回報情況'],
        data: [],
        align: ['center', 'center', 'center', 'center']
      },
      config1: {
        columnWidth: [250, 150, 150, 250],
        header: ['時間', '太陽能板發電', '電池狀態', '週期設定'],
        data: [],
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
      this.electricityChart.resize()
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
      return {
        color: ['#F7507F', '#0DA3E7'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false,
          right: '3%',
          icon: 'rect',
          textStyle: {
            color: '#0E9DE0'
          }
        },
        grid: {
          left: '2%',
          right: '5%',
          top: '60',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            color: '#0E9DE0',
            interval: 0,
            fontSize: 10,
          },
          axisLine: {
            lineStyle: {
              color: '#0E9DE0',
            }
          },
          type: 'category',
          data: this.barData[0],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          name: '数量',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#0E9DE0'
            }
          },
          axisLabel: {
            color: '#0E9DE0'
          },
          type: 'value'
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            stack: '总量',
            barWidth: '20',
            barCategoryGap: '10%',
            label: {
              show: true,
              position: "top"
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
            data: this.barData[1]
          }
        ]
      };
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
      const res = Mock.mock({
        'item1': [{
          "jihuoshu": "@integer(0, 1000)",
          "offlineshu": "@integer(0, 1000)",
          "onlineshu": "@integer(0, 1000)",
        }],
        "item2": [],
        "item3": [],
        "item4": [],
        "item5|10": [{
          "name": '分類' + '@integer(0, 1000)',
          "yjzz": "@integer(0, 1000)",
          "number": "@integer(0, 1000)",
          "datetime": `@pick(${['已回報', '未回報']})`,
        }],
        "item6": [],
      })
      this.config1.data = Mock.mock({
        'list|10': [
          ["@datetime", '@integer(0, 1000)', `@pick(${['10', '20', '30', '40', '50', '60', '100']})%`, `@integer(1, 2)`]
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
      this.electricityChart = echarts.init(document.getElementById('electricity'))
      this.electricityChart.setOption(this.initEleCtricity())
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

.green {
  color: green;
}

.yellow {
  color: #e6a438;
}

.red {
  color: red;
}

#electricity {
  height: 90%;
}
</style>
