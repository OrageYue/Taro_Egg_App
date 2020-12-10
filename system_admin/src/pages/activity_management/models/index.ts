/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-22 16:05:15
 * @FilePath: /booking_system_admin/src/pages/activity_management/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_rules ,query_all_activities} from '../../../services/activity';

export interface ActivityManagementModelState {
  // 所有规则列表
    rulesLists: Array<Object>
  // 当前操作规则
    currentRule:Object
  // 所有活动列表
  activitiyLists: Array<Object>
  // 当前操作活动
    currentActivity:Object
}

export interface  ActivityManagementModelType {
  namespace: 'activity_management';
  state: ActivityManagementModelState;
    effects: {
    //   查询规则列表
      query_rule_list: Effect;
      // 查询活动列表
    query_activity_list:Effect
    
  };
  reducers: {
    save_rules_lists: Reducer<ActivityManagementModelState>;
    set_current_rule: Reducer<ActivityManagementModelState>;
    save_acivity_lists: Reducer<ActivityManagementModelState>;
    set_current_activity:Reducer<ActivityManagementModelState>;
  };
  subscriptions: { setup: Subscription };
}

const  ActivityManagementModel:  ActivityManagementModelType = {
  namespace: 'activity_management',

  state: {
      rulesLists: [],
      currentRule: {},
      activitiyLists: [],
      currentActivity:{}
  },

  effects: {
    *query_rule_list({ payload }, { call, put }) {
        const {data} = yield call( query_all_rules, payload);
        // 异步获取之后调用reducer改变state
        yield put({
            type: "save_rules_lists",
            payload: { rulesLists: data||[] }      
        })
    },
    *query_activity_list({ payload }, { call, put }) {
      const { data } = yield call(query_all_activities, payload);
        // 异步获取之后调用reducer改变state
        yield put({
            type: "save_acivity_lists",
            payload: { activitiyLists: data||[] }      
        })  
    }
    },

    reducers: {
      // 保存规则列表
    save_rules_lists(state, action) {
      return {
        ...state,
        ...action.payload,
      };
      },
      // 保存活动列表
    save_acivity_lists(state, action) {
      return {
        ...state,
        ...action.payload,
      };
      },
    //   设置当前规则
    set_current_rule(state, action) {
          return {
              ...state,
              ...action.payload
          }
      },
        //   设置当前活动
    set_current_activity(state, action) {
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

export default ActivityManagementModel;
