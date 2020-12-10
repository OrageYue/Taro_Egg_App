/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-29 11:12:06
 * @FilePath: /booking_system_admin/src/services/user.ts
 */ 

import request from '../utils/request';

export interface UserParamsType {
    phone: String,
    name:String
}

export interface UserIdType{
    id:Number
}

export interface UserCardsType{
  u_id:String
}
// 获取所有用户列表
export async function query_all_users(params: UserParamsType) {
  return request('/api/v1/users', {
    method: 'GET',
    params: params,
  });
}
// 获取所有用户列表
export async function query_one_user_info(params: UserCardsType) {
  return request('/api/v1/one_user_info', {
    method: 'GET',
    params: params,
  });
}
// 获取用户卡列表
export async function query_user_cards(params:UserCardsType) {
  return request(`/api/v1/usercard/${params.u_id}`, {
    method: "GET",
  })
}
// 获取用户预定数据
export async function query_user_reserve(params:UserCardsType) {
  return request(`/api/v1/reserve/${params.u_id}`, {
    method: 'GET',
  });
}
// 删除
export async function delete_user(id: UserIdType) {
  return request(`/api/v1/users/${id}`, {
    method: 'DELETE',
  });
}