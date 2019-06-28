<template>
  <div class="transportAgreement">
    <el-dialog
      title="鹰速物流合同"
      :visible.sync="dialogVisible"
      @close="cancel"
      center
      fullscreen>
      <div class="TextAlignL">
        <p>甲方： 上海鹰速物流有限公司</p>
        <p>乙方： {{userPartyB.name}}</p>
        <br/>
        <p>上海鹰速国际货物运输有限公司是一家以危险品物流为特色服务，公司主要经营道路危险
货物运输和物流配送业务有（第二类：易燃气体、非易燃无毒气体；第三类：易燃液体；第四
类：易燃固体第六类：毒性物质；第八类：腐蚀性物质（强腐蚀性、弱腐蚀性（除剧毒品
））；特种化工。公司自主拥有各种车型的长短途货车400余辆，可承接全国各地的整车运输
、危险品运输、仓储、配送业务。 公司以长三角、珠三角为依托,已形成辐射全国的运输服务
网络，已在苏州、上海、无锡、昆山、东莞、广州、深圳、惠州、北京、天津、南京、长沙、
南昌等各大中城市设立分公司或办事处，长途运输通达80多个城市、短途配送覆盖珠三角、长
三角等各大区域，线路覆盖全国300多个城市和地区；完善的服务网络确保为客户提供准确、
高效、安全的"门对门"运输服务。
        </p>
        <br/>
        <p>公司具有完善的内部组织机构和管理制度，其中市场开发与管理调度人员多名。公司秉承客户
至上的服务宗旨，借助先进的物流服务理念和丰富的物流操作经验，为不同客户量身定做提供
专业物流方案和优质、高效的物流服务；从而帮助客户降低成本，提升市场竞争力。
        </p>
        <br/>
        <p>
          公司以雄厚的实力、完善的服务网络、优质的服务质量、专业的服务水平赢得了客户的赞誉。
成为了众多外资企业，国内大型生产企业优秀的物流供应商，值得信赖的合作伙伴。
        </p>
        <br/>
        <div>
          <span style="width:50%;display:inline-block;">甲方签字： 王庆全</span>
          <span  style="width:45%;display:inline-block;">乙方签字： {{userPartyB.name}}</span>
        </div>
        <div v-if="userRole == 3">
          <span style="width:50%;display:inline-block;"></span>
          <span  style="width:45%;display:inline-block;">身份证号码： {{userPartyB.ID}}</span>
        </div>
        <div>
          <span style="width:50%;display:inline-block;"></span>
          <span  style="width:45%;display:inline-block;">合同日期： {{curDate}}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureSign">确认签署</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import {send} from '../util/send'
import {formatToString} from '../util/utils'
export default {
  name: 'transportAgreement',
  props: ['orderId', 'type'],
  data () {
    return {
      dialogVisible: true
    }
  },
  computed: {
    ...mapState({
      userPartyB: state => state.userPartyB,
      userRole: state => state.userRole,
      userId: state => state.userId
    }),
    curDate: function () {
      let curDate = new Date()
      return formatToString(curDate, 'Simple', '-')
    }
  },
  created () {
  },
  methods: {
    cancel () {
      this.$emit('closeTransportAgreement')
      this.$emit('refreshList')
    },
    sureSign () {
      if (this.type === 0) {
        this.signHZ()
      } else {
        this.signCYS()
      }
    },
    signHZ () {
      this.send({
        name: '/eSignController/huozhu?jsonstr=' + (JSON.stringify({orderid: this.orderId, id: this.userId})),
        method: 'POST'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '签署成功！',
            type: 'success'
          })
          this.$emit('closeTransportAgreement')
          this.$emit('closeBaoJiaDialog')
          this.$emit('refreshList')
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
    signCYS () {
      this.send({
        name: '/eSignController/driver?jsonstr=' + (JSON.stringify({orderid: this.orderId, id: this.userId, type: 0})),
        method: 'POST'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '签署成功！',
            type: 'success'
          })
          this.$emit('closeTransportAgreement')
          this.$emit('refreshList')
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
</style>
