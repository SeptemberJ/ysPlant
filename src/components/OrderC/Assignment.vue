<template>
  <div class="Order">
    <el-row v-if="!showDetail" style="background: #fff;padding: 20px;">
      <el-col :span="24"  class="MarginTB_20">
        <el-table
          ref="multipleTable"
          :data="OrderList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="货物名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fhName"
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="fhTelephone"
            label="发货人手机">
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
              <el-button v-if="scope.row.fstatus == 0"
                size="mini"
                type="danger"
                @click="Receipt(scope.$index, scope.row)">接单
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="ToDetail(scope.$index, scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="NotAppointOrderList.length > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col> -->
    </el-row>
    <OrderDetail v-if="showDetail" :orderId="orderId" @toggleOrderDetail='changeIfOrderDetail'/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrderDetail from './OrderDetail.vue'
export default {
  name: 'Order',
  data () {
    return {
      orderId: '',
      currentPage: 1,
      sum: 0,
      OrderList: []
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      userId: state => state.userId,
      showDetail: state => state.showDetail
    })
  },
  created () {
    this.changeShowDetail(false)
    this.getOrderList()
  },
  components: {
    OrderDetail
  },
  methods: {
    ...mapActions([
      'changeShowDetail'
    ]),
    handleSelectionChange () {
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
      this.getOrderList()
    },
    Receipt () {
    },
    changeIfOrderDetail () {
      this.changeShowDetail(false)
      this.getOrderList()
    },
    ToDetail (idx, row) {
      this.changeShowDetail(true)
      this.orderId = row.id
    },
    getOrderList () {
      this.send({
        name: '/orderController/list/' + this.currentPage + '/10/1' + '/&appointId=' + this.userId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          this.OrderList = res.data.data
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Order{
  background: #fff;
  margin: 20px 20px 50px 20px;
  padding: 20px;
}
</style>
