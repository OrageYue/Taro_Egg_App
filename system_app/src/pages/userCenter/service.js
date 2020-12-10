/*
 * @Author: yuncheng
 * @Date: 2020-05-29 10:37:31
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-29 16:42:45
 * @FilePath: /cp_taro/src/pages/userCenter/service.js
 */ 
import Api from '../../utils/request'
import Taro, { Component } from '@tarojs/taro'
export const getUserInfo = ( data ) => {

     return Api.getUserInfo(data)

}

export const updateUser = ( data ) => {
    return Api.updateUser(data)
}