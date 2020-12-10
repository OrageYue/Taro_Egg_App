/*
 * @Author: yuncheng
 * @Date: 2020-05-28 18:45:32
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-06-29 09:20:39
 * @FilePath: /cp_taro/src/pages/userCenter/model.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-05-28 18:45:32
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-29 16:49:40
 * @FilePath: /cp_taro/src/pages/userCenter/model.js
 */
import * as indexApi from './service';
export default {
    namespace: 'user',
    state: {
        userInfo: {},
    },
    effects: {
        * queryUserInfo ( { payload }, { select, call, put } ) {
            //const { key, v } = yield select( state => state.user )
            const {data,error} =   yield call(indexApi.getUserInfo, {
            ...payload
           } )
            if (!error) {
                yield put({
                type: 'updateUserInfo',
                payload: {
                    userInfo: data
                }
                })
            }
        },
        * updateUser ( { payload }, { select, call, put } ) {
            //const { key, v } = yield select( state => state.user )
            const {data,error} =   yield call(indexApi.updateUser, {
            ...payload
            } )
            console.log( '返回' )
            console.log(data)
            if (!error) {
                yield put({
                type: 'updateUserInfo',
                payload: {
                    userInfo: data
                }
                })
            }
            }
    },
    reducers: {
        updateUserInfo ( state, { payload: data } ) {
            return { ...state, ...data }
    }
    },
};