/*
 * @Author: yuncheng
 * @Date: 2020-05-29 10:35:02
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-29 16:44:02
 * @FilePath: /cp_taro/src/pages/userCenter/config.js
 */ 
export default {
    // getUserInfo: '/api/v1/users', // 获取用户信息
    getUserInfo: {
        url: '/api/v1/login',
        method: "GET",
    },
    // 更新用户信息
    updateUser: {
        url: '/api/v1/users',
        method:"PUT"
    }
}