/*
 * @Author: yuncheng
 * @Date: 2020-07-23 08:26:08
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-23 17:58:53
 * @FilePath: /cp_taro/src/pages/activity/model.js
 */ 

// import Taro from '@tarojs/taro';
import * as activityApi from './service';

export default {
  namespace: 'activity',
  state: {
    activities:[]
  },

  effects: {
    * get_activies( { payload }, { select, call, put } ) {
        const {data,error} =   yield call(activityApi.get_all_activities, {
        ...payload
        } )
        if (!error) {
            yield put({
            type: 'update_activities',
            payload: {
                activities: data
            }
            })
        }
  },
  },

  reducers: {
    update_activities ( state, { payload: data } ) {
      return {
        ...state,
        ...data
      }
    }
  }

}
