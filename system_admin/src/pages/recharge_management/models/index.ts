/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-15 15:53:06
 * @FilePath: /booking_system_admin/src/pages/recharge_management/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_rechage } from '../../../services/recharge';
import {query_one_user_info} from '../../../services/user'
export interface RechargeManagementModelState {
  // 预定列表
  rechargeLists: Array<Object>
}

export interface  RechargeManagementModelType {
  namespace: 'recharge_management';
  state: RechargeManagementModelState;
  effects: {
    queryList: Effect;
    
  };
  reducers: {
    save_lists: Reducer<RechargeManagementModelState>;
  };
  subscriptions: { setup: Subscription };
}

const  RechargeManagementModel:  RechargeManagementModelType = {
  namespace: 'recharge_management',

  state: {
    rechargeLists: [],
  },

  effects: {
    *queryList({ payload }, { call, put }) {
          const {data} = yield call(query_all_rechage, payload);

      // 异步获取之后调用reducer改变state
      yield put({
        type: "save_lists",
        payload: { rechargeLists: data||[] }      
      })
      },
  },
  reducers: {
    // 保存列表
    save_lists(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};

export default RechargeManagementModel;
