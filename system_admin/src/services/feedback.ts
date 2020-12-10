/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 22:54:20
 * @FilePath: /booking_system_admin/src/services/feedback.ts
 */ 

import request from '../utils/request';

export interface  FeedbackParamsType {

}
// 获取反馈列表
export async function query_all_feedback(params: FeedbackParamsType) {
  return request('/api/v1/feedback', {
    method: 'GET',
    params: params,
  });
}
