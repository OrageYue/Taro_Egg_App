/*
 * @Author: yuncheng
 * @Date: 2020-06-29 09:16:28
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-07 09:26:18
 * @FilePath: /cp_taro/src/pages/submitAppointment/service.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-06-29 09:16:28
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-03 10:24:11
 * @FilePath: /cp_taro/src/pages/submitAppointment/service.js
 */ 

import Api from '../../utils/request'

// 查询所有可用支付卡类型
export const query_all_cards = () => {
  return Api.query_all_cards()
}
// 查询用户对应卡余额
export const query_user_card_remain = (data) => {
  return Api.query_user_card_remain(data)
}
// 提交预定信息
export const handle_submit_reserve = ( data ) => {
  return Api.handle_submit_reserve( data )
}