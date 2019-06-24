<template>
  <div class="User">
    <el-row>
      <!-- tab -->
      <el-col :span="24"  class="MarginB_20" v-if="userRole == 1">
        <el-row>
          <el-col :span="12" :class="{'activeTab': userType == 0, 'normalTab': userType == 1, 'Padding_10': true}"><span @click="changeTab(0)">子账户</span></el-col>
          <el-col :span="12" :class="{'activeTab': userType == 1, 'normalTab': userType == 0, 'Padding_10': true}"><span @click="changeTab(1)">司机</span></el-col>
        </el-row>
      </el-col>
      <!-- operation bt -->
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser">{{userType == 0 ? '新增' : '新增'}}</el-button>
      </el-col>
      <el-col :span="24" class="MarginTB_20">
        <!-- 子账户列表 -->
        <el-table
          v-if="userType == 0"
          ref="multipleTable"
          v-loading="loading"
          key="secondAccount"
          :data="UserList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="usercode"
            label="账户名">
          </el-table-column>
          <el-table-column
            prop="main_usercode"
            label="所属账户"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleReset(scope.$index, scope.row)">重置密码
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row, 'user')">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 司机列表 -->
        <el-table
          v-if="userType == 1"
          ref="multipleTable"
          v-loading="loading"
          :data="LogisticsList"
          key="LogisticsList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="fname"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="fmobile"
            label="司机手机"
            show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column
            prop="company_name"
            label="所属公司"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            align="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row, 'logistic')">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 分页 -->
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="UserList.length > 0 && userType == 0">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="LogisticsList.length > 0 && userType == 1">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增司机 -->
    <el-dialog title="新增司机" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="Rules" ref="form" label-width="80px">
        <el-form-item label="司机姓名" prop="LogisticName">
          <el-input v-model="form.LogisticName" clearable></el-input>
        </el-form-item>
        <el-form-item label="司机手机" prop="LogisticPhone">
          <el-input v-model="form.LogisticPhone" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="公司" prop="LogisticCompany">
          <el-input v-model="form.LogisticCompany"></el-input>
        </el-form-item> -->
        <el-form-item label="密码" prop="LogisticPsd">
          <el-input v-model="form.LogisticPsd" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLogistic('form')" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'User',
  data () {
    var validateAccountPhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入手机手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      currentPage: 1,
      sum: 0,
      UserList: [],
      LogisticsList: [],
      dialogFormVisible: false,
      form: {
        LogisticName: '',
        LogisticPhone: '',
        // LogisticCompany: '',
        LogisticPsd: ''
      },
      Rules: {
        LogisticPhone: [
          { required: true, validator: validateAccountPhone, trigger: 'change' }
        ],
        LogisticName: [
          { required: true, message: '请输入司机姓名！', trigger: 'change' }
        ],
        LogisticPsd: [
          { required: true, message: '请输入密码！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userCode: state => state.userCode,
      userRole: state => state.userRole,
      checkStatus: state => state.userRole
    }),
    userType: {
      get: function () {
        if (this.userRole === '4') { // 承运商子账户
          return 1
        } else {
          return this.$store.state.accountKind
        }
      },
      set: function (newValue) {
        this.$store.state.accountKind = newValue
      }
    }
  },
  created () {
    if (this.userType === 1) {
      this.getLogisticsList()
    } else {
      this.getUserList()
    }
  },
  methods: {
    ...mapActions([
      'changeAccountKind',
      'changeLocationIdx'
    ]),
    handleSelectionChange () {
    },
    // Tab事件
    changeTab (type) {
      this.changeAccountKind(type)
      this.currentPage = 1
      if (type === 0) {
        this.getUserList()
      } else {
        this.getLogisticsList()
      }
    },
    // 添加用户
    addUser () {
      if (this.checkStatus !== '1' && this.userRole === '1') {
        this.$confirm('您还未进行信息认证不能进行子账户添加，是否前去认证?', '提示', {
          confirmButtonText: '前往',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'Information'})
          this.changeLocationIdx(3)
        }).catch(() => {
        })
      } else {
        if (this.userType === 0) {
          this.modalUser()
        } else {
          this.dialogFormVisible = true
        }
      }
    },
    // 添加子账户
    modalUser () {
      this.$prompt('请输入初始密码', '新增子账户', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.sureAdd(value)
      }).catch((res) => {
        console.log(res)
      })
    },
    // 添加司机
    addLogistic (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.send({
            name: '/zRegisterController/registerDriverByLogistics?fid=' + this.userId + '&fname=' + this.form.LogisticName + '&fmobile=' + this.form.LogisticPhone + '&fpassword=' + this.form.LogisticPsd + '&company_name=' + this.form.LogisticCompany,
            method: 'POST',
            data: {
            }
          }).then(res => {
            if (res.data.respCode === '0') {
              this.$message({
                message: '新增司机成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              // 清空输入
              this.form.LogisticName = ''
              this.form.LogisticPhone = ''
              this.form.LogisticPsd = ''
              this.form.LogisticCompany = ''
              this.getLogisticsList()
              this.loading = false
            } else {
              this.$message({
                message: res.data.message + '！',
                type: 'error'
              })
              this.loading = false
            }
          }).catch((res) => {
            console.log(res)
            this.loading = false
          })
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 输入司机手机号
    changePhone (item) {
      this.LogisticPhone = item.target.value
    },
    // 输入司机密码
    changePsd (item) {
      this.LogisticPsd = item.target.value
    },
    // 输入司机公司
    changeCompany (item) {
      this.LogisticCompany = item.target.value
    },
    // 获取子账户用户名并添加
    async sureAdd (PSD) {
      const userName = await this.getUserName()
      let DATA = {
        ftype: this.userRole,
        usercode: userName,
        password: PSD,
        mainUsercode: this.userCode
      }
      let stObj = JSON.stringify(DATA)
      this.send({
        name: '/zRegisterController/subAccountCreate?zRegisterJson=' + stObj,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '子账户新增成功！',
            type: 'success'
          })
          this.getUserList()
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
    // 重置密码
    handleReset (index, row) {
      this.$prompt('请输入新密码', '重置密码', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.send({
          name: '/zRegisterController/subAccountChangePsw?usercode=' + row.usercode + '&fpassword=' + this.password,
          method: 'POST',
          data: {
          }
        }).then(res => {
          if (res.data.respCode === '0') {
            this.$message({
              message: '子账号密码重置成功！',
              type: 'success'
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
      }).catch((res) => {
        console.log(res)
      })
    },
    // 删除提示
    handleDelete (idx, row, type) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 'logistic') {
          this.sureDeleteLogistic(row.id)
        } else {
          this.sureDeleteUser(row.id)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 删除子账户
    sureDeleteUser (id) {
      this.send({
        name: '/zRegisterController/subAccountDel?id=' + id,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '子账号删除成功！',
            type: 'success'
          })
          this.getUserList()
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
    // 删除司机
    sureDeleteLogistic (id) {
      this.send({
        name: '/zRegisterController/delDriver?id=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.getLogisticsList()
          this.$message({
            message: '司机删除成功！',
            type: 'success'
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
    // 获取子账户账户名
    getUserName () {
      return new Promise((resolve, reject) => {
        this.send({
          name: '/zRegisterController/subAccount?id=' + this.userId,
          method: 'POST',
          data: {
          }
        }).then(res => {
          if (res.data.respCode === '0') {
            resolve(res.data.data)
          } else {
            this.$message({
              message: res.data.message + '！',
              type: 'error'
            })
          }
        }).catch((res) => {
          console.log(res)
        })
      })
    },
    // 获取子账户列表
    getUserList () {
      this.loading = true
      this.send({
        name: '/zRegisterController/subAccountList?main_usercode=' + this.userCode + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sum = res.data.size
          this.UserList = res.data.data
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
    // 获取司机列表
    getLogisticsList () {
      this.loading = true
      this.send({
        name: '/zRegisterController/driverList?fid=' + this.userId + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sum = res.data.size
          this.LogisticsList = res.data.data
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
    // 页码改变重新获取列表
    handleCurrentChange () {
      if (this.userType === 0) {
        this.getUserList()
      } else {
        this.getLogisticsList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.User{
  background: #fff;
  margin: 20px 20px 50px 20px;
  padding: 20px;
  .activeTab{
    border: 1px solid #e0b32b;
    background: #e0b32b;
    color: #fff;
    cursor: pointer;
    span{
      width: 100%;
      display: block;
    }
  }
  .normalTab{
    border: 1px solid #e0b32b;
    color: #e0b32b;
    cursor: pointer;
    span{
      width: 100%;
      display: block;
    }
  }
}
</style>
