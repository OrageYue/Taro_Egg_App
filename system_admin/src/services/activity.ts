/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-24 11:04:05
 * @FilePath: /booking_system_admin/src/services/activity.ts
 */ 

import request from '../utils/request';
// ---------------------------------------------->规则相关<----------------------------------------------
export interface RuleIdType {
    _id:String
}
export interface RuleParamsType {
    r_name: String,
    normal_rule: Number,
    ifinite_rule: Number,
    mark:String
}
// 获取规则列表
export async function query_all_rules(params: RuleParamsType) {
  return request('/api/v1/activity_rule', {
    method: 'GET',
    params: params,
  });
}
// 查询单个规则
export async function query_one_rule(_id:RuleIdType) {
    return request(`/api/v1/activity_rule/${_id}`, {
        method: 'GET',
  });
}
// 添加规则数据
export async function add_rules(params: RuleParamsType) {
    return request('/api/v1/activity_rule', {
        method: 'POST',
        data: params,
  });
}
// 编辑规则数据
export async function edit_rules(_id:RuleIdType,params: RuleParamsType) {
    return request(`/api/v1/activity_rule/${_id}`, {
        method: 'PUT',
        data: params,
  });
}
// 删除规则数据
export async function delete_rules(_id:RuleIdType) {
    return request(`/api/v1/activity_rule/${_id}`, {
        method: 'DELETE',
  });
}
// ---------------------------------------------->活动相关<----------------------------------------------

export interface ActivityParamsType{

}
export interface ActivityIdType{
      _id:String
}
// 获取所有活动
export async function query_all_activities(params: ActivityParamsType) {
  return request('/api/v1/activity', {
    method: 'GET',
    params: params,
  });
}
// 添加活动数据
export async function add_activity(params: ActivityParamsType) {
    return request('/api/v1/activity', {
        method: 'POST',
        data: params,
  });
}
// 编辑活动数据
export async function edit_activity(_id:ActivityIdType,params: ActivityParamsType) {
    return request(`/api/v1/activity/${_id}`, {
        method: 'PUT',
        data: params,
  });
}
// 删除活动数据
export async function delete_activity(_id:RuleIdType) {
    return request(`/api/v1/activity/${_id}`, {
        method: 'DELETE',
  });
}
// 查询活动报名人员
export async function query_activity_users(_id:ActivityIdType) {
  return request(`/api/v1/activity/${_id}`, {
    method: 'GET',

  });
}