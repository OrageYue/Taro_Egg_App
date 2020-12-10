/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 23:05:12
 * @FilePath: /booking_system_admin/src/pages/feedback_management/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_feedback} from '../../../services/feedback';
export interface FeedbackManagementModelState {
  // 所有反馈列表
  feedbackLists: Array<Object>
}

export interface  FeedbackManagementModelType {
  namespace: 'feedback_management';
  state: FeedbackManagementModelState;
  effects: {
    query_feedback_list: Effect;
    
  };
  reducers: {
    save_lists: Reducer<FeedbackManagementModelState>;
  };
  subscriptions: { setup: Subscription };
}

const  FeedbackManagementModel:  FeedbackManagementModelType = {
  namespace: 'feedback_management',

  state: {
    feedbackLists: [],
  },

  effects: {
    *query_feedback_list({ payload }, { call, put }) {
        const {data} = yield call(query_all_feedback, payload);
        // 异步获取之后调用reducer改变state
        yield put({
            type: "save_lists",
            payload: { feedbackLists: data||[] }      
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

export default FeedbackManagementModel;
