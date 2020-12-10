
import Taro, { useEffect, useDidShow } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './personal.scss';
import { AtAvatar } from 'taro-ui';
import StudyCard from './component/studyCard';
import ActionBtn from './component/actionBtn';
import { ALIOSS } from '../../config/index';
function Personal ( { dispatch, recharge, personal, source } ) {

  useDidShow( () => {
    handle_all_cards();
    handle_check_scope();
  } );
  /**
   * 获取用户卡列表
   * @function handle_all_cards
   */
  const handle_all_cards = () => {
    dispatch( {
      type: "personal/query_study_list",
      payload: {
        u_id: personal.userInfo.u_id
      }
    } );
  };
  /**
   * 权限检查
   * @function handle_check_scope
   */
  const handle_check_scope = () => {
    Taro.getSetting( {
      success: function ( res ) {
        if ( !res.authSetting[ 'scope.userInfo' ] )
        {
          console.log( '权限不存在' );
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
   * 执行用户登录操作
   * @function handle_user_login
   * @param {*} name 用户昵称
   * @param {*} avatar_src  用户头像
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
   * 用户操作
   * @function handle_select_function
   * @param {*} type 操作类型
   */
  const handle_select_function = ( type ) => {
    let url = "";//跳转地址
    switch ( type )
    {
      case "ranking":
        url = "../../pages/u_ranking/u_ranking";
        break;
      case "info":
        url = "../../pages/u_infomation/u_infomation";
        break;
      case "extension":
        url = "../../pages/u_extension/u_extension";
        break;
      case "about":
        url = "../../pages/u_about/u_about";
        break;
      case "customService":
        url = "../../pages/u_customService/u_customService";
        break;
      default:
        break;
    }
    Taro.navigateTo( {
      url: url
    } );
  };
  return (
    <View className='personal-wrap'>
      {/* 顶部功能区域 */ }
      <View style={ { position: "relative" } }>
        <View style={ { width: "100%", backgroundImage: "url('https://booking-system-resource.oss-cn-beijing.aliyuncs.com/UI2.0/user_bg.png')", paddingTop: "140rpx", paddingBottom: "40px", position: "absolute", zIndex: "100", backgroundSize: "100% 110%" } }>
          {/* 头像信息区域 */ }
          { personal.userInfo.name ?
            <View style={ { overflow: "hidden", marginLeft: "5%", marginRight: "10%" } }>
              <View style={ { float: "left" } }>
                <AtAvatar circle image={ personal.userInfo.avatar_src }></AtAvatar>
              </View>
              <View style={ { paddingTop: "20px", float: "left", marginLeft: "20px", color: "#ffffff" } }>
                <Text>{ personal.userInfo.name }</Text>
              </View>
              <View style={ { paddingTop: "20px", float: "left", marginLeft: "20px", color: "#ffffff" } }>
                {/* 判断是否是无限卡会员 */ }
                { personal.userInfo.is_ifinite_user ?
                  <Image src={ `${ ALIOSS }ifinite_card_logo.png` } style={ { width: "84px", height: "23px" } } />
                  :
                  <Image src={ `${ ALIOSS }normal_card_logo.png` } style={ { width: "84px", height: "23px" } } />
                }
              </View>
              <View style={ { paddingTop: "20px", float: "right", } }>
                <Image onClick={ () => {
                  Taro.navigateTo( {
                    url: "../../pages/qrcode/qrcode"
                  } );
                } } style={ { width: "20px", height: "20px", float: "right" } } src={ `${ ALIOSS }qcoreicon.png` }></Image>
              </View>
            </View>
            :
            <View style={ { paddingTop: "20px", marginLeft: "10px" } }>
              <Button openType="getUserInfo" onGetUserInfo={ handle_get_userinfo } style={ { width: "100px" } }>点击登录</Button>
            </View>
          }
          {/* 按钮区域 */ }
          <ActionBtn handle_select_function={ handle_select_function } />
        </View>
        {/* 底部卡片区域 */ }
        <View style={ { width: "100%", position: "absolute", zIndex: "100", background: "#ffffff", marginTop: "400rpx", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", paddingTop: "20px" } }>
          <View style={ { marginLeft: "4%" } }>
            <Text style={ { fontSize: "16px", fontWeight: "400" } }>自习卡</Text>
          </View>
          <StudyCard />
        </View>
      </View>
    </View>
  );
}
Personal.config = {
  navigationBarTitleText: '个人中心',
  navigationStyle: "custom"
};
export default connect( ( { personal, recharge } ) => ( {
  personal, recharge
} ) )( Personal );
