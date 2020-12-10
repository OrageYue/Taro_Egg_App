/*
 * @Author: yuncheng
 * @Date: 2020-06-10 17:16:45
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 18:06:16
 * @FilePath: /booking_system_admin/src/services/room.ts
 */ 

import request from '../utils/request';

export interface RoomParamsType {
// 之后可以添加筛选函数
    _id:String
}

export interface AddRoomParamsType {
    name: String,
    position: String,
    mark:String,
    is_open:Boolean,
    location: {
        latitude: String,
        longitude: String
    }
}

// 获取房间列表
export async function query_all_room(params:RoomParamsType) {
  return request('/api/v1/room', {
    method: 'GET',
    params: params,
  });
}

// 添加自习室
export async function add_room(params: AddRoomParamsType) {
  return request('/api/v1/room', {
    method: 'POST',
    data: params,
  });
}
// 删除自习室
export async function delete_room(params: RoomParamsType) {
  return request(`/api/v1/room/${params._id}`, {
    method: 'DELETE',
  });
}

