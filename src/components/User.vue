<template>
  <div class="User">
    <el-row>
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser">新增</el-button>
      </el-col>
      <el-col :span="24" class="MarginTB_20">
        <el-table
          v-if="userRole == 2"
          ref="multipleTable"
          v-loading="loading"
          :data="UserList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
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
            label="操作"
            >
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
        <el-table
          v-if="userRole == 1"
          ref="multipleTable"
          v-loading="loading"
          :data="LogisticsList"
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
           <el-table-column
            prop="company_name"
            label="司机公司"
            show-overflow-tooltip>
          </el-table-column>
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
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="UserList.length > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新增司机" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="Rules" ref="form" label-width="80px">
        <el-form-item label="司机姓名" prop="LogisticName">
          <el-input v-model="form.LogisticName"></el-input>
        </el-form-item>
        <el-form-item label="司机手机" prop="LogisticPhone">
          <el-input v-model="form.LogisticPhone"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="LogisticCompany">
          <el-input v-model="form.LogisticCompany"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="LogisticPsd">
          <el-input v-model="form.LogisticPsd"></el-input>
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
import { mapState } from 'vuex'
import {send} from '../util/send'
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
        LogisticCompany: '',
        LogisticPsd: ''
      },
      Rules: {
        // LogisticPhone: [
        //   { required: true, validator: validateAccountPhone, trigger: 'blur' }
        // ],
        LogisticPhone: [
          { required: true, message: '请输入手机号！', trigger: 'blur' }
        ],
        LogisticName: [
          { required: true, message: '请输入司机姓名！', trigger: 'blur' }
        ],
        LogisticPsd: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
        LogisticCompany: [
          { required: true, message: '请输入公司名称！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userCode: state => state.userCode,
      userRole: state => state.userRole
    })
  },
  created () {
    if (this.userRole === '1' || this.userCode === 1) {
      this.getLogisticsList()
    } else {
      this.getUserList()
    }
  },
  methods: {
    handleSelectionChange () {
    },
    addUser () {
      if (this.userRole === '1' || this.userCode === 1) {
        this.dialogFormVisible = true
      } else {
        this.modalUser()
      }
    },
    modalUser () {
      this.$prompt('请输入初始密码', '新增用户', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.sureAdd(value)
      }).catch(() => {
      })
    },
    modalLogistic () {
      const h = this.$createElement
      this.$msgbox({
        title: '新增用户',
        message: h('div', null, [
          h('div', null, [
            h('p', {style: 'margin: 5px'}, '司机名称 '),
            h('el-input', {
              props: {
                value: this.LogisticName
              },
              nativeOn: {
                change: this.changeName
              }
            })
          ]),
          h('div', null, [
            h('p', {style: 'margin: 5px'}, '司机手机号 '),
            h('el-input', {
              props: ['LogisticPhone'],
              // attrs: {
              //   value: this.LogisticPhone,
              //   id: 'LogisticPhone'
              // },
              nativeOn: {
                change: this.changePhone
              }
            })
          ]),
          h('div', null, [
            h('p', {style: 'margin: 5px'}, '密码 '),
            h('el-input', {
              props: ['LogisticPsd'],
              // attrs: {
              //   value: this.LogisticPsd,
              //   id: 'LogisticPsd'
              // },
              nativeOn: {
                change: this.changePsd
              }
            })
          ]),
          h('div', null, [
            h('p', {style: 'margin: 5px'}, '公司名称 '),
            h('el-input', {
              props: ['LogisticCompany'],
              // attrs: {
              //   value: this.LogisticCompany,
              //   id: 'LogisticCompany'
              // },
              nativeOn: {
                change: this.changeCompany
              }
            })
          ])
        ]),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            if (!this.LogisticName || !this.LogisticPhone || !this.LogisticPsd || !this.LogisticCompany) {
              this.$message({
                message: '请将信息填写完整！',
                type: 'warning'
              })
            } else {
              done()
            }
          } else {
            done()
          }
        },
        showCancelButton: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消'
      }).then(action => {
        this.addLogistic()
      })
    },
    addLogistic (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          send({
            name: '/zRegisterController/registerDriverByLogistics?fid=' + this.userId + '&fname=' + this.form.LogisticName + '&fmobile=' + this.form.LogisticPhone + '&fpassword=' + this.form.LogisticPsd + '&company_name=' + this.form.LogisticCompany,
            method: 'POST',
            data: {
            }
          }).then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: '新增用户成功！',
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
            }
          }).catch((res) => {
            console.log(res)
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
    changeName (item) {
      console.log(this.LogisticName)
      // this.LogisticName = item.target.value
    },
    changePhone (item) {
      this.LogisticPhone = item.target.value
    },
    changePsd (item) {
      this.LogisticPsd = item.target.value
    },
    changeCompany (item) {
      this.LogisticCompany = item.target.value
    },
    async sureAdd (PSD) {
      const userName = await this.getUserName()
      let DATA = {
        ftype: this.userRole,
        usercode: userName,
        password: PSD,
        mainUsercode: this.userCode
      }
      let stObj = JSON.stringify(DATA)
      send({
        name: '/zRegisterController/subAccountCreate?zRegisterJson=' + stObj,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.$message({
            message: '新增用户成功！',
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
    handleReset (index, row) {
      this.$prompt('请输入新密码', '重置密码', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        send({
          name: '/zRegisterController/subAccountChangePsw?usercode=' + row.usercode + '&fpassword=' + this.password,
          method: 'POST',
          data: {
          }
        }).then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: '密码重置成功！',
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
      }).catch(() => {
      })
    },
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
      }).catch(() => {
      })
    },
    sureDeleteUser (id) {
      send({
        name: '/zRegisterController/subAccountDel?id=' + id,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.getUserList()
          this.$message({
            message: '用户删除成功！',
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
    sureDeleteLogistic (id) {
      send({
        name: '/zRegisterController/delDriver?id=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
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
    getUserName () {
      return new Promise((resolve, reject) => {
        send({
          name: '/zRegisterController/subAccount?id=' + this.userId,
          method: 'POST',
          data: {
          }
        }).then(res => {
          if (res.data.code === 1) {
            resolve(res.data.usercode)
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
    getUserList () {
      this.loading = true
      send({
        name: '/zRegisterController/subAccountList?main_usercode=' + this.userCode + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.sum = res.data.sum_number
          this.UserList = res.data.subAccountList
          this.loading = false
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
    getLogisticsList () {
      this.loading = true
      send({
        name: '/zRegisterController/driverList?fid=' + this.userId + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.sum = res.data.sum_number
          this.LogisticsList = res.data.driverList
          this.loading = false
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
      this.getUserList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.User{
  background: #fff;
  margin: 20px 20px 50px 20px;
  padding: 20px;
}
</style>
