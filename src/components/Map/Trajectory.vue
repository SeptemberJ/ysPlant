<template>
  <div class="Trajectory">
    <div id="Trajectory" style="width: 100%;height: 500px;">
    </div>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=ec7afa4023dddf95386ef1198b16cf9d"></script>
<script>
import {setZoom} from '../../util/utils'
export default {
  name: 'Trajectory',
  data () {
    return {
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    setMap2 (PointData) {
      let lastIdx = PointData.length - 1
      var marker, lineArr = PointData

      var map = new AMap.Map("Trajectory", {
          resizeEnable: true,
          center: PointData[0],
          zoom: 17
      })
      var markers = []
      // 标记
      PointData.map((point, idx) => {
        switch (idx) {
          case 0:
            marker = new AMap.Marker({
              map: map,
              position: point,
              zIndex: 999,
              icon: '../../../static/images/icon/startMarker.png',
              offset: new AMap.Pixel(-23, -40),
              autoRotation: true,
            })
            break
          case lastIdx:
            marker = new AMap.Marker({
              map: map,
              position: point,
              zIndex: 999,
              icon: '../../../static/images/icon/endMarker.png',
              offset: new AMap.Pixel(-23, -40),
              autoRotation: true,
            })
            break
          default:
            marker = new AMap.Marker({
              map: map,
              position: point,
              offset: new AMap.Pixel(-8, -30),
              autoRotation: true,
              // angle:-90,
            })
        }
        // 信息框
        var info = [];
        // info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"width: 200px;padding:7px 0px 0px 0px;\"><h4><strong>当前位置:</strong></h4>");
        // info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
        info.push("<p class='input-item'>" + 12 + '℃');
        var infoWindow = new AMap.InfoWindow({
            // isCustom: true,  //使用自定义窗体
            content: info.join(""),
            offset: new AMap.Pixel(16, -45)
        })
        AMap.event.addListener(marker, 'click', () => {
          infoWindow.open(map, point)
        })
        markers.push(marker)
      })

      // 绘制轨迹
      var polyline = new AMap.Polyline({
          map: map,
          path: lineArr,
          showDir:true,
          strokeColor: "#28F", // 线颜色
          // strokeOpacity: 1, // 线透明度
          strokeWeight: 6, // 线宽
          // strokeStyle: "solid"  // 线样式
      })
      map.setFitView()
    },
    setMap (PointData, fullInfoPointData) {
      let lastIdx = PointData.length - 1
      var marker, lineArr = PointData
      var map = new AMap.Map('Trajectory', {
        resizeEnable: true,
        center: PointData[0],
        zoom: 17
      })
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.OverView({isOpen:true}))
      })
      var markers = []
      // 标记
      PointData.map((point, idx) => {
        switch (idx) {
          case 0:
            // 起点
            marker = new AMap.Marker({
              map: map,
              position: point,
              zIndex: 999999,
              icon: '../../../static/images/icon/startMarker.png',
              offset: new AMap.Pixel(-23, -40),
              autoRotation: true
            })
            break
          case lastIdx:
            // 终点
            marker = new AMap.Marker({
              map: map,
              position: point,
              zIndex: 999998,
              icon: '../../../static/images/icon/endMarker.png',
              offset: new AMap.Pixel(-23, -40),
              autoRotation: true
            })
            break
          default:
            // 途经
            marker = new AMap.Marker({
              map: map,
              position: point,
              offset: new AMap.Pixel(-8, -30),
              autoRotation: true
            })
        }
        // 信息框
        var info = []
        info.push("<div style=\"width: 200px;padding:7px 0px 0px 0px;\"><h4><strong>位置信息:</strong></h4>")
        info.push("<p class='input-item'>时间 : " + fullInfoPointData[idx].submitTime + "</p>")
        info.push("<p class='input-item'>地址 : " + fullInfoPointData[idx].address + "</p>")
        var infoWindow = new AMap.InfoWindow({
          content: info.join(""),
          offset: new AMap.Pixel(16, -45)
        })
        AMap.event.addListener(marker, 'click', () => {
          infoWindow.open(map, point)
        })
        markers.push(marker)
      })

      // 绘制轨迹
      var polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir:true,
        strokeColor: '#28F', // 线颜色
        // strokeOpacity: 1, // 线透明度
        strokeWeight: 6, // 线宽
        // strokeStyle: "solid"  // 线样式
      })
      map.setFitView()
    },
    getData() {
      this.send({
        name: '/orderController/trail/' + localStorage['MapId'] + '/1',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.data.length > 0) {
          let formatData = []
          let fullInfoData = []
          res.data.data.map(item => {
            formatData.push([item.lng, item.lat])
            fullInfoData.push(item)
          })
          this.setMap(formatData, fullInfoData)
        } else {
          var map = new AMap.Map('Trajectory', {
            resizeEnable: false, // 是否监控地图容器尺寸变化
            zoom: 1, // 初始化地图层级
            center: [116.397428, 39.90923] // 初始化地图中心点
          })
          AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
            map.addControl(new AMap.ToolBar())
            map.addControl(new AMap.Scale())
            map.addControl(new AMap.OverView({isOpen:true}))
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.Trajectory{
  .DetailList{
    height: 300px;
  }
}
</style>
