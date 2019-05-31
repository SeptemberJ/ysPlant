<template>
  <div class="Temperature">
	  <div id="mapTemperature" style="width: 100%;height: 500px;">
	  </div>
	</div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
import {setZoom} from '../../util/utils'
export default {
  name: 'Car',
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
	    var map = new BMap.Map('mapTemperature')
	    map.centerAndZoom(new BMap.Point(PointData[0].lng, PointData[0].lat), 9)
	    map.enableScrollWheelZoom(true)
	    // 图标
	    var IconTemperatureBlue = new BMap.Icon('../../../static/images/icon/wenduBlue.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconTemperatureYellow = new BMap.Icon('../../../static/images/icon/wenduYellow.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconTemperatureRed = new BMap.Icon('../../../static/images/icon/wenduRed.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconTemperatureGreen = new BMap.Icon('../../../static/images/icon/wenduGreen.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    // 放点
	    PointData.map(item => {
	      let marker
	      let point = new BMap.Point(item.lng,item.lat)
	      switch (item.kind) {
	        case 0:
	          marker = new BMap.Marker(point, {icon:IconTemperatureRed})
	          break
	        case 1:
	          marker = new BMap.Marker(point, {icon:IconTemperatureYellow})
	          break
	        case 2:
	          marker = new BMap.Marker(point, {icon:IconTemperatureGreen})
	          break
	        case 3:
	          marker = new BMap.Marker(point, {icon:IconTemperatureBlue})
	          break
	        default:
	          marker = new BMap.Marker(point, {icon:IconTemperatureRed})
	      }
	      map.addOverlay(marker)
	      // 信息框
	      let opts = {
	        width : 200,
	        height: 50,
	        title : '温度',
	        enableMessage:true,
	        message: item.tmp1
	      }
	      let infoWindow = new BMap.InfoWindow(item.tmp1 + '℃', opts)
	      marker.addEventListener('click', function(){
	        map.openInfoWindow(infoWindow,point)
	      })
	    })
	    setZoom(PointData, map, BMap)
	  },
	  async InitMap() {
			const tempPointArray = await this.getData()
			this.setMap(tempPointArray)
	  },
		getData () {
      return new Promise((resolve, reject) => {
        this.send({
          name: '/tokens/serwdjs',
					method: 'GET',
          data: {
          }
        }).then(_res => {
					resolve(_res.data.resultStr.NewDataSet.map( (item, idx) => {
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
    },
  }
}
</script>
<style lang="less" scoped>
.Temperature{
}
</style>
