<template>
  <div>
    <!-- <form id='alipaysubmit' name='alipaysubmit' action='http://openapi.alipaydev.com/gateway.do?charset=utf-8' method='POST'>
      <input name='app_id' value='2016090800462854'/>
      <input name='biz_content' value='{"out_trade_no":"1557900534524","total_amount":"0.01","subject":"无车承运订单定金","product_code":"FAST_INSTANT_TRADE_PAY"}'/>
      <input name='charset' value='utf-8'/>
      <input name='method' value='alipay.trade.page.pay'/>
      <input name='sign_type' value='RSA2'/>
      <input name='timestamp' value='2019-01-23 13:01:42'/>
      <input name='version' value='1.0'/>
      <input name='sign' value='P1dkKvY1dL9tqTfDye1+ujFi5ys+09tkwuSBwmjyAAQKKjclfrlY7QotylfTd5I2LLNGWQHTGod4/iX97Ct8JFBfUS/VicpZKC5yccqZfu4tmQmOd1oV1Rz8QpXjvzVFA44FjDpM0fN/F7OicORuMrTEqF1/L85MjzOUbN6IrkcobDqvHncEhqfLduCy5Nx1y8egvluawdNGL2iw39JcALjvIy9U5si4HwP5HraLcD0qGNSL8AdhZyLpuFrEuC4s890amKXfGiVSWkf0B3KVKrfqtCkfCnkZNrXo4T0gY20M6RMndJNFROQCb90Gne98Rmm1MeXlwlc3ZWjwkVdWIQ=='/>
      <input type='submit' value='POST'>
    </form> -->
    <h2 @click="pay">点击触发</h2>
  </div>
</template>
<script>
var NodeRSA = require('node-rsa')
let userPrivateKey = '-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEAsAFhUyeJqDdSwq9X3GdWVbEYVszUfL+/mShT4mbHkBfQAfQHPcgXNiR39RT8FVrgTs+XdtB9ijRQzwZJ4GuSr1+LCrBoYReaAKLx0v5Hq/4xXZ3fE/H/Ja0Nox+9NzfXnJkIbBEX1W8NAl9Pwj7AQyoi8xiaExRdTvCva1BVaHsiX4YptYov3rdu7cQNdKtwDP+KI5sX5pLyIG+RPZlAAOz2Ogj17p267OPDDXiz1BHwaCXGkivqQ3ue8BMtDdC6cXWa86HuJGPIdpxqaqKt0mQ5nxuIOzQINdN6u1Tq2MNsnwXzbLc0UcxNmYi1y2PyPsRBR2llghVWR0qNf98+CwIDAQABAoIBAD64zzEuBt1+kay1he8SmG7DRLQyHIs0Xhg7ieFF1VphUgxQJYB73OG7j1A0oT0O/J65VfXOiN6GlEGisRMb4tNCji9J/HiVS5lseBdD7NC7LmZ5SzU1aULI7/Iw7mJOMTUqSBkS4lZ6U72Dr82+RQ/qZTgSjV29RR9LoIfywe0QVMvZof6ZKLXYvLXOfS0/0mRbaBEQltYo1ddf47lTdlaU11fO4gZbJCGhnhHfROlpiVKIHh93zJ8iGDFKBE4fZWyrc971plxWWo+Sh8Ualv7/DikmmHIEwslGmEtm03LmzEXY6JG4LRYUb/SJFtaAaktGUCtsGwVeZNKQF/Fn+tkCgYEA5TUEdsbK3uDeKcS86HaVIo9Y5l0VGdsOeyAlugOXSBBzAfEr3xknwmvWerF2H+Deve1dut+KciEZ+uUNnzal0nvLyLOD96xa28UyG/yFpgWWsZvOO7U1oIOs/re6cOF4v/olSRbH5e+ZLqwL9Wk4849OP6+rzodceVcPMFTpeM0CgYEAxJRPlfhvddURZYipol7D7s46sx22hNaW0y7VNkId8f91XL/KbIxWJRYEnZa2/dQFcqViC0kplckEd3LPvSA0p9Xo88ElrQzyUtd7kQuwOl5pWs5zEJo8p/jmqWpljqGEZ8dFosbInXdZYtrXfBEE37ZZU6P+A9/L92Y7DS2XcjcCgYApt3SQia3y0sqcn4oiZTLPj3eGtfpZMl14W2mCaZTnMNc9yz9I47Mw15+5xQLS2oKv3rvofzcbfprT50yLZc7YeF+mr8WdFmmTBlkQbu2EQhAjU1A93cVc6Zpa4eW1FdR8XHLc0qCfYPRoYjfq+rO64KJFRRvoAwr5qrbA/TNhIQKBgDN2dENZr6xUZGKFXYtxba/l834SyEaMex28Q/sZYgeJjisC1raGIsNAuWKcIzneOLLj0wALXkSlRHMU7oefl8lcecjehsOAASxo1yOIwND3CHPKWls9VaXPxmsRvJaTeDtG8tcDXV/D7/WuPv1u4yzB6y63XveariYNcGYpyl0PAoGBAJhAnCzvMD30W6OWB9lJnadg4wq0aL1ghJbmfv4vMV2fy+iYyxQaW9QhX9cS/5wZ7o1V5SZphgp5sFFunCTWIiK3lLAH8qPpNGBSIOFvUbI1zAxiDjenyrhSwEtbes/Z+8LJaQ0jrTT8Pfngmhk91yAF+L0iOBWkTcUt3v/3BoYX-----END RSA PRIVATE KEY-----'
const key = new NodeRSA()
key.setOptions({b: 2048, signingScheme: 'sha256'}) // 配置密钥长度并设置签名方法
key.importKey(userPrivateKey, 'pkcs1-private') // 导入密钥并设定格式
// const publicDer = key.exportKey('pkcs1-public')
// console.log(publicDer)
// sign
let text = 'app_id=2016090800462854&biz_content={"out_trade_no":"1557900534524","product_code":"FAST_INSTANT_TRADE_PAY","subject":"无车承运订单定金","total_amount":"16.00"}&charset=utf-8&method=alipay.trade.page.pay&sign_type=RSA2&timestamp=2019-01-24 09:01:42&version=1.0'
let buffer = Buffer.from(text)
let signature = key.sign(buffer).toString('base64')
console.log(signature)
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    pay () {
      let DATA = {
        app_id: '2016090800462854',
        biz_content: '{"out_trade_no":"1557900534524","product_code":"FAST_INSTANT_TRADE_PAY","subject":"无车承运订单定金","total_amount":"16.00"}',
        charset: 'utf-8',
        method: 'alipay.trade.page.pay',
        sign_type: 'RSA2',
        timestamp: '2019-01-24 09:01:42',
        version: '1.0',
        sign: signature
      }
      console.log(DATA)
      var temp = document.createElement('form')
      temp.action = 'http://openapi.alipaydev.com/gateway.do?charset=utf-8'
      temp.method = 'post'
      temp.style.display = 'none'
      for (var x in DATA) {
        var opt = document.createElement('input')
        opt.name = x
        opt.value = DATA[x]
        temp.appendChild(opt)
      }
      document.body.appendChild(temp)
      temp.submit()
      return temp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
