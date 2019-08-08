<template>
  <div class="AddTicket">
    <el-row class="AddMain">
      <el-col :span="6" class="TextAlignL MarginB_20 ColorRed Bold">
        <span style="margin-right: 10px;padding-left: 10px;">税率</span>
        <!-- <el-select v-model="rateIdx" placeholder="税率" size="mini" style="width: 100px;">
          <el-option
            v-for="(rate, idx) in rateList"
            :key="idx"
            :label="rate.name"
            :value="rate.code">
          </el-option>
        </el-select> -->
        <span style="padding-left: 5px;">9 %</span>
      </el-col>
      <el-col :span="6" class="TextAlignL MarginB_20 ColorRed Bold">
        <span style="margin-right: 10px;padding-left: 10px;">税率折扣</span>
        <span style="padding-left: 5px;">{{userFrate}} %</span>
      </el-col>
      <el-col :span="6" class="TextAlignL MarginB_20 ColorRed Bold">
        <span style="margin-right: 10px;padding-left: 10px;">手续费</span>
        <span style="padding-left: 5px;">{{serviceCharge}} ¥</span>
      </el-col>
      <el-col :span="24">
        <el-row class="TextAlignL PaddingL_10 MarginB_10 ColorRed Bold">
          <el-col :span="6">总金额： {{sumPrice}} ¥</el-col>
          <el-col :span="6">税额： {{sumTax}} ¥</el-col>
          <el-col :span="7">税后金额： {{sumPrice - sumTax}} ¥</el-col>
          <el-col :span="5">结算税额： {{sumPrice * userFrate / 100}} ¥</el-col>
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
            label="订单金额(¥)">
          </el-table-column>
          <!-- <el-table-column
            prop="ftax"
            label="税额">
          </el-table-column>
          <el-table-column
            prop="ftax1"
            label="结算税额">
          </el-table-column> -->
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
      rateIdx: '0',
      serviceCharge: 2, // 手续费
      rateList: [{code: '0', name: '9'}],
      orderList: [],
      choosedOrder: [],
      invoiceentry: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userCode: state => state.userCode,
      userFrate: state => state.userFrate,
      userBalance: state => state.userBalance
    })
  },
  created () {
    this.getOrderList()
    // this.getRateList()
  },
  watch: {
    sumPrice: function (newVal) {
      this.sumTax = newVal * (this.rateList[this.rateIdx].name) / 100
    },
    rateIdx: function (newVal) {
      this.sumTax = this.sumPrice * (this.rateList[newVal].name) / 100
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
          frate: this.rateList[this.rateIdx].name,
          ftaxmoney: item.ftax,
          ftax1: item.ffee * this.userFrate / 100, // 结算税额
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
      // 超出账户余额
      if (this.userBalance < (this.sumTax + this.serviceCharge)) {
        this.$message({
          message: '对不起，您的开票申请所产生的税额和手续费总额超出了账户余额！',
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
        ftaxrate: this.rateList[this.rateIdx].name,
        fee: this.serviceCharge,
        ftax: this.sumTax,
        ftotal: this.sumPrice,
        fmoney: this.sumPrice - this.sumTax,
        ftax1: this.sumPrice * this.userFrate / 100, // 结算税额
        fujian: '',
        id: '',
        fsaleid: '',
        fstatus: '',
        invoiceentryList: this.invoiceentry
      }
      // console.log(DATA)
      // 提交开票申请
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
    // 税率
    getRateList () {
      this.send({
        name: '/invoiceController/rate',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.rateList = res.data.data
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
    // 获取未开票订单
    getOrderList () {
      this.send({
        name: '/orderController/orderBystatus?id=' + this.userCode + '&status=7',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.orderList = res.data.data.map(item => {
            item.ftax = item.ffee * (this.rateList[this.rateIdx].name / 100)
            item.ftax1 = item.ftax * this.userFrate / 100
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
