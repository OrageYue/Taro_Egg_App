
import Taro, { useState, useEffect, useDidHide, usePullDownRefresh } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { AtTabs, AtTabsPane } from 'taro-ui';

import './activity.scss';
import { MAINHOST } from '../../config/index';
import ActivityCard from './component/activityCard';
import ReserveDetail from './component/reseveDetail';
import NoData from '../../component/noData';
// import { } from '../../components'
const tabList = [ { title: '全部活动' }, { title: '我的活动' } ];
function Activity ( { activity, dispatch, personal } ) {

  const [ current, set_current ] = useState( 0 );
  // 预定modal
  const [ is_server_activity, set_server_activity ] = useState( false );
  // 当前选择的activity
  const [ current_activity, set_current_activity ] = useState( {} );
  // 折扣规则
  const [ price_rules, set_rules ] = useState( {} );

  const handle_click_tab = ( e ) => {
    set_current( e );
    console.log( e );
    switch ( e )
    {
      case 0:
        handle_all_activities();
        break;
      case 1:
        handle_user_activities();
        break;
      default:
        break;
    }
  };
  useEffect( () => {
    handle_all_activities();
  }, [] );
  // 下拉刷新
  usePullDownRefresh( () => {
    // 请求数据
    handle_all_activities();
    setTimeout( () => {
      Taro.stopPullDownRefresh();
      Taro.showToast( {
        title: "刷新成功",
        icon: "success",
        duration: 1000
      } );
    }, 1000 );
  } );
  // 页面切换
  useDidHide( () => {
    set_server_activity( false );
    set_current_activity( {} );
  } );
  const handle_all_activities = () => {
    dispatch( {
      type: "activity/get_activies",
    } );
  };
  // 查询用户预订
  const handle_user_activities = async () => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/activitybooking/${ personal.userInfo.u_id }`,
      method: "GET"
    } );
    console.log( res.data.data );
    dispatch( {
      type: "activity/update_activities",
      payload: {
        activities: res.data.data
      }
    } );
  };
  // 打开预定
  const handle_resrver_activity = async ( item ) => {
    console.log( item );
    set_current_activity( item );
    // 获取折扣信息
    const rule_id = item.rules;
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/activity_rule/${ rule_id }`,
      method: "GET"
    } );

    set_rules( res.data.data );

    set_server_activity( true );
  };

  // 关闭预定
  const handle_resrver_cancel = () => {
    handle_all_activities();
    set_server_activity( false );
    set_current_activity( {} );
  };
  // 创建预定单
  const handle_reserve_submit = async () => {
    console.log( personal );
    const is_ifinite = personal.userInfo.is_ifinite_user;
    // 创建预定信息
    const payload = {
      // 活动id
      a_id: current_activity._id,
      // 用户id
      u_id: personal.userInfo.u_id,
      // 用户name
      u_name: personal.userInfo.name,
      // 用户折扣类型(是否付费卡用户折扣)
      price_type: is_ifinite ? "ifinite" : "normal",
      // 折扣
      price_rule: is_ifinite ? price_rules.ifinite_rule : price_rules.normal_rule,
      // 支付方式
      pay_method: "hour_card",
      // 支付金额（小时卡）
      pay_amount: is_ifinite ? parseFloat( ( current_activity.price * price_rules.ifinite_rule * 0.1 ).toFixed( 2 ) ) : parseFloat( ( current_activity.price * price_rules.normal_rule * 0.1 ).toFixed( 2 ) ),
      // 备注
      mark: ""
    };
    // 获取当前用户hour_card余额
    const hour_card = personal.study_card_lists.find( v => {
      return v.type == 'hour_card';
    } );
    const hour_card_remain = hour_card.remain;
    // 检查余额是否充足（规则：小时卡余额>pay_amount）
    if ( hour_card_remain >= payload.pay_amount )
    {
      // 余额充足，创建交易
      await post_reserve_record( payload );

    } else
    {
      // 余额不足
      user_remain_not_enought();
    }
  };

  // 执行提交请求数据操作
  const post_reserve_record = async ( payload ) => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/activitybooking`,
      method: "POST",
      data: payload
    } );
    if ( res.data.code == 1 )
    {
      Taro.showToast( {
        title: "预定成功",
        icon: "success"
      } );
      handle_resrver_cancel();
    } else
    {
      Taro.showToast( {
        title: `${ res.data.error }`,
        icon: "none"
      } );
    }
  };
  // 余额不足操作
  const user_remain_not_enought = () => {
    // 弹出提示
    Taro.showModal( {
      title: "提示",
      content: "余额不足，请先充值小时卡后进行支付",
      confirmColor: "#00D0C7 ",
      confirmText: "去充值",
      success: function ( res ) {
        if ( res.confirm )
        {
          // 去充值
          handle_resrver_cancel();
        } else if ( res.cancel )
        {
          // 什么也不做
        }
      }
    } );

  };

  // 取消预定操作
  const handle_cancel_reserve = () => {
    Taro.showModal( {
      title: "提示",
      content: '您确定要取消吗?',
      success: function ( res ) {
        if ( res.confirm )
        {
          console.log( '用户点击确定' );
        } else if ( res.cancel )
        {
          console.log( '用户点击取消' );
        }
      }
    } );
  };

  // 请求后端取消预定
  const post_cancel = async ( item ) => {
    const u_id = personal.userInfo.u_id;
    const a_number = item.a_number;
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/activitybooking/${ u_id }`,
      method: "PUT",
      data: {
        a_number: a_number
      }
    } );
    if ( res.data.code == 1 )
    {
      Taro.showToast( {
        title: "取消成功",
        icon: "success"
      } );
      set_current( 0 );
      handle_all_activities();
      handle_user_activities();
      // Taro.switchTab( {
      //   title: "../pages/activity/activity"
      // } );
    }
  };
  return (
    <View className='appointment-wrap'>
      <View style={ { position: "absolute" } }>
        <View >
          <AtTabs swipeable current={ current } tabList={ tabList } onClick={ handle_click_tab } >
            <AtTabsPane current={ current } index={ 0 } customStyle={ { color: "#000000" } } >
              <View className="coupon-content" >
                <ActivityCard
                  handle_resrver_activity={ handle_resrver_activity }
                  activities={ activity.activities } />

              </View>
            </AtTabsPane>
            <AtTabsPane current={ current } index={ 1 } >
              <View className="coupon-content">
                <ActivityCard
                  handle_resrver_activity={ handle_resrver_activity }
                  post_cancel={ post_cancel }
                  activities={ activity.activities }
                  is_user_reserve={ true }
                />

              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
      {/* 预定弹窗 */ }
      { is_server_activity &&

        <ReserveDetail
          current_activity={ current_activity }
          handle_resrver_cancel={ handle_resrver_cancel }
          handle_reserve_submit={ handle_reserve_submit }
          userInfo={ personal.userInfo }
          price_rules={ price_rules }

        />
      }

    </View>
  );
}
Activity.config = {
  navigationBarTitleText: '活动预定',
  enablePullDownRefresh: true
};
export default connect( ( { activity, personal } ) => ( {
  activity: activity,
  personal: personal
} ) )( Activity );
