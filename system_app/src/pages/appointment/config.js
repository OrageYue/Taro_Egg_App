/*
 * @Author: yuncheng
 * @Date: 2020-06-28 12:09:46
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-05 10:07:47
 * @FilePath: /cp_taro/src/pages/appointment/config.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-06-28 12:09:46
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-03 17:04:50
 * @FilePath: /cp_taro/src/pages/appointment/config.js
 */ 

export default {
  // 获取预约记录
    get_reserve_records: {
        url: '/api/v1/reserve_by_uid_and_status',
        method: "GET",
  },
  // 修改订单状态
  update_appointment: {
    url: "/api/v1/reserve",
    meth:"PUT"
  }
}
