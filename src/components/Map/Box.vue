<template>
  <div class="Box">
	  <div id="mapBox" style="width: 100%;height: 500px;">
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
  watch: {
		pointArray: function (val) {
			this.setMap()
		}
  },
  created () {
  },
  methods: {
		setMap () {
	    var map = new BMap.Map('mapBox')
	    map.centerAndZoom(new BMap.Point(118.10000, 24.46667), 11)
	    map.enableScrollWheelZoom(true)
	    // 图标
	    var IconBox = new BMap.Icon('../../../static/images/icon/box.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconBox2 = new BMap.Icon('../../../static/images/icon/box2.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    var IconBox3 = new BMap.Icon('../../../static/images/icon/boxOut.png', new BMap.Size(50,50), {anchor: new BMap.Size(20, 5)})
	    // 放点
	    this.pointArray.map(item => {
	      let marker
	      let point = new BMap.Point(item.lng,item.lat)
	      switch (item.kind) {
	        case 0:
	          marker = new BMap.Marker(point, {icon:IconBox2})
	          break
	        case 1:
	          marker = new BMap.Marker(point, {icon:IconBox})
	          break
	        case 2:
	          marker = new BMap.Marker(point, {icon:IconBox3})
	          break
          default:
            marker = new BMap.Marker(point, {icon:IconBox2})
	      }
	      map.addOverlay(marker)
	      // 信息框
	      let opts = {
	        width : 200,
	        height: 30,
	        title : '当前状态',
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
.Box{
}
</style>
