/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-06 10:55:34
 * @FilePath: /booking_system_admin/src/pages/reserve_management/model/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_reserve} from '../../../services/reserve';
export interface ReserveManagementModelState {
  // 预定列表
  reserveLists: Array<Object>
}

export interface  ReserveManagementModelType {
  namespace: 'reserve_management';
  state: ReserveManagementModelState;
  effects: {
    queryList: Effect;
    
  };
  reducers: {
    save_lists: Reducer<ReserveManagementModelState>;
  };
  subscriptions: { setup: Subscription };
}

const  ReserveManagementModel:  ReserveManagementModelType = {
  namespace: 'reserve_management',

  state: {
    reserveLists: [],
  },

  effects: {
    *queryList({ payload }, { call, put }) {
          const {data} = yield call(query_all_reserve, payload);

      // 异步获取之后调用reducer改变state
      yield put({
        type: "save_lists",
        payload: { reserveLists: data }      
      })
    }
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

export default ReserveManagementModel;
