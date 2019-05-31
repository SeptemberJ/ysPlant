<template>
  <div class="Car">
	  <div id="mapCar" style="width: 100%;height: 500px;">
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
			pointArray: [
	      {lng: 108.112917, lat: 24.435153, kind: 0, tips: '卡车A'},
	      {lng: 119.532937, lat: 31.435183, kind: 0, tips: '卡车B'},
	      {lng: 115.122987, lat: 28.435173, kind: 0, tips: '卡车C'},
	      {lng: 117.212917, lat: 25.535153, kind: 1, tips: '卡车D'},
	      {lng: 117.812917, lat: 27.535153, kind: 1, tips: '卡车E'},
	      {lng: 107.212917, lat: 29.535153, kind: 1, tips: '卡车F'},
	      {lng: 120.1006487, lat: 30.435153, kind: 2, tips: '卡车G'}
	    ]
    }
  },
  mounted () {
		this.setMap()
  },
  watch: {
		pointArray: function (val) {
			this.setMap()
		}
  },
  created () {
  },
  methods: {
		setMap () {
	    var map = new BMap.Map('mapCar')
	    map.centerAndZoom(new BMap.Point(118.10000, 24.46667), 11)
	    map.enableScrollWheelZoom(true)
	    // 图标
	    var IconCarBlue = new BMap.Icon('../../../static/images/icon/truckBlue.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconCarRed = new BMap.Icon('../../../static/images/icon/truckRed.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconCarGreen = new BMap.Icon('../../../static/images/icon/truckGreen.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    // 放点
	    this.pointArray.map(item => {
	      let marker
	      let point = new BMap.Point(item.lng,item.lat)
	      switch (item.kind) {
	        case 0:
	          marker = new BMap.Marker(point, {icon:IconCarBlue})
	          break
	        case 1:
	          marker = new BMap.Marker(point, {icon:IconCarRed})
	          break
	        case 2:
	          marker = new BMap.Marker(point, {icon:IconCarGreen})
	          break
          default:
            marker = new BMap.Marker(point, {icon:IconCarBlue})
	      }
	      map.addOverlay(marker)
	      // 信息框
	      let opts = {
	        width : 200,
	        height: 30,
	        title : '目前位置',
	        enableMessage:true,
	        message: item.tips
	      }
	      let infoWindow = new BMap.InfoWindow(item.tips, opts)
	      marker.addEventListener('click', function(){
	        map.openInfoWindow(infoWindow,point)
	      })
	    })
	    setZoom(this.pointArray, map, BMap)
	  }
  }
}
</script>
<style lang="less" scoped>
.Car{
}
</style>
