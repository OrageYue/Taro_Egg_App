/*
 * @Author: yuncheng
 * @Date: 2020-05-28 18:42:21
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-23 10:42:11
 * @FilePath: /cp_taro/src/models/index.js
 */ 
import user from '../pages/userCenter/model.js'
import home from '../pages/main/model.js'
import submitappointment from '../pages/submitAppointment/model.js'
import activity from '../pages/activity/model.js'
import appointment from '../pages/appointment/model.js'
import personal from '../pages/personal/model.js'
import recharge from '../pages/recharge/model.js'
import u_infomation from '../pages/u_infomation/model.js'
import u_extension from '../pages/u_extension/model.js'
import u_customService from '../pages/u_customService/model.js'
import rechargeRecord from '../pages/rechargeRecord/model.js'
export default [
    user,
    home,
    submitappointment,
    appointment,
    personal,
    u_infomation,
    u_extension,
    u_customService,
    recharge,
    rechargeRecord,
    activity
]