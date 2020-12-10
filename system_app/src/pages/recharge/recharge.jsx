
import Taro, { useEffect, useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
// import Api from '../../utils/request'
import { generateMixed } from '../../utils/common';
import './recharge.scss';

import { MAINHOST } from '../../config/index';
import NormalCard from './component/normal_card';
import InfiniteCard from './component/infinite_card';

function Recharge ( { recharge, personal } ) {

  const [ current_package, set_current_package ] = useState( {} );

  useEffect( () => {
    if ( recharge.current_study_card.package )
    {
      handle_select_package( recharge.current_study_card.package[ 0 ] );
    }
  }, [] );
  /**
   * 选择套餐函数
   * @function handle_select_package
   * @param {*} item 套餐信息
   */
  const handle_select_package = ( item ) => {
    set_current_package( item );
  };
  /**
   * 提交充值函数
   * @function handle_submit_recharge
   */
  const handle_submit_recharge = async () => {
    const key_res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/qurey_key_by_id`,
      method: "GET",
      data: {
        key_id: "3Q9tru0102",
        key_type: "mch_key"
      }
    } );
    const key_value = key_res.data.data.key_value;
    //  ------------------------------1、后端下单 ------------------------------
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/user_create_unifiedorder`,
      method: "POST",
      data: {
        u_id: personal.userInfo.u_id,
        amount: current_package.p_amount
      }
    } );
    const r_number = res.data.data.r_number;
    //  ------------------------------2、组合参数 ------------------------------
    const pay_payload = {
      nonceStr: generateMixed( 32 ),
      package: `prepay_id=${ res.data.data.prepay_id }`,
      timeStamp: new Date().valueOf().toString(),
      signType: "MD5"
    };
    let sign_String = `appId=换成自己的appid&nonceStr=${ pay_payload.nonceStr }&package=${ pay_payload.package }&signType=MD5&timeStamp=${ pay_payload.timeStamp }&key=${ key_value }`;
    const sign_res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/md5_sign`,
      method: "POST",
      data: {
        sign: sign_String
      }
    } );
    const new_pay_payload = {
      ...pay_payload,
      paySign: sign_res.data.data
    };
    //  ------------------------------3、微信支付 ------------------------------
    const user_pay_res = await Taro.requestPayment( {
      timeStamp: new_pay_payload.timeStamp,
      nonceStr: new_pay_payload.nonceStr,
      package: new_pay_payload.package,
      signType: new_pay_payload.signType,
      paySign: new_pay_payload.paySign,
    } );
    //  ------------------------------4、创建订单 ------------------------------
    if ( user_pay_res.errMsg == 'requestPayment:ok' )
    {
      const recharge_res = await Taro.request( {
        url: `${ MAINHOST }/api/v1/user_recharge`,
        method: "POST",
        data: {
          u_id: personal.userInfo.u_id,
          card_id: recharge.current_study_card.c_id,
          package_payload: current_package,
          r_number: r_number,
          card_name: recharge.current_study_card.name
        }
      } );
      if ( recharge_res.data.code == 1 )
      {
        Taro.showToast( {
          title: "充值成功",
          icon: "success"
        } );
        setTimeout( () => {
          Taro.reLaunch( {
            url: "../../pages/personal/personal"
          } );
        }, 1000 );
      }
    }
  };
  return (
    <View className='recharge-wrap'>
      { recharge.current_study_card.type != "mouth_card"
        ?
        <NormalCard userInfo={ personal.userInfo } current_study_card={ recharge.current_study_card } current_package={ current_package } handle_submit_recharge={ handle_submit_recharge } handle_select_package={ handle_select_package } />
        :
        <InfiniteCard style={ { marginTop: "20px" } } userInfo={ personal.userInfo } current_study_card={ recharge.current_study_card } current_package={ current_package } handle_submit_recharge={ handle_submit_recharge } handle_select_package={ handle_select_package } />
      }
    </View>
  );
}
Recharge.config = {
  navigationBarTitleText: '充值',
  navigationBarBackgroundColor: "#141414",
  navigationBarTextStyle: "white"
};
export default connect( ( { recharge, personal } ) => ( {
  recharge, personal
} ) )( Recharge );
