/*
 * @Author: yuncheng
 * @Date: 2020-06-12 11:16:34
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-08-27 14:57:57
 * @FilePath: /booking_system_admin/src/pages/card_management/models/index.ts
 */ 
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { query_all_cards} from '../../../services/card';
export interface CardManagementModelState {
  // 所有card列表
    cardLists: Array<Object>
    //是否展示套餐
    is_open_package: Boolean
    // 当前选择的卡
    current_select_card:Object
}

export interface  CardManagementModelType {
  namespace: 'card_management';
  state: CardManagementModelState;
  effects: {
    query_card_list: Effect;
    
    
  };
    reducers: {
    //   保存数据
        save_lists: Reducer<CardManagementModelState>
    //  设置是否展示套餐
        set_is_open_package: Reducer<CardManagementModelState>
    // 设置当前选择的card
        set_current_card:Reducer<CardManagementModelState>
      
  };
  subscriptions: { setup: Subscription };
}

const  CardManagementModel:  CardManagementModelType = {
  namespace: 'card_management',

  state: {
      cardLists: [],
      is_open_package: false,
     current_select_card:{}
  },

  effects: {
    *query_card_list({ payload }, { call, put }) {
        const {data} = yield call(query_all_cards, payload);
        // 异步获取之后调用reducer改变state
        yield put({
            type: "save_lists",
            payload: { cardLists: data||[] }      
        })
      },
  },
  reducers: {
    // 保存card列表
    save_lists(state, action) {
      return {
        ...state,
        ...action.payload,
      };
      },
    //   操作套餐是否展示
      set_is_open_package(state, action) {
          return {
              ...state,
              ...action.payload
          }
      },
    //   设置当前选择的card
      set_current_card(state, action) {
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

export default CardManagementModel;
