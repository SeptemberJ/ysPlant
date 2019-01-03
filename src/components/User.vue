<template>
  <div class="User">
    <el-row>
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
        <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
      </el-col>
      <el-col :span="24" class="MarginTB_20">
        <el-table
          ref="multipleTable"
          :data="UserList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
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
                @click="handleEdit(scope.$index, scope.row)">编辑
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
        :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      currentPage: 1,
      UserList: [
        {
          phone: '18234567890',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          phone: '18234567890',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          phone: '18234567890',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          phone: '18234567890',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          phone: '18234567890',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          phone: '18234567890',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange () {
    },
    handleEdit () {
    },
    handleDelete () {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
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
