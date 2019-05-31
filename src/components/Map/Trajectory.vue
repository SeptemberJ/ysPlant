<template>
  <div class="Trajectory">
    <div id="Trajectory" style="width: 100%;height: 500px;">
    </div>
  </div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
import {setZoom} from '../../util/utils'
export default {
  name: 'Trajectory',
  data () {
    return {
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    setMap (PointData) {
      var map = new BMap.Map('Trajectory', {enableMapClick: false})
      var linePoint = []
      // var point = new BMap.Point(116.404, 39.915)
      // map.centerAndZoom(point, 15)
      // map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
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
        let point = new BMap.Point(item.lng, item.lat)
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
            offset: new BMap.Size(0, 0)
          })
          map.addOverlay(marker)
        }
        // line point
        linePoint.push(new BMap.Point(item.lng, item.lat))
        // 信息框
        let opts = {
          width : 200,
          height: 100,
          title : '位置信息',
          enableMessage:true,
          message: ''
        }
        // '车牌/速度：'+  '沪DA9645 / 51.2 ' + '<br />' + '时间：' + '2019-04-19 10:37:28' + '<br />' + '位置：' + item.lat + '-' + item.lng, opts
        let infoWindow = new BMap.InfoWindow('时间：' + item.submitTime + '<br />' + '地址：' + item.address + '<br />', opts)
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
        name: '/orderController/trail/' + localStorage['MapId'] + '/1',
        method: 'GET',
        data: {
        }
      }).then(res => {
        this.setMap(res.data.data)
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.Trajectory{
  .DetailList{
    height: 300px;
  }
}
</style>
