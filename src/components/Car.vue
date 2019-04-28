<template>
  <div class="Car">
    <el-row>
		  <el-col :span="24" class="TextAlignR">
        <div class="MarginB_20">
		      <span class="MarginR_10">查询类型</span>
		      <span class="MarginR_10">
		        <el-select v-model="carType" size="small" placeholder="请选择车辆类型">
		          <el-option
		            v-for="item in carTypeList"
		            :key="item.id"
		            :label="item.typeName"
		            :value="item.id">
		          </el-option>
		        </el-select>
		      </span>
		      <span><el-button size="mini" type="primary" icon="el-icon-search">查询</el-button></span>
		    </div>
		  </el-col>
		  <el-col :span="24">
        <div id="mapCar" style="width: 100%;height: 650px;"></div>
		  </el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
import {send} from '../util/send'
import {setZoom} from '../util/utils'
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
	    ],
	    carTypeList: [],
	    carType: ''
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
		this.getCarType()
  },
  methods: {
		setMap () {
	    var map = new BMap.Map('mapCar')
	    map.centerAndZoom(new BMap.Point(118.10000, 24.46667), 11)
	    // map.enableScrollWheelZoom(true)
	    map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_LARGE }))
	    // 图标
	    var IconCarBlue = new BMap.Icon('../../../static/images/icon/truckBlue.png', new BMap.Size(30,30), {anchor: new BMap.Size(20, 5)})
	    var IconCarRed = new BMap.Icon('../../../static/images/icon/truckRed.png', new BMap.Size(30,30), {anchor: new BMap.Size(20, 5)})
	    var IconCarGreen = new BMap.Icon('../../../static/images/icon/truckGreen.png', new BMap.Size(30,30), {anchor: new BMap.Size(20, 5)})
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
	  },
	  // 获取车型下拉
    getCarType () {
      send({
        name: '/zCarTypeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.carTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.Car{
	background:#fff;
	margin: 20px 20px 60px 20px;
	padding: 15px;
}
</style>
