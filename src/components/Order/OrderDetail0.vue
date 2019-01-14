<template>
  <div class="OrderDetail">
    <el-row class="">
      <el-col :span="9" class="DetailInfo">
        <h4>运单号：{{Info.orderNo}}</h4>
      </el-col>
      <el-col :span="9" class="DetailInfo">
        <h4>发货时间：{{Info.date}}</h4>
      </el-col>
      <el-col :span="6" class="DetailInfo">
        <h4>件数：{{Info.amount}}</h4>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="DetailInfo">
        <h4>始发地： {{Info.departure}}</h4>
        <span>始发网点：{{Info.startNet}}</span>
        <span>网点地址：{{Info.startNetAdr}}</span>
        <span>网点电话：{{Info.startNetTel}}</span>
      </el-col>
      <el-col :span="9" class="DetailInfo">
        <h4>到达地 : {{Info.destination}}</h4>
        <span>到达网点：{{Info.endNet}}</span>
        <span>网点地址：{{Info.endNetAdr}}</span>
        <span>网点电话：{{Info.endNetTel}}</span>
      </el-col>
      <el-col :span="6" class="DetailInfo">
        <h4>货物信息</h4>
        <span>体积：{{Info.volume}}</span>
        <span>重量：{{Info.weight}}</span>
        <span>提货方式：{{Info.getWay}}</span>
      </el-col>
    </el-row>
    <el-row class="MarginT_80 MarginB_40">
      <el-steps :active="Info.status">
        <el-step title="揽货成功" icon="el-icon-tickets"></el-step>
        <el-step title="货物发车" icon="el-icon-news"></el-step>
        <el-step title="等待收货" icon="el-icon-time"></el-step>
        <el-step title="货物签收" icon="el-icon-edit-outline"></el-step>
      </el-steps>
    </el-row>
    <el-row class="MarginTB_20">
      <el-steps direction="vertical" :active="0" space="20">
        <el-step v-for="(logistic, idx) in Info.logistics" :key="idx" icon="el-icon-circle-check-outline" :title="logistic.tip" :description="logistic.date"></el-step>
      </el-steps>
    </el-row>
    <el-row class="MarginT_40 TextAlignC">
      <el-button @click="backOrderList" style="width: 100px;">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import {send} from '../../util/send'
export default {
  name: 'OrderDetail',
  props: ['orderId'],
  data () {
    return {
      Info: {
        id: 'j9wdw00k',
        orderNo: 'ORSCSC123',
        date: '2018-12-28',
        name: '江浙小吃、小吃零食',
        amount: '50',
        departure: '山东省 潍坊',
        destination: '贵州省苗族自治州',
        place: '山东省 潍坊 → 贵州省 黔西南布依族苗族自治州',
        startNet: '平顶山市湛河区网点',
        startNetAdr: '河南平顶山神马大道中段',
        startNetTel: '13937537587',
        endNet: '潍坊市高密市网点',
        endNetAdr: '河南平顶山神马大道中段',
        endNetTel: '13937537587',
        volume: '3立方',
        weight: '20 公斤',
        getWay: '自提',
        status: 3,
        logistics: [
          {
            date: '2018-11-26 15:05:56',
            tip: '已签收'
          },
          {
            date: '2018-11-25 15:05:56',
            tip: '货物已到达【宁波市余姚市分拨中心】'
          },
          {
            date: '2018-11-24 15:05:56',
            tip: '货物已由【金华市义乌市网点】承运，运单号【123】'
          }
        ]
      }
    }
  },
  created () {
    this.getOrderDetail()
  },
  methods: {
    backOrderList () {
      this.$emit('toggleOrderDetail')
    },
    getOrderDetail () {
      send({
        name: '/orderController/' + this.orderId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          
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
.OrderDetail{
  background: #fff;
  margin: 20px 20px 60px 20px;
  padding: 20px;
  text-align: left;
  .DetailInfo{
    padding: 0 20px;
    span{
      display: block;
      padding-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
