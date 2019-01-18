<template>
  <div class="PDF">
    <el-button type="primary" @click="SavePdf">主要按钮</el-button>
    <div id="page" style="background: #fff; padding: 10px 0;">
      <h4 style="text-align: center;">无车承运合同</h4>
      <p>申请主体 {{PDFCompany}} 同意授权委托指定人员 ______________（身份证号码：________________________）作为帐号联系人，以申请主体名义不可撤销地申请微信
（公众号/小程序/开放平台）帐号（原始ID） gh_e4c6a3df6e14 认证服务，并授权其负责该帐号的内容维护、开发维护及运营管理。</p>
      <p>1. 申请主体及初始申请注册主体同意：申请主体帐号在进行认证服务时，若提交的主体信息与初始申请注册主体信息不一致，应当填写初始申请注册主体姓名并
在本公函落款处签章确认，在帐号资质审核成功之后，申请主体帐号的使用权属于通过资质审核的申请主体，该帐号自注册时其产生的一切权利义务均由该主体承
担，该帐号所获得的所有收益、权限均归认证后的主体享有，且所有运营活动都必须以该主体对外开展；</p>
      <p>2. 申请主体承诺：提交给腾讯的认证资料真实无误，并不可撤销地授权腾讯及其委托的第三方审核机构对提交的资料进行甄别核实，申请主体理解并同意，一经
申请即产生腾讯及其委托的第三方审核机构的审核成本，故所交纳的认证审核服务费用将不因认证结果、申请主体是否提出撤回申请等因素而退回。同时，帐号内
容维护、开发维护及运营管理遵守国家法律法规、政策及《微信公众平台服务协议》、《微信公众平台认证服务协议》、《微信小程序平台服务条款》、《微信开
放平台开发者服务协议》、《微信开放平台开发者资质认证服务协议》的相关规定。如违反上述承诺，责任自行承担；</p>
      <p>3. 申请主体清楚知悉并同意，本认证服务仅对该帐号所提交的认证资料的真实性、合法性进行书面甄别核实，其功能、权限是否开通、帐号能否发布等均需遵守
对应业务平台为此所制定的专项规则，而不与认证审核结果存在直接关联。</p>
      <p>申请主体对以上认证申请信息表填写信息及申请公函内容确认无异议。</p>
      <p>申请主体加盖公章：</p>
      <p>需加盖与主体一致的单位公章。无公章的个体工商户可加盖法人私章或法人签字。</p>
      <br/>
      <p>帐号联系人签字：</p>
      <P style="text-align: right;">日期：____年____月____日</P>
    </div>
  </div>
</template>
<script src="https://cdn.bootcss.com/bluebird/3.5.3/bluebird.min.js"></script>
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
<script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta3/html2canvas.min.js"></script>
<script>
import { mapState } from 'vuex'
import {send} from '../util/send'
// import {setCookie, Encrypt, Decrypt} from '../util/utils'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      PDFCompany: state => state.PDFCompany
    })
  },
  created () {
  },
  methods: {
    SavePdf() {
      html2canvas(document.getElementById("page"), {
        scale: 0,
        dpi: 144,
        onrendered:function(canvas) {
          var contentWidth = canvas.width
          var contentHeight = canvas.height
          // 一页pdf显示html页面生成的canvas高度;
          var pageHeight = contentWidth / 592.28 * 841.89
          // 未生成pdf的html页面高度
          var leftHeight = contentHeight
          // 页面偏移
          var position = 0
          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = 595.28
          var imgHeight = 592.28/contentWidth * contentHeight
          var pageData = canvas.toDataURL('image/jpeg', 1.0)
          var pdf = new jsPDF('', 'pt', 'a4')
          // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          // 当内容未超过pdf一页显示的范围，无需分页
          pdf.addImage(pageData, 'JPEG', 15, 20, imgWidth - 30, imgHeight)
          pdf.save('content.pdf')
       }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.PDF{
  padding: 0 40px;
  text-align: left;
  #page{
    p{
      font-size: 16px !important;
      line-height: 28px !important;
    }
  }
}
</style>
