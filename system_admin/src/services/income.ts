/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-06-12 17:59:13
 * @FilePath: /my_workStation_web/src/services/income.ts
 */ 

import request from '../utils/request';

export interface IncomeParamsType {
    amount: Number;
    profit: Number;
    source: String;  
    income_time:String
}

export interface IncomeIdType{
    id:Number
}
// 添加收入
export async function addIncome(params: IncomeParamsType) {
  return request('/api/income', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params: IncomeIdType) {
    console.log('params')
    console.log(params)
    return request(`/api/income/${params.id}`, {
        method: "GET"
    })
}
// 获取收入数据
export async function getIncomes() {
  return request(`/api/incomes`);
}