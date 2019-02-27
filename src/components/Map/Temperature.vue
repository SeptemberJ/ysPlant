<template>
  <div class="Temperature">
	  <div id="mapTemperature" style="width: 100%;height: 500px;">
	  </div>
	</div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
import {setZoom} from '../../util/utils'
import {send} from '../../util/send'
export default {
  name: 'Car',
  data () {
    return {
			// pointArray2: [
	  //     {lng: 108.112917, lat: 24.435153, kind: 0, tips: '37'},
	  //     {lng: 119.532937, lat: 31.435183, kind: 0, tips: '38'},
	  //     {lng: 121.122987, lat: 28.435173, kind: 1, tips: '23'},
	  //     {lng: 119.212917, lat: 25.535153, kind: 1, tips: '24'},
	  //     {lng: 115.122987, lat: 28.435173, kind: 2, tips: '18'},
	  //     {lng: 117.212917, lat: 25.535153, kind: 2, tips: '14'},
	  //     {lng: 107.212917, lat: 29.535153, kind: 3, tips: '-1'},
	  //     {lng: 120.1006487, lat: 30.435153, kind: 3, tips: '-3'}
	  //   ]
    }
  },
  mounted () {
		this.getData()
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
	    // map.centerAndZoom(new BMap.Point(118.10000, 24.46667), 11)
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
	      }
	      map.addOverlay(marker)
	      // 信息框
	      let opts = {
	        width : 200,
	        height: 50,
	        title : '温度',
	        enableMessage:true,
	        message: item.tips
	      }
	      let infoWindow = new BMap.InfoWindow(item.tips + '℃', opts)
	      marker.addEventListener('click', function(){
	        map.openInfoWindow(infoWindow,point)
	      })
	    })
	    setZoom(PointData, map, BMap)
	  },
		getData() {
			send({
				name: '/tokens/serwdjs',
				method: 'GET',
				data: {
				}
			}).then(res => {
				console.log(res.data.resultStr.NewDataSet)
				let tempArray = []
				res.data.resultStr.NewDataSet.map( item => {
					let obj = {
						lat: item.Lat,
						lng: item.Lon,
						kind: 0,
						tips: item.tmp1
					}
					tempArray.push(obj)
				})
				this.setMap(tempArray)
			}).catch((res) => {
				console.log(res)
			})
		}
  }
}
</script>
<style lang="less" scoped>
.Temperature{
}
</style>
