/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-15 11:01:11
 * @FilePath: /booking_system_admin/src/services/recharge.ts
 */ 

import request from '../utils/request';

export interface RechargeParamsType {
    u_id:String
}
export interface CancelParamsType {
    u_id:String
}
export interface CancelBodyType {
    order_num: String,
    payment_method:String
}
// 获取充值列表（带u_id可查询单个用户）
export async function query_all_rechage(params: RechargeParamsType) {
  return request('/api/v1/user_recharge', {
    method: 'GET',
    params: params,
  });
}
