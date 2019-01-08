import CryptoJS from 'crypto-js'
export function Encrypt (plaintText) {
  var keyStr = 'btwccy_liubai'
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  // var iv = CryptoJS.enc.Utf8.parse('qwertyuiopasdfgh')
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  // var encryptedBase64Str = encryptedData.toString()
  var encryptedStr = encryptedData.ciphertext.toString()
  return encryptedStr
}

// AES解密
export function Decrypt (encryptedStr) {
  var keyStr = 'btwccy_liubai'
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr)
  var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8)
  return decryptedStr
}

// 创建cookie
export function setCookie (cname, cvalue, exhours) {
  var d = new Date()
  d.setTime(d.getTime() + (exhours * 60 * 60 * 1000))
  // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  // console.info(cname + '=' + cvalue + '; ' + expires)
  document.cookie = cname + '=' + cvalue + '; ' + expires
}

// 获取cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

// 删除cookie
export function clearCookie (name) {
  setCookie(name, '', -1)
}

// 秒数回转
export function secondToFormat (second) {
  var oDate = new Date(second)
  var oYear = oDate.getFullYear()
  var oMonth = oDate.getMonth() + 1
  var oDay = oDate.getDate()
  var oHour = oDate.getHours()
  var oMin = oDate.getMinutes()
  var oSen = oDate.getSeconds()
  // oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay)
  var oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen)
  return oTime
}

// 补零
function getzf (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

// uuid
export function getuuid () {
  var uid = []
  var hexDigits = 'btwccy_liubai'
  for (var i = 0; i < 32; i++) {
    uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  uid[6] = '4'
  uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1)
  var uuid = uid.join('')
  return uuid
}
