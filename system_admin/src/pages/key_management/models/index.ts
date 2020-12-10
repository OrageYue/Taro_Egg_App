/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 10:22:58
 * @FilePath: /booking_system_admin/src/pages/key_management/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_keys } from '../../../services/key';
export interface KeyManagementModelState {
  // 所有key列表
  keyLists: Array<Object>
}

export interface  KeyManagementModelType {
  namespace: 'key_management';
  state: KeyManagementModelState;
  effects: {
    querykeyList: Effect;
    
  };
  reducers: {
    save_lists: Reducer<KeyManagementModelState>;
  };
  subscriptions: { setup: Subscription };
}

const  KeyManagementModel:  KeyManagementModelType = {
  namespace: 'key_management',

  state: {
    keyLists: [],
  },

  effects: {
    *querykeyList({ payload }, { call, put }) {
        const {data} = yield call(query_all_keys, payload);
        // 异步获取之后调用reducer改变state
        yield put({
            type: "save_lists",
            payload: { keyLists: data||[] }      
        })
      },
  },
  reducers: {
    // 保存key列表
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

export default KeyManagementModel;
