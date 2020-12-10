
import Taro, { useState, useEffect, usePullDownRefresh, useDidShow } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './appointment.scss';
import NoData from '../../component/noData';
import CardList from './component/cardList';

const tabList = [ { title: '待使用' }, { title: '已入场' }, { title: '已完成' }, { title: "已取消" } ];
const panLists = [ 0, 1, 2, 3 ];

function Appointment ( { appointment, dispatch, personal } ) {

  const [ current, set_current ] = useState( 0 ); //current 当前选择类型
  /**
   * 页面载入事件
   */
  useDidShow( () => {
    handle_get_reserve_record( current );
  } );
  /**
   * 下拉刷新事件
   */
  usePullDownRefresh( () => {
    handle_get_reserve_record( current );
    setTimeout( () => {
      Taro.stopPullDownRefresh();
      Taro.showToast( {
        title: "刷新成功",
        icon: "success",
        duration: 1000
      } );
    }, 1000 );
  } );
  /**
   * 查询订单记录函数
   * @function handle_get_reserve_record
   * @param {*} status 订单状态查询标识
   */
  const handle_get_reserve_record = ( status ) => {
    const current_status = status + 1;
    dispatch( {
      type: "appointment/get_reserve_record",
      payload: {
        u_id: personal.userInfo.u_id,
        status: current_status

      }
    } );
  };
  /**
   * 切换当前tab函数
   * @function handle_click_tab
   * @param {*} e 切换tab事件
   */
  const handle_click_tab = ( e ) => {
    set_current( e );
    handle_get_reserve_record( e );
  };

  return (
    <View className='appointment-wrap'>
      <AtTabs swipeable current={ current } tabList={ tabList } onClick={ handle_click_tab }>
        { panLists.map( p => {
          return (
            <AtTabsPane key={ p } current={ current } index={ p } customStyle={ { color: "#000000" } } >
              {
                appointment.appointLists.length > 0
                  ?
                  <CardList />
                  :
                  <NoData />
              }
            </AtTabsPane>
          );
        } ) }
      </AtTabs>
    </View>
  );
}
Appointment.config = {
  navigationBarTitleText: '我的预定',
  enablePullDownRefresh: true
};
export default connect( ( { appointment, personal } ) => ( {
  appointment, personal
} ) )( Appointment );
