/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-06 16:43:14
 * @FilePath: /booking_system_admin/src/pages/login/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_reserve} from '../../../services/reserve';
export interface LoginModelState {
  // 预定列表
  user_info: Object
}

export interface  LoginModelType {
  namespace: 'user_login';
  state: LoginModelState;
  effects: {
    queryList: Effect;
    
  };
  reducers: {
    save_user: Reducer<LoginModelState>;
  };
  subscriptions: { setup: Subscription };
}

const  LoginModel:  LoginModelType = {
  namespace: 'user_login',

  state: {
    user_info: {},
  },

  effects: {
    *queryList({ payload }, { call, put }) {
    }
  },
  reducers: {
    // 保存列表
    save_user(state, action) {
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

export default LoginModel;
