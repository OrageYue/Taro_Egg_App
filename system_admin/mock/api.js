/*
 * @Author: yuncheng
 * @Date: 2020-06-09 15:55:56
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-06-12 18:22:52
 * @FilePath: /my_workStation_web/mock/api.js
 */ 
import mockjs from 'mockjs';
export default {
    // 使用 mockjs 等三方库
    'GET /api/tags': mockjs.mock( {
        'list|100': [ { name: '@city', 'value|1-100': 50, 'type|0-2': 1 } ],
    } ),
    'POST /api/login': mockjs.mock( {
    "code":1
    } ),
    // 获取收入列表
    'GET /api/incomes': mockjs.mock( {
    'list|100': [{ 'id|1-100': 1,'income_source': '@city', 'income_amount|1-100': 50, 'income_cost|1-100': 50,'income_profit|1-100': 50,'income_time|1-100': 50, }],
    } ), 
    // 获取单个收入详情
    "GET /api/income/7": mockjs.mock( {
        "content": {
            "id": 1,
            'income_source': '@city',
            'income_amount|1-100': 1,
            'income_cost|1-100': 1,
            'income_profit|1-100': 1,
            'income_time|1-100': 1,
            'mark': "@name",
            'cost_table|5': [ {
                "cost_item":"@name",
                "cost_amount": 2,
                "cost_mark":"@city"
            } ],
            "create_time|1-20":2
        }
    })
};