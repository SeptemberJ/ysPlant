<template>
  <div class="Order">
    <el-row v-if="!showDetail && !showMap" style="background: #fff;padding: 20px;">
      <!-- <el-col :span="24" class="BgWhite MarginT_10">
        <el-form :inline="true" :model="formCondition" class="demo-form-inline searchForm">
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item prop="fprovince" label="发货省">
                <el-select v-model="formCondition.fprovince" size="mini" placeholder="请选择" @change="changeFprovince" style="width: 120px;">
                  <el-option
                    v-for="(fprovince, idx) in fprovinceList"
                    :key="idx"
                    :label="fprovince.name"
                    :value="fprovince.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item prop="fcity" label="发货市">
                <el-select v-model="formCondition.fcity" size="mini" placeholder="请选择" @change="changeFcity" style="width: 120px;">
                  <el-option
                    v-for="(fcity, idx) in fcityList"
                    :key="idx"
                    :label="fcity.name"
                    :value="fcity.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item prop="farea" label="发货区">
                <el-select v-model="formCondition.farea" size="mini" placeholder="请选择" @change="changeFarea" style="width: 120px;">
                  <el-option
                    v-for="(farea, idx) in fareaList"
                    :key="idx"
                    :label="farea.name"
                    :value="farea.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item prop="sprovince" label="收货省">
                <el-select v-model="formCondition.sprovince" size="mini" placeholder="请选择" @change="changeSprovince" style="width: 120px;">
                  <el-option
                    v-for="(sprovince, idx) in sprovinceList"
                    :key="idx"
                    :label="sprovince.name"
                    :value="sprovince.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item prop="scity" label="收货市">
                <el-select v-model="formCondition.scity" size="mini" placeholder="请选择" @change="changeScity" style="width: 120px;">
                  <el-option
                    v-for="(scity, idx) in scityList"
                    :key="idx"
                    :label="scity.name"
                    :value="scity.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item prop="sarea" label="收货区">
                <el-select v-model="formCondition.sarea" size="mini" placeholder="请选择" @change="changeSarea" style="width: 120px;">
                  <el-option
                    v-for="(sarea, idx) in sareaList"
                    :key="idx"
                    :label="sarea.name"
                    :value="sarea.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item prop="sarea" label="货物类型">
                <el-select v-model="formCondition.goodsName" size="mini" placeholder="请选择" style="width: 120px">
                  <el-option
                    v-for="(goodsType, idx) in goodsTypeList"
                    :key="idx"
                    :label="goodsType.name"
                    :value="goodsType.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="MarginB_20">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="success" size="mini" icon="el-icon-printer" @click="exportExcell">导出</el-button>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 10px; border-bottom: 1px dashed #ccc;">
      </el-col> -->
      <el-col :span="24"  class="MarginT_20 MarginB_20">
        <el-table
          id="rebateSetTable"
          ref="multipleTable"
          :data="orderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="order_no"
            label="订单号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="订单状态"
            width="100"
            >
            <template slot-scope="scope">
              <span>{{scope.row.fstatusTxt}}</span>
              <!-- <span>{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '已撤单' : (scope.row.fstatus == 3 ? '运输中' : (scope.row.fstatus == 4 ? '已签收' : '已取消'))))}}</span> -->
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="ffee"
            label="预估价"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="goods_name"
            label="货物类型"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            prop="origin"
            label="发货地"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="destination"
            label="收货地"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="300"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.fstatus != 0"
                @click="handleCancel(scope.$index, scope.row)">取消
              </el-button>
              <el-button
                size="mini"
                type="warning"
                :disabled="scope.row.fstatus != 0"
                @click="getOfferList(scope.$index, scope.row)">报价
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
              <el-button
                size="mini"
                type="success"
                :disabled="scope.row.fstatus == 0 || scope.row.fstatus == 1 || scope.row.fstatus == 2"
                @click="viewingPath(scope.$index, scope.row)">轨迹
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="orderList.length > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 报价列表 -->
    <el-dialog title="报价列表" :visible.sync="dialogFormVisible" width="650px">
      <el-row>
        <el-table
          id="rebateSetTable"
          ref="multipleTable"
          height="250"
          :data="offerList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="fname"
            width="100"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="ffee"
            width="100"
            label="报价(¥)">
          </el-table-column>
          <el-table-column
            prop="fmobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="fnote"
            label="备注">
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="100"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="sureOffer(scope.$index, scope.row)">接受报价
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <OrderDetail v-if="showDetail && !showMap" @toggleOrderDetail='changeIfOrderDetail'/>
    <Map v-if="!showDetail && showMap"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
import {secondToFormat} from '../../util/utils'
import OrderDetail from './OrderDetail.vue'
import Map from '../Map/Map.vue'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// import expandRow from './TableExpand.vue'
// import JsonExcel from 'vue-json-to-excel'
export default {
  name: 'Order',
  data () {
    return {
      dialogFormVisible: false,
      loading: false,
      currentPage: 1,
      sum: 0,
      formCondition: {
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: '',
        goodsName: ''
        // orderNo: '',
        // startDate: '',
        // endDate: ''
      },
      fprovinceList: [],
      fcityList: [],
      fareaList: [],
      sprovinceList: [],
      scityList: [],
      sareaList: [],
      fProvincePid: 1,
      fcityPid: '',
      fareaPid: '',
      sProvincePid: 1,
      scityPid: '',
      sareaPid: '',
      //
      orderList: [],
      carTypeList: [],
      goodsTypeList: [],
      selectedOrder: [],
      // jsonFields: {
      //   order_no: 'String',
      //   fstatusTxt: 'String',
      //   goods_name: 'String',
      //   fh_name: 'String',
      //   fh_telephone: 'String',
      //   origin: 'String',
      //   fh_address: 'String',
      //   sh_name: 'String',
      //   sh_telephone: 'String',
      //   destination: 'String',
      //   sh_address: 'String',
      //   carType: 'String',
      //   zhTime: 'String',
      //   isFapiao: 'String',
      //   ffee: 'String'
      // },
      // json_meta: [
      //   [{
      //     key: 'charset',
      //     value: 'utf-8'
      //   }]
      // ],
      offerList: []
      // positionData: [{ID: '00', Name: '123'}]
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      showDetail: state => state.showDetail,
      showMap: state => state.showMap,
      searchOrderId: state => state.searchOrderId
    })
  },
  created () {
    this.getOrderList()
    this.getCarType()
    this.getGoodsType()
    this.getProvince()
  },
  components: {
    OrderDetail,
    Map
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeShowMap',
      'changeSearchOrderId'
    ]),
    handleSelectionChange (selection) {
      let tempChoosed = []
      selection.map((Order, idx) => {
        let obj = {
          order_no: Order.order_no,
          fstatusTxt: Order.fstatusTxt,
          goods_name: this.checkGoodsType(Order.goods_name),
          fh_name: Order.fh_name,
          fh_telephone: Order.fh_telephone,
          origin: Order.origin,
          fh_address: Order.fh_address,
          sh_name: Order.sh_name,
          sh_telephone: Order.sh_telephone,
          destination: Order.destination,
          sh_address: Order.sh_address,
          carType: this.checkCarType(Order.car_type),
          zhTime: Order.zhDate,
          isFapiao: Order.is_fapiao === '0' ? '不需要' : '需要',
          ffee: Order.ffee
        }
        tempChoosed.push(obj)
      })
      this.selectedOrder = tempChoosed
    },
    changeIfOrderDetail () {
      this.changeShowDetail(false)
      this.getOrderList()
    },
    handleEdit (idx, row) {
      this.changeShowDetail(true)
      this.changeSearchOrderId(row.id)
    },
    // 查看轨迹
    viewingPath (index, row) {
      this.changeShowMap(true)
      localStorage['MapId'] = row.id
      // send({
      //   name: '/orderController/trail/2c979074687943f3016879727bc70001/0',
      //   method: 'GET',
      //   data: {}
      // }).then(res => {
      // }).catch((res) => {
      //   console.log(res)
      // })
    },
    // 查看报价
    getOfferList (idx, row) {
      send({
        name: '/orderController/driverPriceList?order_id=' + row.id,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          this.dialogFormVisible = true
          this.offerList = res.data.driverPriceList
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 确认报价
    sureOffer (idx, row) {
      send({
        name: '/orderController/confirmOrder?driver_id=' + row.driver_id + '&order_id=' + row.order_id + '&ffee=' + row.ffee,
        method: 'GET'
      }).then(res => {
        if (res.data.code === 1) {
          this.dialogFormVisible = false
          this.$message({
            message: '确认成功！',
            type: 'success'
          })
          this.getOrderList()
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    handleCancel (idx, row) {
      this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sureCancel(row.id)
      }).catch(() => {
      })
    },
    sureCancel (id) {
      send({
        name: '/orderController/cancelOrder?id=' + id,
        method: 'POST',
        data: {}
      }).then(res => {
        if (res.data.code === '1' || res.data.code === 1) {
          this.getOrderList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
      this.getOrderList()
    },
    onSubmit () {
      console.log('submit!')
    },
    getOrderList () {
      this.loading = true
      let urlName = ''
      // 主账户
      if (this.userRole === '1' || this.userRole === '2' || this.userRole === '3') {
        urlName = '/orderController/orderList?number=10&page_num=' + this.currentPage + '&main_usercode=' + this.userCode
      }
      // 子账户
      if (this.userRole === '4' || this.userRole === '5') {
        urlName = '/orderController/subOrderList?number=10&page_num=' + this.currentPage + '&sub_usercode=' + this.userCode
      }
      send({
        name: urlName,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          this.sum = res.data.sum_number
          this.orderList = res.data.orderList.map(order => {
            order.zhDate = secondToFormat(order.zh_time.time)
            order.fstatusTxt = (order.fstatus === '0' ? '待接单' : (order.fstatus === '1' ? '已接单' : (order.fstatus === '2' ? '已撤单' : (order.fstatus === '3' ? '运输中' : (order.fstatus === '4' ? '已签收待确认' : (order.fstatus === '5' ? '待付款' : (order.fstatus === '7' ? '已结单' : ('已取消2'))))))))
            return order
            // order.fstatusTxt = (order.fstatus === '0' ? '待接单' : (order.fstatus === '1' ? '已接单' : (order.fstatus === '2' ? '已撤单' : (order.fstatus === '3' ? '运输中' : (order.fstatus === '4' ? '已签收待确认' : (order.fstatus === '5' ? '待付款' : (order.fstatus === '7' ? '已结单' : '已取消')))))))
          })
          // this.orderList = res.data.orderList
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
        this.loading = false
      }).catch((res) => {
        console.log(res)
        this.loading = false
      })
    },
    getGoodsType () {
      send({
        name: '/typeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.goodsTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    checkCarType (carTypeId) {
      let len = this.carTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.carTypeList[i].id === carTypeId) {
          return this.carTypeList[i].typeName
        }
      }
    },
    // 根据货物id返回中文名称
    checkGoodsType (goodsTypeId) {
      let len = this.goodsTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.goodsTypeList[i].id === goodsTypeId) {
          return this.goodsTypeList[i].name
        }
      }
    },
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
    },
    exportExcell () {
      if (this.selectedOrder.length === 0) {
        this.$message({
          message: '请至少选择一条需要导出的记录！',
          type: 'warning'
        })
        return false
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel.js')
        const tHeader = ['订单号', '订单状态', '货物类型', '发货人', '手机号', '发货地', '街道', '发货人', '手机号', '收货地', '街道', '车型', '装货日期', '开具发票', '报价(¥)']
        const filterVal = ['order_no', 'fstatusTxt', 'goods_name', 'fh_name', 'fh_telephone', 'origin', 'fh_address', 'sh_name', 'sh_telephone', 'destination', 'sh_address', 'carType', 'zhTime', 'isFapiao', 'ffee']
        const data = this.formatJson(filterVal, this.selectedOrder)
        exportJsonToExcel(tHeader, data, '订单')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // order search module
    // 改变发货地省
    changeFprovince (id) {
      this.getCity(id, 'fcityList')
      this.formCondition.fcity = ''
      this.formCondition.farea = ''
    },
    // 改变发货地市
    changeFcity (id) {
      this.getArea(id, 'fareaList')
      this.formCondition.farea = ''
    },
    // 改变发货地区
    changeFarea (id) {
    },
    // 改变收货地省
    changeSprovince (id) {
      this.getCity(id, 'scityList')
      this.formCondition.scity = ''
      this.formCondition.sarea = ''
    },
    // 改变收货地市
    changeScity (id) {
      this.getArea(id, 'sareaList')
      this.formCondition.sarea = ''
    },
    // 改变收货地区
    changeSarea (id) {
    },
    // 获取省下拉
    getProvince () {
      send({
        name: '/registerDriverController/regionSelect?pid=' + this.fProvincePid,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.fprovinceList = res.data.data
          this.sprovinceList = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取市下拉
    getCity (id, property) {
      send({
        name: '/registerDriverController/regionSelect?pid=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this[property] = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取区下拉
    getArea (id, property) {
      send({
        name: '/registerDriverController/regionSelect?pid=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this[property] = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Order{
  margin: 20px 20px 60px 20px;
}
</style>
