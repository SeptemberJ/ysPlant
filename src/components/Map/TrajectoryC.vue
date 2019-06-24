<template>
  <div class="TrajectoryC">
    <el-row>
      <el-col :span="24">
        <div id="TrajectoryC" style="width: 100%;height: 400px;"></div>
      </el-col>
      <el-col>
        <div class="DetailList">
          <el-table
            @row-click="showInfoWindow"
            :data="tableData"
            :header-cell-style="{background:'#f2eada', color:'#666'}"
            height="250"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="fname"
              label="司机"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fmobile"
              label="手机号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="seeTrack(scope.$index, scope.row)">查看轨迹</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 单个轨迹 -->
    <el-dialog title="轨迹" :visible.sync="dialogTrackVisible" fullscreen :close-on-click-modal="false">
      <div id="TrajectoryHistory" style="width: 100%;height: 400px;"></div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=ec7afa4023dddf95386ef1198b16cf9d"></script>
<script>
import { mapState, mapActions } from 'vuex'
import {setZoom} from '../../util/utils'
export default {
  name: 'TrajectoryC',
  data () {
    return {
      carTypeList: [],
      carType: '',
      infoWindowArray: [],
      tableData: [],
      dialogTrackVisible: false
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    mapTrajectoryC: function () {
        var map = new AMap.Map('TrajectoryC',{
          resizeEnable: false,
          zoom: 2
        })
      return map
    }
  },
  methods: {
    ...mapActions([
      'changeMapTrajectoryC'
    ]),
    // PointData
    setMap (PointData, ElementId) {
      // var map = new AMap.Map(ElementId,{
      //   resizeEnable: false,
      //   zoom: 2,
      //   center: [PointData[0].lng, PointData[0].lat]
      // })
      var map = this.mapTrajectoryC
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'], () => {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.OverView({isOpen:true}))
      })
      // 图标
      var IconCarBlue = new AMap.Icon({
        image: '../../../static/images/icon/truckBlue.png',
        size: new AMap.Size(30, 30)
      })
      var markers = []
      PointData.map(item => {
        let marker
        marker = new AMap.Marker({
          icon: IconCarBlue,
          position: [item.lng, item.lat],
          offset: new AMap.Pixel(-2, -2),
          zIndex: 101,
          title: '',
          map: map
        })
        // 信息框
        var info = []
        info.push("<div style=\"width: 200px;padding:7px 0px 0px 0px;\"><h4><strong>当前位置:</strong></h4>")
        info.push("<p class='input-item'>司机 : " + item.fname + "</p>")
        info.push("<p class='input-item'>地址 : " + item.address + "</p>")
        var infoWindow = new AMap.InfoWindow({
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
    // track
    setMapTrack (PointData, fullInfoPointData, ElementId) {
      let lastIdx = PointData.length - 1
      var marker, lineArr = PointData
      var map = new AMap.Map(ElementId, {
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
        name: '/orderController/trail/' + localStorage['MapId'] + '/{pay_type}',
        method: 'GET',
        data: {
        }
      }).then(res => {
        // res.data.data.push({lng: 117.7757, lat: 35.254095, companyName: '123', fmobile: '111111', fname: 'sj', address: '上海市普陀区', submitTime: '2019-04-26 12:43:43'})
        if (res.data.data.length > 0) {
          this.tableData = res.data.data
          this.setMap(res.data.data, 'TrajectoryC')
        }  else {
          var map = new AMap.Map('TrajectoryC', {
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
    },
    showInfoWindow (row, event, column) {
      let infoWindow
      let info = []
      info.push("<div style=\"width: 200px;padding:7px 0px 0px 0px;\"><h4><strong>当前位置:</strong></h4>")
      info.push("<p class='input-item'>司机 : " + row.fname + "</p>")
      info.push("<p class='input-item'>地址 : " + row.address + "</p>")
      infoWindow = new AMap.InfoWindow({
        content: info.join("")
      })
      infoWindow.open(this.mapTrajectoryC, [row.lng, row.lat])
    },
    // 查看轨迹
    seeTrack (idx, row) {
      this.dialogTrackVisible = true
      this.send({
        name: '/orderController/trail/' + row.fid + '/2',
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
          this.setMapTrack(formatData, fullInfoData, 'TrajectoryHistory')
        } else {
          var map = new AMap.Map('TrajectoryHistory', {
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
        // var data1 = [
        //   {
        //     lng: 127.7757,
        //     lat: 37.254095,
        //     address: '上海',
        //     submitTime: "2019-04-18 10:10:49"
        //   },
        //   {
        //     lng: 117.7757,
        //     lat: 36.254095,
        //     address: '厦门',
        //     submitTime: "2019-04-18 10:10:49"
        //   }
        // ]
        // this.setMap(data1, 'TrajectoryHistory')
        // this.setMapTrack(res.data.data, 'TrajectoryHistory')
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.TrajectoryC{
  background:#fff;
}
</style>
