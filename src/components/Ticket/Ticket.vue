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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Add from './Add.vue'
export default {
  name: 'Ticket',
  data () {
    return {
      loading: false,
      ifAdd: false,
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
      userId: state => state.userId
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
      'changeSearchSjId'
    ]),
    handleCurrentChange () {
      this.getTicketList()
    },
    toAddTicket () {
      this.ifAdd = !this.ifAdd
    },
    cancelTicket (idx, row) {
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
