<template>
  <div class="Temperature">
	  <div id="mapTemperature" style="width: 100%;height: 500px;">
	  </div>
	</div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=ec7afa4023dddf95386ef1198b16cf9d"></script>
<script>
export default {
  name: 'Temperature',
  data () {
    return {
    }
  },
  mounted () {
		this.InitMap()
  },
  watch: {
		// pointArray: function (val) {
		// 	this.getData()
		// }
  },
  created () {
  },
  methods: {
		setMap (PointData) {
      // console.log(PointData)
      var map = new AMap.Map('mapTemperature',{
        resizeEnable: false,
        zoom: 2,
        // center: [119.812917, 27.535153]
      })
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.OverView({isOpen:true}))
      })
      // 图标
      var IconTemperatureBlue = new AMap.Icon({
        image: '../../../static/images/icon/wenduBlue.png',
        size: new AMap.Size(50, 50)
      })
      var IconTemperatureYellow = new AMap.Icon({
        image: '../../../static/images/icon/wenduYellow.png',
        size: new AMap.Size(50, 50)
      })
      var IconTemperatureRed = new AMap.Icon({
        image: '../../../static/images/icon/wenduRed.png',
        size: new AMap.Size(50, 50)
      })
      var IconTemperatureGreen = new AMap.Icon({
        image: '../../../static/images/icon/wenduGreen.png',
        size: new AMap.Size(50, 50)
      })
      var markers = []
      PointData.map(item => {
        let marker
        marker = new AMap.Marker({
          icon: item.kind === 0 ? IconTemperatureRed : (item.kind === 1 ? IconTemperatureYellow : (item.kind === 2 ? IconTemperatureGreen : (item.kind === 3 ? IconTemperatureBlue : IconTemperatureRed))),
          position: [item.lng, item.lat],
          offset: new AMap.Pixel(-2, -2),
          zIndex: 101,
          title: item.tmp1,
          map: map
        })
        // 信息框
        var info = [];
        // info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"width: 200px;padding:7px 0px 0px 0px;\"><h4><strong>当前温度:</strong></h4>");
        // info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
        info.push("<p class='input-item'>" + item.tmp1 + '℃');
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
	  async InitMap() {
			const tempPointArray = await this.getData()
      if (tempPointArray.length > 0) {
        this.setMap(tempPointArray)
      } else {
        var map = new AMap.Map('mapTemperature', {
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
	  },
		getData () {
      return new Promise((resolve, reject) => {
        this.send({
          name: '/tokens/serwdjs',
					method: 'GET',
          data: {
          }
        }).then(_res => {
          let Info = JSON.parse(_res.data.data)
          resolve(Info.NewDataSet.map( (item, idx) => {
            item.lat = item.Lat
            item.lng = item.Lon
            // item.kind = 3
            return item
          }))
        }).catch((_res) => {
          console.log(_res)
          this.$Message.error('Interface Error!')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.Temperature{
}
</style>
