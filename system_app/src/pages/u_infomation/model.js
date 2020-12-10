
// import Taro from '@tarojs/taro';
import * as u_infomationApi from './service';

export default {
  namespace: 'u_infomation',
  state: {
    userPhoneNumber:""
  },

  effects: {
      // 获取解密手机
    * get_user_phone ( { payload }, { select, call, put } ) {
      const {data,error} =   yield call(u_infomationApi.user_phone_cypoto, {
        ...payload
        } )
        if (!error && data ) {
            yield put({
            type: 'update_user_phone',
            payload: {
                userPhoneNumber:data.phoneNumber
            }
            } )
        }
    },
  },

  reducers: {
    update_user_phone ( state, { payload: data } ) {
      return {...state,...data}
    }
  }

}
