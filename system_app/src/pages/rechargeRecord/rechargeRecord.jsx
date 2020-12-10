
import Taro, { useDidShow, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './rechargeRecord.scss';
import { MAINHOST } from '../../config/index';
function RechargeRecord ( { dispatch, personal } ) {

  const [ recharge_lists, set_recharge_lists ] = useState( [] );

  useDidShow( () => {
    handle_get_recharge();
  } );
  /**
   * 获取充值记录
   * @function handle_get_recharge
   */
  const handle_get_recharge = async () => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/user_recharge`,
      data: {
        u_id: personal.userInfo.u_id
      }
    } );
    set_recharge_lists( res.data.data );
  };
  return (
    <View className='rechargeRecord-wrap'>
      { recharge_lists.length > 0 && recharge_lists.map( item => {
        return (
          <View key={ item._id } style={ { marginTop: "20px", overflow: "hidden" } }>
            <View style={ { float: "left", color: "#fff" } }>
              <View style={ { overflow: "hidden" } }>
                <View style={ { float: "left", backgroundImage: item.package_type == 'mouth_card' ? "url('https://booking-system-resource.oss-cn-beijing.aliyuncs.com/user_card_bg.png')" : "url('https://booking-system-resource.oss-cn-beijing.aliyuncs.com/user_card_normal_bg.png')", backgroundSize: "100% 100%", width: "70px", height: "40px", marginRight: "10px", marginLeft: "10px" } }>
                </View>
                <View style={ { float: "left" } }>
                  <View>
                    { item.package_type == 'hour_card' && <Text>小时卡</Text> }
                    { item.package_type == 'day_card' && <Text>日卡</Text> }
                    { item.package_type == 'mouth_card' && <Text>无限卡</Text> }
                  </View>
                  <View style={ { fontSize: "12px", color: "#8c8c8c", marginTop: "5px" } }>
                    { new Date( item.created_at ).toLocaleString() }
                  </View>
                </View>
              </View>
            </View>
            <View style={ { float: "right", color: "#fff", marginTop: "15px", marginRight: "10px", fontSize: "18px" } }>
              - { item.r_amount }
            </View>
          </View>
        );
      } ) }
    </View>
  );
}
RechargeRecord.config = {
  navigationBarTitleText: '充值记录',
  navigationBarBackgroundColor: "#141414",
  navigationBarTextStyle: "white"
};
export default connect( ( { rechargeRecord, personal } ) => ( {
  rechargeRecord, personal
} ) )( RechargeRecord );
