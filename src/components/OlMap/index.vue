<template>
  <div class="wrapper" id="map"></div>
</template>

<script>
import { Map, View } from "ol";
// 图层
import { Vector, Tile } from "ol/layer";
// openLayers自带的数据源
import OSM from "ol/source/OSM";
// 其他地图的数据源
import XYZ from "ol/source/XYZ";
// 图形
import { Point, LineString, Polygon, Circle } from "ol/geom";
// 样式
import { Style, Icon, Fill, Stroke } from "ol/style";
import { format } from "ol/coordinate";
import MousePosition from "ol/control/MousePosition.js";
// 几何图形类
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import "ol/ol.css";
export default {
  name: "olMap",
  data () {
    return {
      // 缩放层级
      zoom: 12,
      //   定位中心点
      center: {
        lon: 121.5365,
        lat: 25.0192,
      },
      point: null,
    };
  },
  mounted () {
    this.initMap();
    // this.drawPoint();
    // this.drawPolygon();
    // this.drawLine();
    map.on("click", this.clickMap);
  },
  methods: {
    initMap () {
      let tileOSM = new Tile({
        // ol自带的数据源
        source: new OSM(),
      });

      let view = new View({
        zoom: this.zoom,
        center: [this.center.lon, this.center.lat],
        //坐标系
        projection: "EPSG:4326",
      });
      // 建议将map实例放在全局变量中，如果放在data中，数据量太大会造成ol卡死
      window.map = new Map({
        layers: [tileOSM],
        view,
        target: "map",
      });
    },
    clickMap (e) {
      console.log(e);
      /** 需要注意的是，绘制新的图形时，旧的图形并不会被删除，需要手动删除，
      手动代码如下，本例子是绘制点，绘制线、面同理，都需要将以前的图形删掉
      */
      if (this.point)
      {
        this.point.getSource().clear();
        map.removeLayer(this.point);
      }

      // 画点,将point的矢量图层保存下来，
      this.point = this.createPoint(e.coordinate);
      map.addLayer(this.point);
    },

    drawPoint () {
      // let point = this.createPoint([113.269356, 23.135343]);
      // map.addLayer(point);
    },

    drawPolygon () {
      let polygon = this.createPolygon([
        [
          [113.270665, 23.130365],
          [113.274807, 23.131674],
          [113.274485, 23.127876],
        ],
      ]);

      map.addLayer(polygon);
    },

    drawLine () {
      let line = this.createLine([
        [113.266674, 23.133626],
        [113.267876, 23.130086],
      ]);
      map.addLayer(line);
    },

    createPoint (coordinates) {
      // let styleList = [
      //   new Style({
      //     image: new Icon({
      //       anchorXUnits: "pixels",
      //       anchorYUnits: "pixels",
      //       src: require("../assets/images/position.png"),
      //       scale: 0.2,
      //     }),
      //   }),
      // ];
      // let point = new Point(coordinates);
      // return this.createLayer(point, styleList);
    },

    createPolygon (coordinates) {
      let polygon = new Polygon(coordinates);

      let styleList = [
        new Style({
          stroke: new Stroke({
            color: "#EE82EE",
            width: 1,
          }),

          fill: new Fill({
            color: "rgba(238,130,238, 0.25)",
          }),
        }),
      ];

      return this.createLayer(polygon, styleList);
    },

    createLine (coordinates) {
      let line = new LineString(coordinates);

      let styleList = [
        new Style({
          stroke: new Stroke({
            color: "#f00",
            width: 2,
          }),
        }),
      ];

      return this.createLayer(line, styleList);
    },
    /**
     * 绘制图层
     * @param { Object }  source 数据源
     * @param { Array }  style  style数组
     */
    createLayer (source, style) {
      let feature = new Feature(source);
      let vectorSource = new VectorSource({
        features: [feature],
      });

      let vector = new Vector({
        source: vectorSource,
        style: function (feature) {
          return style;
        },
      });
      return vector;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}

// 去除右下角水印
::v-deep .ol-attribution {
  display: none;
}

// 去除左上角控制栏
::v-deep .ol-control {
  display: none;
}
</style>
