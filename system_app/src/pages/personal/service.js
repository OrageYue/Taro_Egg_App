/*
 * @Author: yuncheng
 * @Date: 2020-06-30 09:16:27
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-19 22:58:01
 * @FilePath: /cp_taro/src/pages/personal/service.js
 */ 

import Api from '../../utils/request'

export const userLogin = ( data ) => {
    return Api.userLogin(data)
}
// 查询自习卡和余额
export const query_study_card_list = ( data) => {
  return Api.query_study_card_list(data)
}
// 查询协议记录
export const query_agreement_record = ( data) => {
  return Api.query_agreement_record(data)
}

