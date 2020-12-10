/*
 * @Author: yuncheng
 * @Date: 2020-06-28 17:27:20
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-01 17:29:13
 * @FilePath: /cp_taro/src/pages/main/service.js
 */ 

import Api from '../../utils/request'

export const getRoomList = ( data ) => {
     return Api.getRooms(data)
}
