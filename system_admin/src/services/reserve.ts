/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-06 14:51:51
 * @FilePath: /booking_system_admin/src/services/reserve.ts
 */ 

import request from '../utils/request';

export interface ReserveParamsType {

}
export interface CancelParamsType {
    u_id:String
}
export interface CancelBodyType {
    order_num: String,
    payment_method:String
}
// 获取所有预定列表
export async function query_all_reserve(params: ReserveParamsType) {
  return request('/api/v1/reserve', {
    method: 'GET',
    params: params,
  });
}
// 取消订单
export async function cancel_reserve(params:CancelParamsType,body:CancelBodyType) {
    return request(`/api/v1/reserve/${params.u_id}`, {
        method: "PUT",
        data:body
    })
}