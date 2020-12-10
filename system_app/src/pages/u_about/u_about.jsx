
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './u_about.scss';

function U_about () {

  return (
    <View className='u_about-wrap'>
      <View style={ { textAlign: "center", marginTop: "30%", fontSize: "28px", color: "#595959" } }>
        乐日Dayin自习室
         <View>
          <Image src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/UI2.0/lofi.jpg" style={ { height: "250px", width: "250px" } }></Image>
        </View>
      </View>
      <View style={ { fontSize: "14px", position: "absolute", bottom: "10px", width: "100%", color: "#8c8c8c" } }>
        <View style={ { textAlign: "center" } }>
          v1.0.102
        </View>
      </View>
    </View>
  );
}
U_about.config = {
  navigationBarTitleText: '关于我们'
};
export default U_about;
