/*
 * @Author: yuncheng
 * @Date: 2020-06-28 17:27:20
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-08-14 14:45:15
 * @FilePath: /cp_taro/src/pages/main/main.jsx
 */
import Taro, { useState, useDidShow } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { MAINHOST } from '../../config/index';
import location_icon from '../../assets/images/location_icon.png';
import SelectTime from './component/select_time';
import { handle_get_date } from '../../utils/common';
import UserAgreement from './component/user_agreement';
import { AtNoticebar } from 'taro-ui';
import './main.scss';
function Main ( { dispatch, home, personal } ) {

  const [ dateList, setDatelists ] = useState( [] );  //dateList：日期列表
  const [ currentDate, setDate ] = useState( [] );  //currentDate：当前选择的日期
  const [ agreement_contnet, setAgreementContent ] = useState( {} );  //agreement_contnet:用户协议内容

  useDidShow( () => {
    handleUserAgreement();
    handleGenerateDate();
    handleQueryRoomlists();
    handleCheckScope();
    Taro.showShareMenu( {} );
  } );

  /**
   * 检查用户小程序权限
   * @function handleCheckScope
   */
  const handleCheckScope = () => {
    Taro.getSetting( {
      success: function ( res ) {
        if ( !res.authSetting[ 'scope.userInfo' ] )
        {
          // 用户未授权，跳转授权页
          Taro.switchTab( {
            url: "../../pages/personal/personal"
          } );

        }
        else
        {
          handle_get_userinfo();
        }
      }
    } );
  };
  /**
   * 获取用户信息
   * @function handle_get_userinfo
   */
  const handle_get_userinfo = () => {
    Taro.getUserInfo( {
      success: function ( res ) {
        var userInfo = res.userInfo;
        var name = userInfo.nickName;
        var avatar_src = userInfo.avatarUrl;
        const user = {
          name,
          avatar_src
        };
        dispatch( {
          type: "personal/updateUserInfo",
          payload: {
            userInfo: user
          }
        } );
        handle_user_login( name, avatar_src );
      }
    } );
  };
  /**
   * 用户登录函数
   * @function handle_user_login
   * @param {*} name 用户名
   * @param {*} avatar_src 头像
   */
  const handle_user_login = ( name, avatar_src ) => {
    Taro.login( {
      success: async function ( res ) {
        if ( res.code )
        {
          dispatch( {
            type: "personal/handle_user_login",
            payload: {
              code: res.code,
              name: name,
              avatar_src: avatar_src
            }
          } );
        } else
        {
          console.log( '登录失败！' + res.errMsg );
        }
      }
    } );
  };
  /**
   * 获取用户协议
   * @function handleUserAgreement
   */
  const handleUserAgreement = async () => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/agreement_content/1`,
      method: "GET"
    } );
    setAgreementContent( res.data.data.content );
  };
  /**
   * 获取自习室列表
   * @function handleQueryRoomlists
   */
  const handleQueryRoomlists = async () => {
    await dispatch( {
      type: "home/queryRoomList"
    } );
  };
  /**
   * 顶部时间初始化
   * @function handleGenerateDate
   */
  const handleGenerateDate = () => {
    dispatch( {
      type: "home/select_start_time",
      payload: {
        start_time: home.business_hours[ 0 ],
        end_time: home.business_hours[ 2 ],
      }
    } );
    const dateLists = [];
    for ( let i = 0; i < 7; i++ )
    {
      const dateObj = handle_get_date( i );
      dateLists.push( dateObj );
    }
    setDate( dateLists[ 0 ].time_standard );
    setDatelists( dateLists );
    dispatch( {
      type: "home/select_date",
      payload: {
        select_date: dateLists[ 0 ].time_standard
      }
    } );
  };
  /**
   * 选择日期函数
   * @function handleSelectDate
   * @param {*} selected 当前选择日期参数
   */
  const handleSelectDate = ( selected ) => {
    setDate( selected );
    dispatch( {
      type: "home/select_date",
      payload: {
        select_date: selected
      }
    } );
  };
  /**
   * 打开定位地图
   * @function handleOpenMap
   * @param {*} location 地理位置参数
   */
  const handleOpenMap = ( location ) => {
    Taro.getLocation( {
      type: 'gcj02', //返回可以用于 Taro.openLocation的经纬度
      success: function ( res ) {
        const latitude = location.latitude;
        const longitude = location.longitude;
        Taro.openLocation( {
          latitude,
          longitude,
          scale: 18
        } );
      }
    } );
  };
  return (
    <View className='main-wrap'>
      {/* 用户协议Modal */ }
      <UserAgreement agreement_contnet={ agreement_contnet } />
      {/* 顶部日期 */ }
      <View className='main-top'>
        <View style={ { paddingTop: "50px", paddingLeft: "5%", color: "#ffffff", } }>
          <Text style={ { fontSize: "18px", fontWeight: "bolder" } }>Hi { personal.userInfo.name }</Text>
        </View>
        {/* 顶部日期-循环日期显示 */ }
        <View className='main-top-card at-row'>
          { dateList.map( ( item ) => {
            return (
              <View key={ item.time_standard } className="at-col" style={ { marginTop: "20px" } } onClick={ () => handleSelectDate( item.time_standard ) }>
                <View style={ { textAlign: "center" } }>
                  <Text style={ { color: "#ffffff", fontSize: "16px", marginRight: "8px", fontWeight: "500" } }>{ item.short_date }</Text>
                </View>
                <View style={ { marginTop: "10px", textAlign: "center", marginLeft: "0.2em", width: "40px", height: "40px", background: currentDate == item.time_standard ? "#ffffff50" : "", color: currentDate == item.time_standard ? "#000000" : "#ffffff", borderRadius: "20px", } } >
                  { !( currentDate == item.time_standard ) ?
                    <View style={ { paddingTop: "5px" } }>
                      {/* 顶部日期-是否选中，选中标识展示 */ }
                      <Text style={ { fontSize: "18px", fontWeight: "500" } }>{ item.day }</Text>
                    </View>
                    :
                    <View style={ { paddingTop: "10px" } }>
                      <Image style={ { width: "20px", height: "20px" } } src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/select_icon.png"></Image>
                    </View>
                  }
                </View>
              </View>
            );
          } ) }
        </View>
      </View>
      {/* 滚动通知 */ }
      <View style={ { marginLeft: '2.5%', marginTop: "0.5em", fontWeight: "450", color: "#262626" } }>
        <AtNoticebar icon='volume-plus' marquee >
          受疫情防控影响，请大家戴好口罩，保持社交距离。营造安静学习氛围，共同成长
          </AtNoticebar>
      </View>
      <View style={ { marginLeft: '2.5%', marginTop: "10px", fontWeight: "450", color: "#262626" } }>
        预定自习室
      </View>
      {/* 预约时间选择 */ }
      <SelectTime />
      {/* 自习室列表 */ }
      <View style={ { marginLeft: '2.5%', marginTop: "10px", fontWeight: "450", color: "#262626" } }>
        自习室列表
      </View>
      <View className="room-list-warp">
        { home.roomlists.map( room => {
          return (
            <View key={ room.v_id } style={ { marginTop: "10px", paddingLeft: "5%", paddingBottom: "20px" } }>
              <View>
                <Text style={ { fontWeight: "500", color: room.is_open ? "" : "#8d8d8d" } }>{ room.name }</Text>
                { room.is_open ?
                  <Image src={ location_icon } style={ { width: "18px", height: "25px", float: "right", marginRight: "40px" } } />
                  :
                  null
                }
              </View>
              <View style={ { marginTop: "20px", overflow: "hidden" } }>
                <Text style={ { fontSize: "12px", float: "left", marginTop: "5px", color: room.is_open ? "" : "#8d8d8d" } }>{ room.position }</Text>
                { room.is_open ?
                  <Button className="room-location-btn" onClick={ () => handleOpenMap( room.location ) }>去这里</Button>
                  : null }
              </View>
            </View>
          );
        } ) }
      </View>
    </View>
  );
}
Main.config = {
  navigationBarTitleText: '首页',
  navigationStyle: "custom"
};
export default connect( ( { home, personal } ) => ( {
  home,
  personal
} ) )( Main );
