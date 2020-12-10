
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './u_extension.scss';

function U_extension () {

  return (
    <View className='u_extension-wrap'>
      <View style={ { textAlign: "center", marginTop: "30%", fontSize: "28px", color: "#595959" } }>
        敬请期待
      </View>

    </View>
  );
}
U_extension.config = {
  navigationBarTitleText: '数据中心'
};
export default connect( ( { u_extension } ) => ( {
  ...u_extension,
} ) )( U_extension );
