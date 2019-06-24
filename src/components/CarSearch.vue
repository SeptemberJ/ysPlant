<template>
  <!-- 货主找车 -->
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
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=ec7afa4023dddf95386ef1198b16cf9d"></script>
<script>
import { mapState } from 'vuex'
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
	    carType: ''
    }
  },
  mounted () {
		this.setMap()
  },
  watch: {
		// pointArray: function (val) {
		// 	this.setMap()
		// }
  },
  computed: {
    ...mapState({
      carTypeList: state => state.carTypeList
    })
  },
  created () {
  },
  methods: {
		setMap () {
      var map = new AMap.Map('mapCar',{
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
      var IconCarBlue = new AMap.Icon({
        image: '../../../static/images/icon/truckBlue.png',
        size: new AMap.Size(30, 30)
      })
      var IconCarRed = new AMap.Icon({
        image: '../../../static/images/icon/truckRed.png',
        size: new AMap.Size(30, 30)
      })
      var IconCarGreen = new AMap.Icon({
        image: '../../../static/images/icon/truckGreen.png',
        size: new AMap.Size(30, 30)
      })
      var markers = []
      this.pointArray.map(item => {
        let marker
        marker = new AMap.Marker({
          icon: item.kind === 0 ? IconCarBlue : (item.kind === 1 ? IconCarRed : IconCarGreen),
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
