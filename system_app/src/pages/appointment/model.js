/*
 * @Author: yuncheng
 * @Date: 2020-06-28 12:09:46
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-23 10:42:37
 * @FilePath: /cp_taro/src/pages/appointment/model.js
 */ 

// import Taro from '@tarojs/taro';
import * as appointmentApi from './service';

export default {
  namespace: 'appointment',
  state: {
    // 预约数据：根据不同类型请求
    appointLists: [

    ]
  },

  effects: {
    // 获取预约记录
    * get_reserve_record ( { payload }, { select, call, put } ) {
            const {data,error} =   yield call(appointmentApi.get_reserve_record, {
            ...payload
           } )
            if (!error) {
                yield put({
                type: 'update_appointLists',
                payload: {
                    appointLists: data
                }
                })
            }
    },
    
  },

  reducers: {
    update_appointLists ( state, { payload:data } ) {
      return {...state,...data}
    }
  }

}
