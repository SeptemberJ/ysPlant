<template>
  <div class="Box">
    <!-- <remote-css href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"></remote-css>
 -->	  <div id="mapBox" style="width: 100%;height: 500px">
	  </div>
	</div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=ec7afa4023dddf95386ef1198b16cf9d"></script>
<script>
export default {
  name: 'Car',
  data () {
    return {
      provinces: [
        {
          'name': '北京市',
          'lng': 116.405285,
          'lat': 39.904989,
          'center': '116.405285, 39.904989',
          'type': 1,
          'subDistricts': []
        },
        {
          'name': '天津市',
          'lng': 117.190182,
          'lat': 39.125596,
          'center': '117.190182, 39.125596',
          'type': 1,
          'subDistricts': []
        },
        {
          'name': '河北省',
          'lng': 114.502461,
          'lat': 38.045474,
          'center': '114.502461, 38.045474',
          'type': 1,
          'subDistricts': []
        },
        {
          'name': '山西省',
          'lng': 112.549248,
          'lat': 37.857014,
          'center': '112.549248, 37.857014',
          'type': 1,
          'subDistricts': []
        },
        {
          'name': '内蒙古自治区',
          'lng': 111.670801,
          'lat': 40.818311,
          'center': '111.670801, 40.818311',
          'type': 1,
          'subDistricts': []
        }
      ],
      pointArray: [
        {lng: 108.112917, lat: 29.435153, kind: 0, tips: '已开箱'},
        {lng: 117.212917, lat: 25.535153, kind: 1, tips: '未开箱'},
        {lng: 119.812917, lat: 27.535153, kind: 1, tips: '未开箱'},
        {lng: 120.1006487, lat: 30.435153, kind: 2, tips: '正在开箱'}
      ]
    }
  },
  mounted () {
    this.setMap()
  },
  computed: {
    mapBox: function () {
        var map = new AMap.Map('mapBox',{
          resizeEnable: false,
          zoom: 2
        })
      return map
    }
  },
  created () {
  },
  methods: {
    setMap () {
      var map = this.mapBox
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'], () => {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.OverView({isOpen:true}))
      })
      // 图标
      var IconBox = new AMap.Icon({
        image: '../../../static/images/icon/box.png',
        size: new AMap.Size(24, 24)
      })
      var IconBox2 = new AMap.Icon({
        image: '../../../static/images/icon/box2.png',
        size: new AMap.Size(24, 24)
      })
      var IconBox3 = new AMap.Icon({
        image: '../../../static/images/icon/boxOut.png',
        size: new AMap.Size(24, 24)
      })
      var markers = []
      this.pointArray.map(item => {
        let marker
        marker = new AMap.Marker({
          icon: item.kind === 0 ? IconBox2 : (item.kind === 1 ? IconBox : (item.kind === 2 ? IconBox3 : IconBox2)),
          position: [item.lng, item.lat],
          offset: new AMap.Pixel(-2, -2),
          zIndex: 101,
          title: item.tips,
          map: map
        })
        // 信息框
        var info = [];
        // info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"width: 200px;padding:7px 0px 0px 0px;\"><h4><strong>当前状态:</strong></h4>");
        // info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
        info.push("<p class='input-item'>" + item.tips);
        var infoWindow = new AMap.InfoWindow({
            // isCustom: true,  //使用自定义窗体
            content: info.join(""),
            offset: new AMap.Pixel(16, -45)
        })
        AMap.event.addListener(marker, 'click', () => {
          infoWindow.open(map, [item.lng, item.lat])
        })
        markers.push(marker)
      })
      map.setFitView()
    },
    setMap2 () {
      var map = new AMap.Map('mapBox',{
        resizeEnable: false,
        zoom: 2,
        // center: [119.812917, 27.535153]
      })
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.OverView({isOpen:true}))
      })
      var markers = []
      this.pointArray.map(item => {
        let marker
        var icon = new AMap.Icon({
          image: '../../../static/images/icon/box.png',
          size: new AMap.Size(24, 24)
        })
        marker = new AMap.Marker({
          icon: icon,
          position: [item.lng, item.lat],
          offset: new AMap.Pixel(-2, -2),
          zIndex: 101,
          title: item.tips,
          map: map
        })
        markers.push(marker)
      })
      map.setFitView()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
