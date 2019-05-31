<template>
	<div class="Map">
    <section class="Condition">
      <span class="mapNavItem CursorPointer" v-for="(item) in searchConditionC" :key="item.value">
        <el-tag :type="item.value == Condition ? 'danger' :''" @click="changeCondition(item.value)">{{item.label}}</el-tag>
      </span>
    </section>
    <Trajectory v-if="Condition == 0 && (userRole == 2 || userRole == 5)"/>
    <TrajectorycC v-if="Condition == 0 && (userRole == 1 || userRole == 3 || userRole == 4)"/>
    <Car v-if="Condition == 1"/>
    <Temperature v-if="Condition == 2"/>
    <Box v-if="Condition == 3"/>
	</div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
import { mapState } from 'vuex'
import Car from './Car.vue'
import Temperature from './Temperature.vue'
import Box from './Box.vue'
import Trajectory from './Trajectory.vue'
import TrajectorycC from './TrajectoryC.vue'

export default {
  name: 'Map',
  data () {
    return {
      Condition: 0,
      carType: '',
      searchCondition: [
        {label: '轨迹', value: 0},
        {label: '车辆', value: 1},
        {label: '温度', value: 2},
        {label: '箱子', value: 3}
      ],
      searchConditionC: [
        {label: '车辆', value: 0},
        {label: '温度', value: 2},
        {label: '箱子', value: 3}
      ],
      carTypeList: []
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole
    })
  },
  created () {
    this.getCarType()
  },
  components: {
    Car,
    Temperature,
    Box,
    Trajectory,
    TrajectorycC
  },
  methods: {
    changeCondition (idx) {
      this.Condition = idx
    },
    // 获取车型下拉
    getCarType () {
      this.send({
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
.Map{
  background: #fff;
  margin: 20px 20px 60px 20px;
  padding: 15px;
	.Condition{
		width: calc(100% - 0px);
		text-align: right;
    height: 40px;
    .mapNavItem{
      float:left;
      text-align:center;
    }
	}
}
</style>
