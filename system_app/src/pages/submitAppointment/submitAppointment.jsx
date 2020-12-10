
import Taro, { useEffect, useState, useDidShow } from '@tarojs/taro';
import { View, Picker, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './submitAppointment.scss';
import { AtDivider, AtToast, AtNoticebar, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
function SubmitAppointment ( { dispatch, home, submitappointment, personal } ) {

  const [ time_difference, set_time_difference ] = useState( 0 );//time_difference 时间差
  const [ is_notice_show, set_notice ] = useState( false );//is_notice_show临时重要通知弹框

  useEffect( () => {
    handle_time_difference();
    handle_query_all_cards();
    return () => {
      dispatch( {
        type: "submitappointment/clear_all_appointment",
        payload: {
          appointment_status: {}
        }
      } );
    };
  }, [] );
  /**
   * 页面载入函数
   */
  useDidShow( () => {
    handle_time_difference();
    handle_query_all_cards();
  } );

  /**
   * 计算时间差
   * @function handle_time_difference
   */
  const handle_time_difference = () => {
    const start = home.start_time;
    const end = home.end_time;
    const diff = handle_time( start, end );
    set_time_difference( diff );
  };

  /**
   * 时间处理逻辑
   * @function handle_time
   * @param {*} start 起始时间
   * @param {*} end   结束时间
   */
  const handle_time = ( start, end ) => {
    let total_time = [];
    // 处理小数点前面
    const pre_diff = parseFloat( end ) - parseFloat( start );
    total_time[ 0 ] = pre_diff;
    // 处理小数点后面
    const back_start = start.split( ':' );
    const back_end = end.split( ':' );
    const back_diff = back_end[ 1 ] - back_start[ 1 ];
    if ( back_diff == 30 )
    {
      // 后面==30 则记录0.5h
      total_time[ 1 ] = 5;
    } else if ( back_diff == -30 )
    {
      // 后面的是00 前面的是30 那么做减法就要前面减掉1
      total_time[ 1 ] = 5;
      total_time[ 0 ] = total_time[ 0 ] - 1;
    }
    return total_time.join( '.' );
  };

  /**
   * 获取所有支付类型
   * @function handle_query_all_cards
   */
  const handle_query_all_cards = () => {
    dispatch( {
      type: "submitappointment/query_cards",
    } );
    handle_select_pay( { detail: { value: 0 } } );
  };

  /**
   * 选择支付方式
   * @function handle_select_pay
   * @param {*} e 选择事件参数
   */
  const handle_select_pay = ( e ) => {
    dispatch( {
      type: "submitappointment/select_payment",
      payload: {
        current_pay_method: submitappointment.payment_methods[ e.detail.value ]
      }
    } );
    const payload = {
      u_id: personal.userInfo.u_id,
      c_id: submitappointment.payment_methods[ e.detail.value ].c_id
    };
    dispatch( {
      type: "submitappointment/query_user_cards_remain",
      payload: payload
    } );
  };

  /**
   * 提交预定信息函数
   * @function handle_submit_appointment
   */
  const handle_submit_appointment = async () => {
    await Taro.requestSubscribeMessage( {
      tmplIds: [ 'osZUlOK27gcOmcN2_bFZLshYcPrV1dbdVTeDsAi7ZsY' ]
    } );
    const payload = {
      u_id: personal.userInfo.u_id,
      start_time: home.select_date + ' ' + home.start_time,
      end_time: home.select_date + ' ' + home.end_time,
      total: time_difference,
      card_id: submitappointment.current_pay_method.c_id,
      payment_type: submitappointment.current_pay_method.type,
      card_remain: submitappointment.current_pay_method_remain
    };
    await dispatch( {
      type: "submitappointment/handle_submit_reserve",
      payload: payload
    } );
    setTimeout( () => {
      Taro.navigateBack( {
      } );
    }, 1000 );
  };

  return (
    <View className='submitAppointment-wrap'>
      <AtModal isOpened={ is_notice_show }>
        <AtModalHeader>提醒</AtModalHeader>
        <AtModalContent>
          由于国庆放假，10月10-10月3日暂停营业。
          10月4日恢复正常
          <View style={ { fontSize: "12px", marginTop: "20px" } }>  请再次确认您的时间，避免给您带来不便。如需取消，请提前到我的预约页面或者联系客服进行订单取消</View>
        </AtModalContent>
        <AtModalAction>  <Button onClick={ () => set_notice( false ) }>确定</Button> </AtModalAction>
      </AtModal>
      <AtToast isOpened={ submitappointment.appointment_status.code == 1 } text="预定成功" icon="check"></AtToast>
      <AtToast isOpened={ submitappointment.appointment_status.code == 404 } text={ `${ submitappointment.appointment_status.error }` } icon="close"></AtToast>
      <View className="submitAppointment-top">
        <AtNoticebar icon='volume-plus' marquee >
          请务必妥善保管您的随身物品，若发生遗失的，除能证明是本自习室的过错外，本自习室不承担任何责任。
          未成年人使用本自习室的，其监护人应当对其妥善接送，本自习室不对该未成年人负有任何监护义务。
          </AtNoticebar>
        <View className="submitAppointment-top-card">
          {/* 时间确认区域 */ }
          <View >
            {/* 左边图标 */ }
            <Image
              src='https://booking-system-resource.oss-cn-beijing.aliyuncs.com/start_end.png'
              style={ { float: "left", width: "9px", height: "117px", marginLeft: "20px", marginTop: "32px" } } />
            {/* 右边时间选择器 */ }
            <View style={ { width: "100%", paddingLeft: "40px", paddingTop: "25px" } }>
              {/* 开始时间 */ }
              <View>
                <Text style={ { fontSize: "18px" } }>
                  开始时间:
                </Text>
                <Text style={ { fontSize: "16px", marginLeft: "20px" } }>
                  { String( home.select_date ) } { home.start_time }
                </Text>
              </View>
              <AtDivider lineColor="#f0f0f0" customStyle={ { width: "80%", marginRight: "20%", marginTop: "10px" } }></AtDivider>
              {/* 结束时间 */ }
              <View style={ { marginTop: "10px" } }>
                <Text style={ { fontSize: "18px" } }>
                  结束时间:
                </Text>
                <Text style={ { fontSize: "16px", marginLeft: "20px" } }>
                  { home.select_date } { home.end_time }
                </Text>
              </View>
            </View>
          </View>
          {/* 分割线 */ }
          <AtDivider lineColor="#ffffff" style={ { width: "90%" } } />
          {/* 合计时间 */ }
          <View style={ { paddingRight: "10%" } }>
            <View style={ { float: "left" } }>
              <Text style={ { fontSize: "14px" } }>合计时间</Text>
            </View>
            <View style={ { float: "right" } }>
              <Text style={ { fontSize: "14px" } }>{ time_difference }</Text>
            </View>
          </View>
          {/* 分割线 */ }
          <AtDivider lineColor="#ffffff" style={ { width: "90%" } } />
          {/* 支付方式 */ }
          <View style={ { paddingRight: "10%" } }>
            <View style={ { float: "left" } }>
              <Text style={ { fontSize: "14px" } }>选择支付卡类型</Text>
            </View>
            <View style={ { float: "right" } }>
              <Picker mode='selector' range={ submitappointment.payment_methods } rangeKey='name' onChange={ handle_select_pay }>
                <View className='picker' style={ { color: "#FFD322" } }>
                  { submitappointment.current_pay_method.name || '请选择' }
                </View>
              </Picker>
            </View>
          </View>
          <AtDivider lineColor="#ffffff" style={ { width: "90%" } } />
          {/* 美团入口判断 */ }
          { submitappointment.current_pay_method.type == 'meituan' ?
            null
            :
            < view >
              {
                submitappointment.current_pay_method_remain && submitappointment.current_pay_method_remain >= 1
                  ?
                  <View style={ { paddingRight: "10%" } }>
                    <View style={ { float: "left" } }>
                      <Text style={ { fontSize: "14px" } }>可用时长确认</Text>
                    </View>
                    <View style={ { float: "right" } }>
                      <Text>
                        { submitappointment.current_pay_method_remain }
                      </Text>
                    </View>
                  </View>
                  :
                  <View style={ { paddingRight: "10%" } }>
                    <View style={ { float: "left" } }>
                      <Text style={ { fontSize: "14px" } }>卡余额不足，您可以选择其他卡或者</Text>
                      <Text style={ { fontSize: "14px", color: "#00D0C7", margin: " 0 5px" } }
                        onClick={ () => {
                          Taro.switchTab( {
                            url: "../../pages/personal/personal"
                          } );
                        } }>去充值
                  </Text>
                      <Text style={ { fontSize: "14px" } }>后预约</Text>
                    </View>
                  </View>
              }
            </view>
          }
          {/* 提交按钮 */ }
          {/* 添加美团按钮 */ }
          <View style={ { marginTop: "80px" } }>
            { submitappointment.current_pay_method.type == 'meituan' ?
              <Button className="appoint-btn" onClick={ handle_submit_appointment }>美团预约</Button>
              :
              <Button disabled={ !submitappointment.current_pay_method_remain || submitappointment.current_pay_method_remain < 1 } className="appoint-btn" onClick={ handle_submit_appointment }>提交预约</Button>
            }
          </View>
        </View>
      </View>
    </View>
  );
}
SubmitAppointment.config = {
  navigationBarTitleText: '提交预约'
};
export default connect( ( { submitappointment, home, personal } ) => ( {
  submitappointment,
  home,
  personal
} ) )( SubmitAppointment );
