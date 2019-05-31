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
              prop="companyName"
              label="车辆单位"
              width="180">
            </el-table-column>
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
            <el-table-column label="操作">
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
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
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
  methods: {
    // PointData
    setMap (PointData, ElementId) {
      var map = new BMap.Map(ElementId, {enableMapClick: false})
      // map.enableScrollWheelZoom(true)
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_LARGE }))
      // 图标
      var IconCarBlue = new BMap.Icon('../../../static/images/icon/truckBlue.png', new BMap.Size(30,30), {anchor: new BMap.Size(20, 5)})
      // 放点
      PointData.map(item => {
        let marker
        let point = new BMap.Point(item.lng,item.lat)
        marker = new BMap.Marker(point, {icon:IconCarBlue})
        map.addOverlay(marker)
        // 信息框
        let opts = {
          width : 200,
          height: 100,
          title : '位置信息',
          enableMessage:true,
          message: ''
        }
        let infoWindow = new BMap.InfoWindow('时间：' + item.submitTime + '<br />' + '地址：' + item.address + '<br />', opts)
        this.infoWindowArray.push({map: map, info: infoWindow, lng: item.lng, lat: item.lat})
        marker.addEventListener('click', function(){
          map.openInfoWindow(infoWindow,point)
        })
      })
      if (PointData.length == 1) {
        map.centerAndZoom(new BMap.Point(PointData[0].lng, PointData[0].lat), 8)
      } else {
        setZoom(PointData, map, BMap)
      }
    },
    // track
    setMapTrack (PointData, ElementId) {
      var map = new BMap.Map(ElementId, {enableMapClick: false})
      var linePoint = []
      // map.enableScrollWheelZoom(true)
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_LARGE }))
      // 图标
      var size = new BMap.Size(52, 26);
      var offset = new BMap.Size(20, -10)
      var imageSize = new BMap.Size(20, 20);
      var startIcon = new BMap.Icon("../../../static/images/icon/start.png", new BMap.Size(80, 40), {
        imageSize: new BMap.Size(40, 40),
        infoWindowAnchor:new BMap.Size(0, -3)
      })
      var endIcon = new BMap.Icon("../../../static/images/icon/end.png", new BMap.Size(80, 40), {
        imageSize: new BMap.Size(40, 40),
        infoWindowAnchor:new BMap.Size(0, -3)
      })
      var icon = new BMap.Icon("../../../static/images/icon/arrow.png", size, {
        imageSize: new BMap.Size(20, 20),
        infoWindowAnchor:new BMap.Size(0, 0)
      })
      // 放点
      PointData.map((item, idx) => {
        let marker
        let point = new BMap.Point(item.lng,item.lat)
        // 配置icon
        if (idx === 0) {
          marker = new BMap.Marker(point, {
            icon: startIcon,
            offset: offset
          })
          map.addOverlay(marker)
        } else if (idx === PointData.length - 1) {
          marker = new BMap.Marker(point, {
            icon: endIcon,
            offset: offset
          })
          map.addOverlay(marker)
        } else {
          marker = new BMap.Marker(point, {
            // icon: icon,
            offset: new BMap.Size(0, 0)
          })
          map.addOverlay(marker)
        }
        // map.addOverlay(marker)
        linePoint.push(new BMap.Point(item.lng, item.lat))
        // 信息框
        let opts = {
          width : 200,
          height: 100,
          title : '位置信息',
          enableMessage:true,
          message: ''
        }
        let infoWindow = new BMap.InfoWindow('时间：' + item.submitTime + '<br />' + '地址：' + item.address + '<br />', opts)
        this.infoWindowArray.push({map: map, info: infoWindow, lng: item.lng, lat: item.lat})
        marker.addEventListener('click', function(){
          map.openInfoWindow(infoWindow,point)
        })
      })
      // 画线
      var polyline = new BMap.Polyline(linePoint, {
        strokeColor: "#d81e06",
        strokeWeight: 8,
        icons:[draw_line_direction(8)],
        setStrokeStyle:"dashed",
        strokeOpacity: 1
      });
      map.addOverlay(polyline)

      function draw_line_direction(weight) {
        var icons = new BMap.IconSequence(
          new BMap.Symbol('M0 -5 L-5 -2 L0 -4 L5 -2 Z', {
            scale: weight / 10,
            strokeWeight: 1,
            rotation: 0,
            fillColor: 'white',
            fillOpacity: 1,
            strokeColor:'white'
          }),'100%','5%',false)
        return icons
      }
      if (PointData.length == 1) {
        map.centerAndZoom(new BMap.Point(PointData[0].lng, PointData[0].lat), 8)
      } else {
        setZoom(PointData, map, BMap)
      }
    },
    getData() {
      this.send({
        name: '/orderController/trail/' + localStorage['MapId'] + '/{pay_type}',
        method: 'GET',
        data: {
        }
      }).then(res => {
        // res.data.data.push({lng: 117.7757, lat: 35.254095, companyName: '123', fmobile: '111111', fname: 'sj', address: '上海市普陀区', submitTime: '2019-04-26 12:43:43'})
        this.tableData = res.data.data
        this.setMap(res.data.data, 'TrajectoryC')
      }).catch((res) => {
        console.log(res)
      })
    },
    showInfoWindow (row, event, column) {
      this.open(row.lng, row.lat, row.address, row.submitTime)
    },
    open (lng, lat, address, submitTime) {
      var CurPointData = this.infoWindowArray[0]
      var mapInit = CurPointData.map
      let opts = {
        width : 200,
        height: 100,
        title : '位置信息',
        enableMessage:true,
        message: ''
      }
      let infoWindow = new BMap.InfoWindow('时间：' + submitTime + '<br />' + '地址：' + address + '<br />', opts)
      mapInit.openInfoWindow(infoWindow, new BMap.Point(lng, lat))
      mapInit.centerAndZoom(new BMap.Point(lng, lat), 11)
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
        this.setMapTrack(res.data.data, 'TrajectoryHistory')
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
