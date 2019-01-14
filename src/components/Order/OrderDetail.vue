<template>
  <div class="OrderDetail">
    <el-form ref="formAdd" :model="formAdd" :rules="AddRules" label-width="120px" label-position="left">
      <!-- fh -->
      <el-card class="box-card">
        <div slot="header" class="clearfix TextAlignL">
          <span>发货人信息</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fhName" label="发货人">
                <el-input v-model="formAdd.fhName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="fhTelephone" label="发货人手机">
                <el-input v-model="formAdd.fhTelephone" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="fhAddress" label="发货人地址">
            <el-input v-model="formAdd.fhAddress" clearable></el-input>
          </el-form-item>
        </div>
      </el-card>
      <!-- sh -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>收货人信息</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="shName" label="收货人">
                <el-input v-model="formAdd.shName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="shTelephone" label="收货人手机">
                <el-input v-model="formAdd.shTelephone" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="shArea" label="收货地">
            <el-input v-model="formAdd.shArea" clearable></el-input>
          </el-form-item>
          <el-form-item prop="shAddress" label="收货人地址">
            <el-input v-model="formAdd.shAddress" clearable></el-input>
          </el-form-item>
        </div>
      </el-card>
      <!-- goods -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>货物信息</span>
        </div>
        <div>
          <p v-if="formAdd.orderGoodsList.length == 0" class="ColorWarn MarginTB_20">请添加货物信息</p>
          <el-row v-for="(Goods, idx) in formAdd.orderGoodsList" :key="idx">
            <el-col :span="8">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsName'" :rules="AddRules.goodsName" label="货物名称">
                <el-input v-model="Goods.goodsName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsSpace'" :rules="AddRules.goodsSpace"  label="货物面积(㎡)">
                <el-input v-model="Goods.goodsSpace" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsWeight'" :rules="AddRules.goodsWeight"  label="货物数量(kg)">
                <el-input v-model="Goods.goodsWeight" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" :offset="0">
              <el-button icon="el-icon-delete" style="border: 0px;" @click="deleteOneLine(idx)"></el-button>
            </el-col>
          </el-row>
          <el-button icon="el-icon-plus" style="width: 100%;border:1px dashed #dcdfe6" @click="addOneLine">添加</el-button>
        </div>
      </el-card>
      <!-- goods -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>其它信息</span>
        </div>
        <div>
          <!-- goods -->
          <el-form-item prop="goodsName" label="货物类型">
            <el-input v-model="formAdd.goodsName" clearable></el-input>
          </el-form-item>
          <!-- car -->
          <el-form-item prop="carType" label="车型">
            <el-input v-model="formAdd.carType" clearable></el-input>
          </el-form-item>
          <!-- time -->
          <el-form-item prop="zhTime" label="装货日期">
            <el-date-picker type="date" placeholder="选择装货日期" v-model="formAdd.zhTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="开具发票" prop="isFapiao">
            <el-radio-group v-model="formAdd.isFapiao" style="float: left">
              <el-radio label="0" border>不需要</el-radio>
              <el-radio label="1" border>需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-card>
      <!-- bt -->
      <el-row v-if="formAdd.fstatus == 0">
        <el-col :span="12" class="TextAlignC" >
          <el-button type="primary" :loading="ifLoading" @click="onSubmit('formAdd')">保存修改</el-button>
        </el-col>
        <el-col :span="12" class="TextAlignC">
          <el-button @click="backOrderList" style="width: 100px;">返回</el-button>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24" class="TextAlignC">
          <el-button @click="backOrderList" style="width: 100px;">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
export default {
  name: 'AddOrder',
  props: ['orderId'],
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      ifLoading: false,
      formAdd: {
        id: '',
        fstatus: '',
        fcheck: '',
        fmainId: '', // 主账号code
        fsubId: '', // 子账号code
        fhName: '',
        fhTelephone: '',
        fh: '', // 发货地id
        fhAddress: '',
        shName: '',
        shTelephone: '',
        sh: '', // 收货地id
        shArea: '',
        shAddress: '',
        carType: '',
        zhTime: '',
        goodsName: '',
        orderGoodsList: [],
        isFapiao: '0' // 0-不要 1-要
      },
      AddRules: {
        fhName: [
          { required: true, message: '请输入发货人!', trigger: 'blur' }
        ],
        fhTelephone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        fhAddress: [
          { required: true, message: '请输入发货人地址!', trigger: 'blur' }
        ],
        shName: [
          { required: true, message: '请输入收货人!', trigger: 'blur' }
        ],
        shTelephone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        shArea: [
          { required: true, message: '请输入收货地!', trigger: 'blur' }
        ],
        shAddress: [
          { required: true, message: '请输入收货人地址!', trigger: 'blur' }
        ],
        carType: [
          { required: true, message: '请输入车型!', trigger: 'blur' }
        ],
        zhTime: [
          { required: true, message: '请选择装货日期!', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '请输入货物名称!', trigger: 'blur' }
        ],
        goodsSpace: [
          { required: true, message: '请输入货物面积!', trigger: 'blur' }
        ],
        goodsWeight: [
          { required: true, message: '请输入货物数量!', trigger: 'blur' }
        ],
        isFapiao: [
          { required: true, message: '请选择是否需要开具发票!', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode
    })
  },
  created () {
    this.getOrderDetail()
  },
  components: {
  },
  methods: {
    ...mapActions([
      'changeSiderIdx'
    ]),
    addOneLine () {
      let tempGoods = {
        goodsName: '',
        goodsSpace: '',
        goodsWeight: '',
        id: '',
        orderId: ''
      }
      this.formAdd.orderGoodsList.push(tempGoods)
    },
    deleteOneLine (idx) {
      this.formAdd.orderGoodsList.splice(idx, 1)
    },
    onSubmit (formName) {
      if (this.formAdd.orderGoodsList.length === 0) {
        this.$message({
          message: '请至少添加一行货物信息！',
          type: 'warning'
        })
        return false
      }
      this.ifLoading = true
      // if (this.userRole === '1' || this.userRole === '2') {
      //   this.formAdd.fmainId = this.userCode
      // }
      // if (this.userRole === '4' || this.userRole === '5') {
      //   this.formAdd.fsubId = this.userCode
      // }
      // console.log(this.formAdd)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureAdd()
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    sureAdd () {
      let DATA = {
        id: this.formAdd.id,
        fstatus: this.formAdd.fstatus,
        fcheck: this.formAdd.fcheck,
        fmainId: this.formAdd.fmainId,
        fsubId: this.formAdd.fsubId,
        fhName: this.formAdd.fhName,
        fhTelephone: this.formAdd.fhTelephone,
        fh: this.formAdd.fh,
        fhAddress: this.formAdd.fhAddress,
        shName: this.formAdd.shName,
        shTelephone: this.formAdd.shTelephone,
        sh: this.formAdd.sh,
        shArea: this.formAdd.shArea,
        shAddress: this.formAdd.shAddress,
        carType: this.formAdd.carType,
        zhTime: this.formAdd.zhTime,
        goodsName: this.formAdd.goodsName,
        orderGoodsList: this.formAdd.orderGoodsList,
        isFapiao: this.formAdd.isFapiao
      }

      send({
        name: '/orderController/' + this.orderId,
        method: 'PUT',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '运单修改成功！',
            type: 'success'
          })
          this.ifLoading = false
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
    clearDataABack () {
      // clear data
      this.formAdd = {
        id: '',
        fstatus: '0',
        fcheck: '0',
        fmainId: '',
        fsubId: '',
        fhName: '',
        fhTelephone: '',
        fh: '',
        fhAddress: '',
        shName: '',
        shTelephone: '',
        sh: '',
        shArea: '',
        shAddress: '',
        carType: '',
        zhTime: '',
        goodsName: '',
        orderGoodsList: [
          {
            goodsName: '',
            goodsSpace: '',
            goodsWeight: '',
            id: '',
            orderId: ''
          }
        ],
        isFapiao: 0
      }
      // tolist
      this.changeSiderIdx('1-1')
    },
    backOrderList () {
      this.$emit('toggleOrderDetail')
    },
    getOrderDetail () {
      send({
        name: '/orderController/' + this.orderId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          let temp = res.data.data
          // temp.zhTime = new Date(res.data.data.zh_time)
          // temp.orderGoodsList = res.data.data.ordergoods
          // temp.carType = res.data.data.car_type
          // temp.fmainId = res.data.data.fmain_id
          // temp.fsubId = res.data.data.fsub_id
          // temp.goodsName = res.data.data.goods_name
          // temp.fhName = res.data.data.fh_name
          // temp.fhTelephone = res.data.data.fh_telephone
          // temp.fhAddress = res.data.data.fh_address
          // temp.shAddress = res.data.data.sh_address
          // temp.shArea = res.data.data.sh_area
          // temp.shName = res.data.data.sh_name
          // temp.shTelephone = res.data.data.sh_telephone
          // temp.isFapiao = res.data.data.is_fapiao
          this.formAdd = temp
          console.log(this.formAdd)
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
  margin: 20px 20px 60px 20px;
}
</style>
