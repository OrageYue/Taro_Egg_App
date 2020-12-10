/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 10:32:14
 * @FilePath: /booking_system_admin/src/services/key.ts
 */ 

import request from '../utils/request';

export interface KeyParamsType {
    key_id: String,
    key_type:String
}
export interface KeyAddParamsType{
    key_id: String,
    key_type: String,
    key_name: String,
    key_value:String
}

// 获取充值列表（带u_id可查询单个用户）
export async function query_all_keys(params: KeyParamsType) {
  return request('/api/v1/all_security_keys', {
    method: 'GET',
    params: params,
  });
}
// 添加key
export async function addKey(params: KeyAddParamsType) {
  return request('/api/v1/all_security_keys', {
    method: 'POST',
    data: params,
  });
}
// 删除key
export async function deleteKey(key:KeyParamsType) {
  return request(`/api/v1/all_security_keys/${key.key_id}`, {
    method: 'DELETE',
   
  });
}