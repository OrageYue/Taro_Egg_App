import Taro, { useEffect, useState } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Canvas } from '@tarojs/components';
import QR from 'wxmp-qrcode';

function QrcodePage ( { personal } ) {

    const [ canvas_id, set_canvas_id ] = useState( 'canid' );
    useEffect( () => {
        handle_create_qrcode();
    }, [] );
    /**
     * 生成二维码函数
     * @function handle_create_qrcode
     */
    const handle_create_qrcode = () => {
        const u_id = personal.userInfo.u_id || "thiis is user id";
        QR.draw( u_id, canvas_id );
    };
    return (
        <View style={ {
            padding: "20px 5%", background: "#ececec", minHeight: "100vh",
        } }>
            <View style={ { marginTop: "10px", width: "100%", background: "#ffffff", minHeight: "400px", borderRadius: "10px", paddingBottom: "40px", paddingTop: "20px" } }>
                {/* 用户信息区域 */ }
                <View style={ { overflow: "hidden", marginLeft: "20px" } }>
                    <View style={ { float: "left" } }>
                        <Image src={ personal.userInfo.avatar_src } style={ { width: "50px", height: "50px" } }></Image>
                    </View>
                    <View style={ { float: "left", marginLeft: "20px", marginTop: "10px" } }>
                        <Text>{ personal.userInfo.name }</Text>
                    </View>

                </View>
                {/* 二维码 */ }
                <View style={ { width: "100%", minHeight: "200px", marginTop: "30px", borderRadius: "10px", textAlign: "center", margin: "0 auto" } }>
                    <Canvas id={ canvas_id } canvasId={ canvas_id } style={ { width: "300px", height: "300px", margin: "0 auto" } }></Canvas>
                    向工作人员出示此码，扫码入场
                </View>

            </View>
        </View>
    );
}
QrcodePage.config = {
    navigationBarTitleText: '二维码'
};
export default connect( ( { personal } ) => (
    { personal }
) )( QrcodePage );