<template>
  <div class="User">
    <el-row>
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser">新增</el-button>
      </el-col>
      <el-col :span="24" class="MarginTB_20">
        <el-table
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
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {send} from '../util/send'
export default {
  name: 'User',
  data () {
    return {
      loading: false,
      currentPage: 1,
      sum: 0,
      UserList: []
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
    this.getUserList()
  },
  methods: {
    handleSelectionChange () {
    },
    addUser () {
      this.$prompt('请输入初始密码', '新增用户', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.sureAdd(value)
      }).catch(() => {
      })
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
    handleDelete (idx, row) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sureDelete(row.id)
      }).catch(() => {
      })
    },
    sureDelete (id) {
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
