<template>
	<div class="Map">
    <section class="Condition">
      <div>
        <span class="MarginR_10">查询类型</span>
        <span class="MarginR_10">
          <el-select v-model="Condition" placeholder="请选择">
            <el-option
              v-for="item in searchCondition"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <!-- <span><el-button type="primary" icon="el-icon-search">查询</el-button></span> -->
      </div>
    </section>
    <Car v-if="Condition == 0"/>
    <Temperature v-if="Condition == 1"/>
    <Box v-if="Condition == 2"/>
	</div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=i958ho3aKFiiVfxOIwAZOO05sHDDsAGK"></script>
<script>
import Car from './Car.vue'
import Temperature from './Temperature.vue'
import Box from './Box.vue'
export default {
  name: 'Map',
  data () {
    return {
      Condition: 0,
      searchCondition: [
        {label: '车辆', value: 0},
        {label: '温度', value: 1},
        {label: '箱子', value: 2}
      ]
    }
  },
  computed: {
  },
  created () {
  },
  components: {
    Car,
    Temperature,
    Box
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.Map{
	.Condition{
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 60px;
		line-height: 60px;
		text-align: right;
		background: #fff;
	}
}
</style>
