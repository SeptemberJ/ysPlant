<template>
  <div>
    <el-row class="expand-row">
      <el-col :span="8">
        <span class="expand-key">发货人: </span>
        <span class="expand-value">{{ row.fh_name }}</span>
      </el-col>
      <el-col :span="8">
        <span class="expand-key">手机号: </span>
        <span class="expand-value">{{ row.fh_telephone }}</span>
      </el-col>
      <el-col :span="8">
        <span class="expand-key">街道: </span>
        <span class="expand-value">{{ row.fh_address }}</span>
      </el-col>
    </el-row>
    <!-- 收货信息 -->
    <el-row class="expand-row">
      <el-col :span="8">
        <span class="expand-key">收货人: </span>
        <span class="expand-value">{{ row.sh_name }}</span>
      </el-col>
      <el-col :span="8">
        <span class="expand-key">手机号: </span>
        <span class="expand-value">{{ row.sh_telephone }}</span>
      </el-col>
      <el-col :span="8">
        <span class="expand-key">街道: </span>
        <span class="expand-value">{{ row.sh_address }}</span>
      </el-col>
    </el-row>
    <!-- 其他信息 -->
    <el-row class="expand-row">
      <el-col :span="6">
        <span class="expand-key">货物类型: </span>
        <span class="expand-value">{{ row.goods_name }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">车型: </span>
        <span class="expand-value">{{ row.sh_telephone }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">装货日期: </span>
        <span class="expand-value">{{ row.zhDate }}</span>
      </el-col>
      <el-col :span="6">
        <span class="expand-key">开具发票: </span>
        <span class="expand-value">{{ row.is_fapiao == 0 ? '不要' : '要' }}</span>
      </el-col>
    </el-row>
    <el-row class="expand-row">
      <el-col :span="8">
        <span class="expand-key">预估费用: </span>
        <span class="expand-value">{{ row.ffee }}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
