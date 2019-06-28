<template>
  <div class="Ticket">
    <el-row>
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
       <el-button type="primary" size="mini" icon="el-icon-plus" @click="toAddTicket">申请开票</el-button>
      </el-col>
      <el-col :span="24"  class="MarginT_20 MarginB_20">
        <el-table
          :data="ticketList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            fixed="left"
            width="55">
          </el-table-column>
          <el-table-column
            prop="fstatusTxt"
            label="状态"
            width="80"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fbillno"
            label="申请单号"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="ftotal"
            label="税前金额(¥)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ftax"
            label="税额(¥)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fmoney"
            label="税后金额(¥)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ftax1"
            label="结算税额(¥)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fdate"
            label="开票日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="fexpress"
            label="快递公司"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fexpressno"
            label="快递单号"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.fstatus != 1"
                @click="cancelTicket(scope.$index, scope.row)">撤销
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="ticketList.length > 0">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- add -->
    <el-dialog title="新增开票申请" :visible.sync="ifAdd" width="750px" :close-on-click-modal="false">
      <Add @ToggleDialogAdd="toAddTicket" @FreshList="getTicketList"/>
    </el-dialog>
    <!-- 补充开票信息 -->
    <el-dialog title="补充开票信息" :visible.sync="ifNeedTicketInfo" width="500px" :close-on-click-modal="false">
      <el-form :model="formTicket" :rules="rulesTicket" ref="formTicket" label-width="100px" label-position="left">
        <el-form-item label="联系人" prop="contactPerson">
          <el-input v-model="formTicket.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="formTicket.tel"></el-input>
        </el-form-item>
        <el-form-item label="抬头" prop="taiTou">
          <el-input v-model="formTicket.taiTou"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bank">
          <el-input v-model="formTicket.bank"></el-input>
        </el-form-item>
        <el-form-item label="开户地址" prop="faddress">
          <el-input v-model="formTicket.faddress"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankNo">
          <el-input v-model="formTicket.bankNo"></el-input>
        </el-form-item>
        <el-form-item label="税号" prop="tax">
          <el-input v-model="formTicket.tax"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ifNeedTicketInfo = false">取 消</el-button>
        <el-button type="primary"  @click="onSubmit('formTicket')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Add from './Add.vue'
export default {
  name: 'Ticket',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系人手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ifLoading: false,
      ifAdd: false,
      ifNeedTicketInfo: false,
      formTicket: {
        contactPerson: '',
        tel: '',
        taiTou: '',
        bank: '',
        bankNo: '',
        faddress: '',
        tax: ''
      },
      rulesTicket: {
        contactPerson: [
          { required: true, message: '请输入联系人！', trigger: 'blur' }
        ],
        tel: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        taiTou: [
          { required: true, message: '请输入抬头！', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入开户行！', trigger: 'blur' }
        ],
        bankNo: [
          { required: true, message: '请输入银行账号！', trigger: 'blur' }
        ],
        faddress: [
          { required: true, message: '请输入开户地址！', trigger: 'blur' }
        ],
        tax: [
          { required: true, message: '请输入税号！', trigger: 'blur' }
        ]
      },
      ticketList: [],
      orderList: [],
      pageSize: 10,
      currentPage: 1,
      sum: 0
    }
  },
  computed: {
    ...mapState({
      userCode: state => state.userCode,
      checkStatus: state => state.checkStatus,
      userRole: state => state.userRole,
      userId: state => state.userId,
      userTicketInfo: state => state.userTicketInfo
    })
  },
  created () {
    this.getTicketList()
  },
  watch: {
  },
  components: {
    Add
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeIfSJOrderSearch',
      'changeSearchOrderId',
      'changeSearchSjId',
      'changeUserTicketInfo'
    ]),
    handleCurrentChange () {
      this.getTicketList()
    },
    // 补充开票信息
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitHZ()
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 货主信息提交
    submitHZ () {
      let DATA = {
        id: this.userId,
        company_lxr: this.formTicket.contactPerson,
        company_phone: this.formTicket.tel,
        tai_tou: this.formTicket.taiTou,
        f_bank: this.formTicket.bank,
        f_bank_no: this.formTicket.bankNo,
        faddress: this.formTicket.faddress,
        tax_number: this.formTicket.tax
      }
      let stObg = JSON.stringify(DATA)
      this.ifLoading = true
      this.send({
        name: '/zRegisterController/doUpdateHZ?jsonHZ=' + stObg,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '信息补充成功！',
            type: 'success'
          })
          this.ifLoading = false
          this.changeUserTicketInfo(true)
          this.ifNeedTicketInfo = false
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
    toAddTicket () {
      if (this.checkStatus === '2') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        if (!this.userTicketInfo) {
          this.ifNeedTicketInfo = true
        } else {
          this.ifAdd = !this.ifAdd
        }
      }
    },
    cancelTicket (idx, row) {
      if (this.checkStatus === '2') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将撤回该开票申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.send({
            name: '/invoiceController/refund/' + row.id,
            method: 'GET',
            data: {
            }
          }).then(res => {
            if (res.data.respCode === '0') {
              this.$message({
                message: '撤销成功！',
                type: 'success'
              })
              this.getTicketList()
            } else {
              this.$message({
                message: res.data.message + '！',
                type: 'error'
              })
            }
          }).catch((res) => {
            console.log(res)
          })
        }).catch(() => {
        })
      }
    },
    // 开票列表
    getTicketList () {
      this.send({
        name: '/invoiceController/list/' + this.currentPage + '/' + this.pageSize + '/' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.ticketList = res.data.data.map(item => {
            switch (item.fstatus) {
              case '0':
                item.fstatusTxt = '已作废'
                break
              case '1':
                item.fstatusTxt = '待开票'
                break
              case '2':
                item.fstatusTxt = '已开票'
                break
              case '3':
                item.fstatusTxt = '已寄出'
                break
            }
            return item
          })
          this.sum = res.data.size
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
.Ticket{
  background: #fff;
  margin: 20px 20px 50px 20px;
  padding: 20px;
  .expandBlock p{
    color: #99a9bf;
  }
}
</style>
