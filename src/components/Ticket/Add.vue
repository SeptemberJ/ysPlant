<template>
  <div class="AddTicket">
    <el-row class="AddMain">
      <el-col :span="24">
        <el-row class="TextAlignL PaddingL_10 MarginB_10 ColorRed Bold">
          <el-col :span="8">总金额： {{sumPrice}} ¥</el-col>
          <el-col :span="8">税额： {{sumTax}} ¥</el-col>
          <el-col :span="8">税后金额： {{sumPrice - sumTax}} ¥</el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-table
          ref="multipleTable"
          :data="orderList"
          height="300"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="order_no"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="ffee"
            label="金额(¥)"
            width="120px">
          </el-table-column>
          <el-table-column
            prop="ftax"
            label="税额(¥)"
            width="120px">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="TextAlignC MarginT_40">
        <el-button type="primary" :loading="ifLoading" @click="submit">确认开票</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AddTicket',
  data () {
    return {
      ifLoading: false,
      sumPrice: 0,
      sumTax: 0,
      sumTaxL: 0,
      orderList: [],
      choosedOrder: [],
      invoiceentry: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userCode: state => state.userCode
    })
  },
  created () {
    this.getOrderList()
  },
  watch: {
    sumPrice: function (newVal) {
      this.sumTax = newVal * 0.11
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.invoiceentry = []
      this.sumPrice = 0
      this.sumTaxL = 0
      this.choosedOrder = val
      val.map(item => {
        this.sumPrice += item.ffee
        this.sumTaxL += item.ftax
        this.invoiceentry.push({
          famount: 1,
          fid: '',
          fmodel: '',
          fmoney: item.ffee - item.ftax,
          fname: '运费',
          forderid: item.id,
          forderno: item.order_no,
          fprice: item.ffee - item.ftax,
          frate: 11,
          ftaxmoney: item.ftax,
          funit: '次',
          id: ''
        })
      })
    },
    // 开票
    submit () {
      if (this.choosedOrder.length === 0) {
        this.$message({
          message: '请选择需要开票的订单！',
          type: 'warning'
        })
        return false
      }
      let DATA = {
        fbillno: '',
        fbuyerid: this.userId,
        fdate: '',
        fexpress: '',
        fexpressno: '',
        fmoney: this.sumPrice - this.sumTax,
        fsaleid: '',
        fstatus: '',
        ftax: this.sumTax,
        ftotal: this.sumPrice,
        fujian: '',
        id: '',
        invoiceentryList: this.invoiceentry
      }
      // 提交
      this.send({
        name: '/invoiceController',
        method: 'POST',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '开票申请成功！',
            type: 'success'
          })
          this.ifLoading = false
          this.$emit('ToggleDialogAdd')
          this.$emit('FreshList')
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
          this.ifLoading = false
        }
      }).catch((res) => {
        console.log(res)
        this.ifLoading = false
      })
    },
    // 获取未开票订单
    getOrderList () {
      this.send({
        name: '/orderController/orderBystatus?id=' + this.userCode + '&status=7',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.orderList = res.data.orderList.map(item => {
            item.ftax = item.ffee * 0.11
            return item
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
    }
  }
}
</script>

<style lang="less" scoped>
.AddTicket{
  background: #fff;
  padding: 0 20px;
}
</style>
