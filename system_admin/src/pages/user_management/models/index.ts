/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-15 16:00:38
 * @FilePath: /booking_system_admin/src/pages/user_management/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_users,query_one_user_info} from '../../../services/user';
export interface UserManagementModelState {
  // 用户列表
  userLists: Array<Object>
  // 是否展示详情
  is_detail:Boolean
  // 当前选择的用户详情
  current_user: Object
  // 预定xiangq
  is_reserve:Boolean
}

export interface UserManagementModelType {
  namespace: 'user_management';
  state: UserManagementModelState;
  effects: {
    queryList: Effect;
    queryOneUser:Effect
  };
  reducers: {
    save_lists: Reducer<UserManagementModelState>;
    set_current_user: Reducer<UserManagementModelState>
    set_is_detail: Reducer<UserManagementModelState>
    set_is_reserve: Reducer<UserManagementModelState>
  };
  subscriptions: { setup: Subscription };
}

const UserManagementModel: UserManagementModelType = {
  namespace: 'user_management',

  state: {
    userLists: [],
    is_detail:false,
    current_user: {},
    is_reserve:false
  },

  effects: {
    *queryList({ payload }, { call, put }) {
          const {data} = yield call(query_all_users, payload);

      // 异步获取之后调用reducer改变state
      yield put({
        type: "save_lists",
        payload: { userLists: data }      
      })
    },
    // 查询单个用户
    *queryOneUser({ payload }, { call, put }) {
      const {data} = yield call(query_one_user_info, payload);

      // 异步获取之后调用reducer改变state
      yield put({
        type: "set_current_user",
        payload: { current_user: data }      
      })
      yield put({
        type: "set_is_detail",
        payload: { is_detail: true }    
      })
    }
  },
  reducers: {
    // 保存用户列表
    save_lists(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
        // 设置当前选择用户
    set_is_detail(state,action) {
      return {
        ...state,
        ...action.payload
      }
    },
    // 设置当前选择用户
    set_current_user(state,action) {
      return {
        ...state,
        ...action.payload
      }
    },
    set_is_reserve(state,action) {
      return {
        ...state,
        ...action.payload
      }
    }
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

export default UserManagementModel;
