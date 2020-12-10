
import Taro, { Component, Config, useState } from '@tarojs/taro';

import './index.scss';
import { Button } from '@tarojs/components';
// 数据为空展示
function NoData () {

    return (
        <View className="appoint-content" >
            <Image src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/UI2.0/no_data.jpg" style={ { width: "250px", height: "230px", marginTop: "25%" } } />
            <Button className="nodata-btn" onClick={ () => {
                Taro.switchTab( {
                    url: "../../pages/main/main"
                } );
            } }>去预定</Button>
        </View>
    );
}

export default NoData;
