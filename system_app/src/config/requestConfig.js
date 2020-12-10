/*
 * @Author: yuncheng
 * @Date: 2020-05-29 09:04:55
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-08-04 18:29:41
 * @FilePath: /cp_taro/src/config/requestConfig.js
 */ 
/**
 * 公共参数
 */
import user from '../pages/userCenter/config'
import room from '../pages/main/config'
import personal from '../pages/personal/config'
import submitappointment from '../pages/submitAppointment/config'
import appointment from '../pages/appointment/config'
import u_infomation from '../pages/u_infomation/config'
import activity from '../pages/activity/config'
export const conmomPrams = {}
 
/**
 * 请求映射文件
 */
export const requestConfig = {
    loginUrl: '/api/v1/wxlogin', // 微信登录接口
    ...user, //用户相关Api配置
    ...room,//主页面相关Api
    ...personal,//用户中心相关Api
    ...submitappointment,//提交预约页面相关
    ...appointment,//预定相关
    ...u_infomation,//个人信息提交相关
    ...activity//活动
    
}