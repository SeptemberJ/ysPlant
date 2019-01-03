<template>
  <div class="Order">
    <el-row v-if="!showDetail">
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
        <!-- <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button> -->
        <el-form :inline="true" :model="formCondition" class="demo-form-inline">
          <el-form-item label="运单号">
            <el-input v-model="formCondition.orderNo" placeholder="运单号" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="起始日期">
            <el-date-picker type="date" placeholder="选择起始日期" v-model="formCondition.startDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="formCondition.endDate" style="width: 100%;"></el-date-picker>
          </el-form-item> -->
          <!-- <el-form-item label="活动区域">
            <el-select v-model="formCondition.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24"  class="MarginTB_20">
        <el-table
          ref="multipleTable"
          :data="orderList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="运单号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="发货时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="goods"
            label="货物名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
    <OrderDetail v-if="showDetail"/>
  </div>
</template>

<script>
import OrderDetail from '../components/OrderDetail.vue'
export default {
  name: 'Order',
  data () {
    return {
      showDetail: false,
      currentPage: 1,
      formCondition: {
        orderNo: '',
        startDate: '',
        endDate: ''
      },
      orderList: [
        {
          orderNo: 'ORSCSC123',
          goods: '电缆',
          startPlace: '海门',
          endPlace: '上海',
          amount: '20',
          date: '2019-01-13'
        },
        {
          orderNo: 'ORDCR563',
          goods: '地砖',
          startPlace: '山东省淄博',
          endPlace: '湖南省长沙',
          amount: '22',
          date: '2019-01-15'
        }
      ]
    }
  },
  components: {
    OrderDetail
  },
  methods: {
    handleSelectionChange () {
    },
    handleEdit () {
      this.showDetail = true
      // const h = this.$createElement
      // this.$msgbox({
      //   title: '消息',
      //   message: h('p', null, [
      //     h('span', null, '内容可以是 '),
      //     h('i', { style: 'color: teal' }, 'VNode')
      //   ]),
      //   showCancelButton: true,
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   beforeClose: (action, instance, done) => {
      //     if (action === 'confirm') {
      //       instance.confirmButtonLoading = true
      //       instance.confirmButtonText = '执行中...'
      //       setTimeout(() => {
      //         done()
      //         setTimeout(() => {
      //           instance.confirmButtonLoading = false
      //         }, 300)
      //       }, 3000)
      //     } else {
      //       done()
      //     }
      //   }
      // }).then(action => {
      //   this.$message({
      //     type: 'info',
      //     message: 'action: ' + action
      //   })
      // })
    },
    handleDelete () {
      this.$confirm('此操作将删除该运单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Order{
  background: #fff;
  margin: 20px;
  padding: 20px;
}
</style>
