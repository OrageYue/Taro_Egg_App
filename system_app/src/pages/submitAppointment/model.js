/*
 * @Author: yuncheng
 * @Date: 2020-06-29 09:16:28
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-08-13 10:45:58
 * @FilePath: /cp_taro/src/pages/submitAppointment/model.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-06-29 09:16:28
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-04 22:28:50
 * @FilePath: /cp_taro/src/pages/submitAppointment/model.js
 */ 

// import Taro from '@tarojs/taro';
import * as submitAppointmentApi from './service';

export default {
  namespace: 'submitappointment',
  state: {
    // 可支付方式
    payment_methods: [
      {
        c_id: 1000,
        name: '小时卡',
        type:'hour_card'
      },
      {
        c_id: 2000,
        name: '日卡',
        type:'day_card'
      }
    ],
    current_pay_method: {},
    // 选择卡的余额
    current_pay_method_remain: 0,
    // 预定状态
    appointment_status: {}
    
  },

  effects: {
    // 查询所有支付卡方式
    * query_cards ( { payload }, { select, call, put } ) {
      const {data,error} =   yield call(submitAppointmentApi.query_all_cards, {
        ...payload
        } )
      if ( !error && data )
      {
          //  添加美团入口
        const new_data = data.concat(
          {
          c_id: 9999,
          name: '美团点评',
          type:'meituan'
          } )
        console.log( '刷新数据' )
         console.log(data)
        console.log(new_data)
            yield put({
            type: 'update_payment_method',
            payload: {
                payment_methods: new_data||0
            }
            } )
        }
    },
    // 获取用户对应卡的余额
    * query_user_cards_remain ( { payload }, { select, call, put } ) {
        const {data,error} =   yield call(submitAppointmentApi.query_user_card_remain, {
        ...payload
        } )
      if ( !error )
      {
        yield put({
            type: 'update_current_pay_method_remain',
            payload: {
                current_pay_method_remain: data
            }
            } )
      }
    },
    // 提交用户预定信息
    * handle_submit_reserve ( { payload }, { select, call, put } ) {
      const res = yield call( submitAppointmentApi.handle_submit_reserve, {
        ...payload
      } )

      if ( !res.error  )
      {
        yield put( {
          type: "update_appointment_status",
          payload: {
            appointment_status:res.data
          }
        })
      } else
      {
        yield put( {
          type: "update_appointment_status",
          payload: {
            appointment_status:res
          }
        })
      }
    }

  },

  reducers: {
    // 更新可选支付类型
    update_payment_method ( state, { payload: data } ) {
      return {...state,...data}
    },
    // 选择支付类型
    select_payment (state,{payload:data}) {
      return { ...state, ...data }
    },
    // 更新选择支付类型对应的余额
    update_current_pay_method_remain ( state, { payload: data } ) {
      return{...state,...data}
    },
    // 提交反馈状态
    update_appointment_status ( state, { payload: data } ) {
      return { ...state, ...data }
    },
    // 退出页面清空数据
    clear_all_appointment ( state, { payload: data } ) {
      return { ...state, ...data }
      
    }
  }

}
