
// import Taro from '@tarojs/taro';
import * as personalApi from './service';

export default {
  namespace: 'personal',
  state: {
    // 用户信息
    userInfo: {},
    // 是否打开用户协议
    is_open_agreement:false,
    // 学习卡列表
    study_card_lists: [
      {
        c_id: 1000,
        name: '小时卡',
        type: 'hour_card',
        package: [
          {
            id: 1001,
            name: "套餐一",
            p_amount: 19.00,
            type:'hour',
            total:1
          },
          {
            id: 1002,
            name: "套餐二",
            p_amount: 29.00,
            type:'hour',
            total:4
          },
          {
            id: 1003,
            name: "套餐三",
            p_amount: 190.00,
            type:'hour',
            total:10
          }
        ],
        created_time:"2020-09-12"
      },
      {
        c_id: 2000,
        name: '日卡',
        type: 'day_card',
        package: [
          {
            id: 2001,
            name: "套餐一",
            p_amount: 29,
            type:"day",
            total:2
          }
        ],
        created_time:"2020-09-12"
      },
    ]
  },

  effects: {
    // 用户登录
    * handle_user_login ( { payload }, { select, call, put } ) {
        const {data,error} =   yield call(personalApi.userLogin, {
        ...payload
        } )
      if ( !error && data )
      {
        // ----->保存用户信息
        yield put({
          type: 'updateUserInfo',
          payload: {
              userInfo: data
          }
        })
        // ----->获取到用户数据后请求卡片
        yield put( {
          type: "personal/query_study_list",
            payload: {
            u_id: data.u_id
            }
        } )
        // ----->查询用户提交的协议记录
        const agree_payload = {
          u_id: data.u_id,
        }
        const res =   yield call(personalApi.query_agreement_record, {
        ...agree_payload
        } )
        if ( res.code == 404 )
        {
          // 用户没有同意协议,打开协议
          yield put( {
            type: "personal/set_open_user_agreement",
            payload: {
              is_open_agreement: true
            }
        } )
        }
      }
      
  },
    // 查询卡片情况
    * query_study_list ( { payload }, { select, call, put } ) {
      const {data,error} =   yield call(personalApi.query_study_card_list, {
        ...payload
        } )
        if (!error && data ) {
            yield put({
            type: 'updateCardList',
            payload: {
                study_card_lists: data
            }
            })
        }
    }
  },

  reducers: {
    updateUserInfo ( state, { payload: data } ) {
      return {...state,...data}
    },
    updateCardList ( state, { payload: data } ) {
      return {...state,...data}
    },
    set_open_user_agreement( state, { payload: data } ) {
      return {...state,...data}
    },
  }

}
