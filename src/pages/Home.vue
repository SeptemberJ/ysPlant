<template>
  <div class="HomePage">
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="4" class="siderMenu">
            <el-menu
              :default-active="siderIdx"
              class="el-menu-vertical-demo"
              @select="changeSideMenu"
              @open="handleOpen"
              @close="handleClose">
              <!-- <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu> -->
              <el-menu-item index="1">
                <i class="fa fa-users"></i>
                <!-- <i class="el-icon-menu"></i> -->
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="fa fa-truck"></i>
                <span slot="title">运单管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="fa fa-user-circle-o"></i>
                  <span>个人中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">基本信息</el-menu-item>
                  <el-menu-item index="3-2">密码修改</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- <el-menu-item index="3">
                <i class="fa fa-user-circle-o"></i>
                <span slot="title">个人中心</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
          <el-col :span="20" class="mainContent">
            <div class="moduleTit">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-if="siderIdx == '1'">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '2'">运单管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '3' || siderIdx == '3-1' || siderIdx == '3-2'">个人中心</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>{{curSideMenu == '1' ? '用户管理' : (curSideMenu == '2' ? '运单管理' : '个人中心')}}</el-breadcrumb-item> -->
                <el-breadcrumb-item v-if="siderIdx == '3-1'">基本信息</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '3-2'">密码修改</el-breadcrumb-item>
              </el-breadcrumb>
              <!-- <span>{{curSideMenu == '1' ? '用户管理' : (curSideMenu == '2' ? '运单管理' : '个人中心')}}</span> -->
            </div>
            <section>
              <User v-if="siderIdx == '1'"/>
              <Order v-if="siderIdx == '2'"/>
              <Center v-if="siderIdx == '3-1'"/>
              <Safe v-if="siderIdx == '3-2'"/>
            </section>
            <div class="CopyrightBar">
              ©2019 无车承运 版权所有
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Order from '../components/Order.vue'
import Center from '../components/Center.vue'
import User from '../components/User.vue'
import Safe from '../components/Safe.vue'
export default {
  name: 'Home',
  data () {
    return {
      curSideMenu: '1'
    }
  },
  components: {
    User,
    Order,
    Center,
    Safe
  },
  computed: {
    ...mapState({
      locationIdx: state => state.locationIdx,
      siderIdx: state => state.siderIdx
    })
  },
  methods: {
    ...mapActions([
      'changeSiderIdx'
    ]),
    changeSideMenu (index, keyPath) {
      if (keyPath.length > 1) {
        this.changeSiderIdx(keyPath[1])
        // this.curSideMenu = keyPath[1]
      } else {
        this.changeSiderIdx(keyPath[0])
        // this.curSideMenu = keyPath[0]
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
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
      height: 80px;
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
  height: 80px;
  line-height: 80px;
  padding-left: 20px;
}
</style>
