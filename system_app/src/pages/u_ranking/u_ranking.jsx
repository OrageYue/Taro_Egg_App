
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './u_ranking.scss';
import { MAINHOST } from '../../config';
import { date_stimap } from '../../utils/common';
function U_ranking ( { personal } ) {

  const [ user_ranking_lists, set_user_ranking_lists ] = useState( [] );//  user_ranking_lists: 排行榜列表
  const [ user_ranking_info, set_user_ranking_info ] = useState( {} );//  user_ranking_info:  排行榜用户信息
  const [ is_ranking_or_histroy, set_is_ranking_or_histroy ] = useState( 'ranking' );// is_ranking_or_histroy:  展示数据类别
  const [ histroy_lists, set_histroy_lists ] = useState( [] );//   histroy_lists: 学习历史数据获取

  useEffect( () => {
    handle_get_ranking();
    handle_get_ranking_histroy();
  }, [] );
  /**
   * 获取排行榜
   * @function handle_get_ranking
   */
  const handle_get_ranking = async () => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/user_ranking`,
      method: "GET",
    } );
    set_user_ranking_lists( res.data.data );
    set_user_ranking_info( handle_set_current_user_rank_info( personal.userInfo.u_id, res.data.data ) );
  };
  /**
   * 获取学习历史
   * @function handle_get_ranking_histroy
   */
  const handle_get_ranking_histroy = async () => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/user_ranking_histroy`,
      method: "GET",
      data: { id: personal.userInfo.u_id }
    } );
    set_histroy_lists( res.data.data );
  };
  /**
   * 获取当前排行信息
   * @function handle_set_current_user_rank_info
   * @param {*} u_id 用户id
   * @param {*} data 列表数据
   */
  const handle_set_current_user_rank_info = ( u_id, data ) => {
    let user_ranking_info;
    user_ranking_info = data.find( ( v ) => {
      return v.u_id == u_id;
    } );
    return user_ranking_info;
  };
  /**
   * 排行榜显示状态改变
   * @function handle_change
   * @param {*} type 类型参数
   */
  const handle_change = ( type ) => {
    switch ( type )
    {
      case "ranking":
        set_is_ranking_or_histroy( 'ranking' );
        break;
      case "histroy":
        set_is_ranking_or_histroy( 'histroy' );
        break;
      default:
        break;
    }
  };
  return (
    <View className='u_ranking-wrap'>
      {/* 顶部 用户*/ }
      <View className="u-ranking_head">
        <View
          style={ { marginTop: "1.5em", float: "left", } }
          // 返回
          onClick={ () => { Taro.navigateBack( {} ); } }>
          <Image
            style={ { width: "20px", height: "20px", opacity: "0.8" } }
            src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/icon%E5%85%83%E7%B4%A0/%E8%BF%94%E5%9B%9E.png"
          />
        </View>
        <View className="u-ranking-userinfo">
          <View className="at-row " style={ { textAlign: "center", marginTop: "10px" } } >
            {/* 用户排名 */ }
            <View className="at-col" style={ { marginTop: "20px" } }>
              <View style={ { color: "#262626", fontSize: "16px", } }>我的排名</View>
              <View style={ { marginTop: "10px", fontSize: "20px", color: "#3C88FD" } }>{ ( user_ranking_lists.findIndex( ( v ) => { return v.u_id == personal.userInfo.u_id; } ) ) + 1 }</View>
            </View>
            {/* 用户信息 */ }
            <View className="at-col">
              <Image style={ { width: "50px", height: "50px", background: "#ececec", borderRadius: "50px" } } src={ personal.userInfo.avatar_src } />
              <View style={ { color: "#262626", fontSize: "16px" } }>{ personal.userInfo.name }</View>
            </View>
            {/* 学习时长 */ }
            <View className="at-col" style={ { marginTop: "20px" } }>
              <View style={ { color: "#262626", fontSize: "16px" } }>学习时长</View>
              <View style={ { marginTop: "10px", fontSize: "20px", color: "#3C88FD" } }>{ user_ranking_info.total }</View>
            </View>
          </View>
          {
            // 是排行榜展示历史按钮
            is_ranking_or_histroy == "ranking" &&
            <View style={ { marginTop: "5px", fontSize: "10px", float: "right", marginRight: "10%", marginBottom: "10px" } } onClick={ () => handle_change( 'histroy' ) }> 学习历史 { `>` } </View>
          }
          {
            // 是排行榜展示历史按钮
            is_ranking_or_histroy == "histroy" &&
            <View style={ { marginTop: "5px", fontSize: "10px", float: "right", marginRight: "10%", marginBottom: "10px" } } onClick={ () => handle_change( 'ranking' ) }> 排行榜 { `>` } </View>
          }
        </View>
      </View>
      {/* 条目 */ }
      {/* 排行榜展示 */ }
      { is_ranking_or_histroy == 'ranking' &&
        <View className="u-ranking_content">
          <View style={ { overflow: "hidden", margin: "10px 20px" } }>
            {/* 左边（排名，头像，名称） */ }
            <View className="at-row" style={ { marginBottom: "20px" } }>
              <View className=" at-col at-col-1" >
                <View style={ { paddingTop: "15px", fontSize: "16px", fontWeight: "500", textAlign: "center" } }>
                  <Text>排名</Text>
                </View>
              </View>
              <View className="at-col at-col-1" style={ { marginLeft: "20px", fontSize: "16px", paddingTop: "15px", fontWeight: "500" } }>
                <View >
                  头像
              </View>
              </View>
              <View className="at-col at-col-4" style={ { marginLeft: "40px", fontSize: "16px", paddingTop: "15px", fontWeight: "500" } }>
                微信昵称
            </View>
              <View className="at-col at-col-8 " style={ { fontSize: "16px", paddingTop: "15px", fontWeight: "500" } }>
                学习时间(h)
            </View>
            </View>
          </View>
          { user_ranking_lists.length > 0 && user_ranking_lists.map( ( item, index ) => {
            let is_me = item.u_id == personal.userInfo.u_id ? true : false;
            return (
              <View key={ item._id } style={ { overflow: "hidden", margin: "10px 20px" } }>
                {/* 左边（排名，头像，名称） */ }
                <View className="at-row">
                  <View className=" at-col at-col-1  " >
                    <View style={ { paddingTop: "15px", fontSize: "20px", textAlign: "center", color: is_me ? "#3C88FD" : "#262626" } }>
                      <Text>{ index + 1 }</Text>
                    </View>
                  </View>
                  <View className="at-col at-col-1" style={ { marginLeft: "20px", } }>
                    <View className="avatar-bg" >
                      <Image className="avatar-ranking" src={ item.avatar_src } />
                    </View>
                  </View>
                  {/* 判断当前用户 */ }
                  <View className="at-col at-col-5" style={ { marginLeft: "50px", paddingTop: "15px", fontWeight: is_me ? "400" : "300", fontSize: is_me ? "14px" : "12px", color: is_me ? "#3C88FD" : "" } }>
                    { item.name }
                  </View>
                  {/* 右边（学习时长） */ }
                  <View className="at-col at-col-8" style={ { paddingTop: "12px", } }>
                    <Text style={ { fontSize: is_me ? "20px" : "18px", color: is_me ? "#3C88FD" : "#3C88FD" } }> { item.total }</Text>
                  </View>
                </View>
              </View>
            );
          } ) }
        </View>
      }
      { is_ranking_or_histroy == 'histroy' &&
        <View className="u-ranking_content">

          <View style={ { overflow: "hidden", margin: "10px 20px" } }>
            {/* 抬头 */ }
            <View className="at-row at-row__justify--between" style={ { marginBottom: "20px" } }>
              <View className=" at-col at-col-4 " >
                <View style={ { paddingTop: "15px", fontSize: "16px", fontWeight: "500", textAlign: "center" } }>
                  <Text>学习时间</Text>
                </View>
              </View>
              <View className="at-col at-col-4  " style={ { fontSize: "16px", paddingTop: "15px", fontWeight: "500", paddingLeft: "40px", } }>
                时长(h)
            </View>
            </View>
          </View>
          { histroy_lists.length > 0 && histroy_lists.map( ( item, index ) => {

            return (
              <View key={ item._id } style={ { overflow: "hidden", margin: "10px 20px" } }>
                {/* 左边（排名，头像，名称） */ }
                <View className="at-row at-row__justify--between">
                  <View className=" at-col at-col-4 at-col--auto" >
                    <View style={ { paddingTop: "15px", fontSize: "16px", textAlign: "center" } }>
                      <Text>
                        { date_stimap( item.start_time ) }</Text>
                    </View>
                  </View>
                  <View className="at-col at-col-4 " style={ { fontSize: "16px", paddingTop: "15px", paddingLeft: "50px", color: "#3C88FD" } }>
                    { item.total_time }
                  </View>
                </View>
              </View>
            );
          } ) }
        </View>
      }
    </View>
  );
}
U_ranking.config = {
  navigationBarTitleText: '排行榜',
  // 打开需要自定义返回
  navigationStyle: "custom"

};
export default connect( ( { personal } ) => ( {
  personal,
} ) )( U_ranking );
