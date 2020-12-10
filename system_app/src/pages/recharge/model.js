
// import Taro from '@tarojs/taro';
import * as rechargeApi from './service';

export default {
  namespace: 'recharge',
  state: {
    // 当前进入的卡
    current_study_card:{}
  },

  effects: {},

  reducers: {
    handle_set_current_card ( state, { payload: data } ) {
      return { ...state, ...data }
      },
  }

}
