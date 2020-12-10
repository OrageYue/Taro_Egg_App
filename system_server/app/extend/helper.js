/*
 * @Author: yuncheng
 * @Date: 2020-07-01 17:13:39
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-28 10:07:42
 * @FilePath: /booking_system_server/app/extend/helper.js
 */ 
const moment = require('moment')
const axios = require( 'axios' )
const crypto = require( 'crypto' );
var Parser = require("fast-xml-parser");
// -----|格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD')

// -----|到期时间差
exports.diffTime = ( start_time, end_time ) => {
  let diff 
  // 时间戳统一转换
  let startTime = this.date_stimap( start_time )

  let endTime = this.date_stimap( end_time )
  // 计算时间差值（s）
  let timeDiff = moment( endTime ).diff( moment( startTime ), "seconds" )
  // 计算小时位置
  let timeH = Math.floor( timeDiff / 3600 )
  // timeH = timeH < 10 ? "0" + timeH : timeH
   // 计算分钟位
  let timeMinute = Math.floor( ( timeDiff % 3600 ) / 60 )
  diff = {
    timeH: timeH,
    timeMinute:timeMinute
  }
  return diff
}
// -----|处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' })=> {
  ctx.body = {
    code: 1,
    data: res,
    msg
  }
  ctx.status = 200
}
// -----|时间戳格式化
exports.date_stimap = (time) => {
  let date = new Date(parseInt(time) );
  let y = date.getFullYear(); 
  let m = date.getMonth() + 1; 
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate(); 
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes(); 
  let second = date.getSeconds(); 
  minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second; 
  // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second) 
  let dates = y + '-' + m + '-' + d + ' '  + h + ':' + minute + ':' + second;
  return dates
}

// -----|获取微信后端APIaccess_token
exports.get_wechat_access_token = async () => {
  let accetss_token
  const url = "https://api.weixin.qq.com/cgi-bin/token"
  const params = {
    grant_type: "client_credential",
    appid: "换成自己的appid",
    secret:"换成自己的secret"
  }
  const res = await axios.get( url, { params: params } )
  accetss_token= res.data.access_token
  return accetss_token
}
// -----|MD5加密签名
exports.normal_md5_sign = ( stringSignTemp ) => {
        let sign
        let md5 = crypto.createHash( 'md5' )
        md5.update( stringSignTemp )
        sign = md5.digest( 'hex' );
        return sign
}
// -----|订单号生成
exports.create_rechage_number = ()=> {
        const now_date = new Date().valueOf() // 生成时间戳
        const random_number = crypto.randomBytes( Math.ceil( 8 / 2 ) ).toString( 'hex' ).slice( 0, 8 ) // 随机序列
        const order_number=now_date+random_number //组合订单号
        return order_number
}
