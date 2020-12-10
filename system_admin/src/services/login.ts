/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-06 15:58:54
 * @FilePath: /booking_system_admin/src/services/login.ts
 */ 

import request from '../utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function userLogin(params: LoginParamsType) {
  return request('/api/v1/admin_login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha() {
  return request(`/api/tags`);
}