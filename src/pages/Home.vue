<template>
  <div class="HomePage">
    <el-row>
      <el-col :span="24">
        <el-row style="background: #65c294;">
          <el-col :span="3" class="siderMenu">
            <el-menu
              :default-active="siderIdx"
              background-color="#65c294"
              text-color="#fff"
              class="el-menu-vertical-demo"
              @select="changeSideMenu"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="fa fa-truck"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" v-if="userRole == 2 || userRole == 5 || userRole == 3">订单列表</el-menu-item>
                  <!-- 货主add -->
                  <el-submenu index="1-2" v-if="userRole == 2 || userRole == 5  || userRole == 3">
                    <template slot="title">订单新增</template>
                    <el-menu-item index="1-2-1">普货</el-menu-item>
                    <el-menu-item index="1-2-2">危险品</el-menu-item>
                    <el-menu-item index="1-2-3">冷藏品</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="1-7" v-if="userRole == 2 || userRole == 5 || userRole == 3">车辆查询</el-menu-item>
                  <!-- 承运商add -->
                  <el-menu-item index="1-3" v-if="userRole == 1 || userRole == 4">订单查询</el-menu-item>
                  <el-menu-item index="1-4" v-if="userRole == 1 || userRole == 4">指定接单</el-menu-item>
                  <el-menu-item index="1-6" v-if="userRole == 1 || userRole == 4">未指定接单</el-menu-item>
                  <el-menu-item index="1-5" v-if="userRole == 1 || userRole == 4">实况查询</el-menu-item>
                  <!-- <el-menu-item index="1-5" v-if="userRole == 2 || userRole == 5  || userRole == 3">实况查询</el-menu-item> -->
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2" v-if="userRole == 1 || userRole == 2 || userRole == 4">
                <i class="fa fa-users"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <!-- <el-menu-item index="4" v-if="userRole == 1 || userRole == 4">
                <i class="fa fa-ticket"></i>
                <span slot="title">开票订单</span>
              </el-menu-item> -->
              <el-submenu index="3" v-if="userRole == 1 || userRole == 2 || userRole == 3">
                <template slot="title">
                  <i class="fa fa-user-circle-o"></i>
                  <span>个人中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">账户信息</el-menu-item>
                  <el-menu-item index="3-2">密码修改</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="21" class="mainContent">
            <!-- 面包屑 -->
            <div class="moduleTit">
              <el-breadcrumb separator="/">
                <!-- 订单管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '1' || siderIdx == '1-1' || siderIdx == '1-2' || siderIdx == '1-3' || siderIdx == '1-4' || siderIdx == '1-6' || siderIdx == '1-5'">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-1' && (userRole == 2 || userRole == 5 || userRole == 3)"><span @click="backOrderList" class="CursorPointer">订单列表</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-7'">车辆查询</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-5'">实况查询</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-4'"><span @click="backOrderList" class="CursorPointer">指定接单</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-6'"><span @click="backOrderList" class="CursorPointer">未指定接单</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-3' && (userRole == 1 || userRole == 4)"><span @click="backOrderList" class="CursorPointer">订单查询</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="ifSJOrderSearch && siderIdx == '1-3' && (userRole == 1 || userRole == 4)"><span @click="backSjList" class="CursorPointer">司机订单列表</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-2-1' || siderIdx == '1-2-2' || siderIdx == '1-2-3'">{{siderIdx == '1-2-1' ? '普货' : (siderIdx == '1-2-2' ? '危险品' : '冷藏品')}}订单新增</el-breadcrumb-item>
                <el-breadcrumb-item v-if="showDetail && (siderIdx == '1-1' || siderIdx == '1-3' || siderIdx == '1-4')">订单详情</el-breadcrumb-item>
                <!-- <el-breadcrumb-item v-if="siderIdx == '1-5' && (userRole == 2 || userRole == 5 || userRole == 3)">实况查询</el-breadcrumb-item> -->
                <!-- 用户管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '2'">用户管理</el-breadcrumb-item>
                <!-- 个人中心导航 -->
                <el-breadcrumb-item v-if="siderIdx == '3' || siderIdx == '3-1' || siderIdx == '3-2'">个人中心</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '3-1'">账户信息</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '3-2'">密码修改</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <!-- mainContent -->
            <section>
              <Order v-if="siderIdx == '1-1'"/>
              <AddOrder v-if="siderIdx == '1-2-1' || siderIdx == '1-2-2' || siderIdx == '1-2-3'" :orderType="siderIdx"/>
              <OrderC v-if="siderIdx == '1-3'"/>
              <Receipt v-if="siderIdx == '1-4'"/>
              <Receipt v-if="siderIdx == '1-6'"/>
              <Map v-if="siderIdx == '1-5'"/>
              <Ticket v-if="siderIdx == '4'"/>
              <User v-if="siderIdx == '2'"/>
              <Center v-if="siderIdx == '3-1'"/>
              <Safe v-if="siderIdx == '3-2'"/>
              <Car v-if="siderIdx == '1-7'"/>
            </section>
            <div class="CopyrightBar">
              ©2019 上海旺策尔信息科技有限公司  版权所有
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Order from '../components/Order/Order.vue'
import Receipt from '../components/OrderC/Receipt.vue'
import Map from '../components/Map/Map.vue'
import OrderC from '../components/OrderC/Order.vue'
import AddOrder from '../components/Order/AddOrder.vue'
import Ticket from '../components/Ticket/Ticket.vue'
import Center from '../components/Center.vue'
import User from '../components/User.vue'
import Safe from '../components/Safe.vue'
import Car from '../components/Car.vue'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    User,
    Order,
    AddOrder,
    Receipt,
    Map,
    OrderC,
    Ticket,
    Center,
    Safe,
    Car
  },
  computed: {
    ...mapState({
      locationIdx: state => state.locationIdx,
      siderIdx: state => state.siderIdx,
      addOrderType: state => state.addOrderType,
      showDetail: state => state.showDetail,
      showMap: state => state.showMap,
      ifSJOrderSearch: state => state.ifSJOrderSearch,
      userRole: state => state.userRole // 1-承运商主 2-货主主 4-承运商子 5-货主子 3-个人 searchOrderId: state => state.searchOrderId,
    })
  },
  methods: {
    ...mapActions([
      'changeSiderIdx',
      'changeAddOrderType',
      'changeShowDetail',
      'changeShowMap',
      'changeIfSJOrderSearch'
    ]),
    backOrderList () {
      this.changeShowDetail(false)
      this.changeShowMap(false)
      this.changeIfSJOrderSearch(false)
    },
    // 订单查询司机列表
    backSjList () {
      this.changeIfSJOrderSearch(true)
      this.changeShowDetail(false)
      this.changeShowMap(false)
    },
    changeSideMenu (index, keyPath) {
      // console.log(index)
      // console.log(keyPath)
      let levelCount = keyPath.length
      if (levelCount > 1) {
        this.changeSiderIdx(keyPath[levelCount - 1])
        this.changeIfSJOrderSearch(false)
        this.changeShowDetail(false)
        this.changeShowMap(false)
        // if (levelCount === 3) {
        //   this.changeAddOrderType(index)
        // }
      } else {
        this.changeSiderIdx(keyPath[0])
        this.changeIfSJOrderSearch(false)
        this.changeShowDetail(false)
        this.changeShowMap(false)
      }
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.HomePage{
  position: relative;
  width: 100%;
  /*min-height: 500px;*/
  display: block;
  .siderMenu{
    overflow: hidden;
  }
  .mainContent{
    position: relative !important;
    min-height: 850px;
    background: #f0f2f5;
    border-left: solid 1px #e6e6e6;
    .moduleTit{
      width: 100%;
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
      /*span{
        width: 100%;
        height: 80px;
        font-size: 20px;
        line-height: 80px;
        color: #000;
        padding: 0 20px;
        display: block;
        text-align: left;
      }
      */
    }
    .CopyrightBar{
      width: 100%;
      height: 40px;
      background: #f0f2f5;
      line-height: 40px;
      position: absolute;
      left: 0;
      bottom: 0px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
}
.el-breadcrumb{
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
</style>
