/*
 * @Author: yuncheng
 * @Date: 2020-06-28 17:27:20
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-09-28 10:31:40
 * @FilePath: /cp_taro/src/pages/main/model.js
 */
import * as mainApi from './service';
export default {
  namespace: 'home',
  state: {
    // 自习室列表
    roomlists: [
      {
        v_id: "1287",
        name: "BAMBOOM自习室",
        position: "上海市静安区南京西路街道青海路118号28楼",
        location: {
          latitude: 31.227171208372443,
          longitude: 121.46905173663852,
        },
        mark: "备注",
        created_time:"2019-09-23"
      },
      {
        v_id: "1287",
        name: "自习室2",
        position: "上海市杨浦区国正中心",
        location: {
          latitude: 123.2,
          longitude: 98.2
        },
        mark: "备注",
        created_time:"2019-09-23"
      }
    ],
    // 运营时间(后端可获取，整数)
    business_hours: [
      '09:00', '09:10', '09:20', '09:30', '09:40', '09:50',
      '10:00', '10:10', '10:20', '10:30', '10:40', '10:50',
      '11:00', '11:10', '11:20', '11:30', '11:40', '11:50',
      '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
      '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
      '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
      '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
      '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
      '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
      '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
      '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
      '20:00', '20:10', '20:20', '20:30', '20:40', '20:50',
      '21:00', '21:10', '21:20', '21:30', '21:40', '21:50',
      '22:00',
    ],
    // 选择日期
    select_date:"2020/09/21",
    // 选择时间
    start_time: '',
    end_time:''
    },
  effects: {
        * queryRoomList ( { payload }, { select, call, put } ) {
            const {data,error} =   yield call(mainApi.getRoomList, {
            ...payload
           } )
            if (!error) {
                yield put({
                type: 'updateRoomList',
                payload: {
                    roomlists: data
                }
                })
            }
        },
    },
  reducers: {
    select_date ( state, { payload: data } ) {
      return { ...state, ...data }
      },
    select_start_time ( state, { payload: data } ) {
        return {...state,...data}
      },
    select_end_time ( state, { payload: data } ) {
        return {...state,...data}
    },
    updateRoomList ( state, { payload: data } ) {
      return { ...state, ...data }
  }
  },
};