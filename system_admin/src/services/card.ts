/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-29 10:52:01
 * @FilePath: /booking_system_admin/src/services/card.ts
 */ 

import request from '../utils/request';

export interface  CardParamsType {

}
export interface CardIdType{
  
}
// 获取所有card
export async function query_all_cards(params: CardParamsType) {
  return request('/api/v1/card', {
    method: 'GET',
    params: params,
  });
}
// 编辑card
export async function update_card(id:CardIdType,params: CardParamsType) {
  return request(`/api/v1/card/${id}`, {
    method: 'PUT',
    data: params,
  });
}
