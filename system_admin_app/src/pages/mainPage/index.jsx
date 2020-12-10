import Taro, { useState, useDidShow } from '@tarojs/taro';
import { View, Button, Form, Input } from '@tarojs/components';
import { MAINHOST } from '../../config/index';
import './index.scss';
function MainPage () {

    const [ is_login, set_is_login ] = useState( false );

    // 检查是否存在用户
    useDidShow( () => {
        check_login();
    } );

    const check_login = () => {
        Taro.getStorage( {
            key: 'username',
            success: function ( res ) {
                // 用户存在
                if ( res.data )
                {
                    set_is_login( true );
                }
            }
        } );
    };
    // 扫码
    const handle_scan_qrcode = async ( status ) => {

        let user_id = '';
        const res = await Taro.scanCode( {

        } );
        if ( res.result )
        {
            user_id = res.result;
        }
        Taro.navigateTo( {
            url: `../../pages/userOrder/index?u_id=${ user_id }&status=${ status }`
        } );

    };
    // 登录
    const handle_admin_login = async ( e ) => {

        const payloads = {
            username: e.detail.value.username,
            password: e.detail.value.password
        };
        const res = await Taro.request( {
            url: `${ MAINHOST }/api/v1/admin_login`,
            method: "POST",
            data: payloads
        } );
        // 是否登录成功
        if ( res.data.code == 1 )
        {
            // 登录成功，设置storage
            Taro.showToast( {
                title: "成功",
                icon: "success"
            } );
            // 存入本地
            Taro.setStorage( {
                key: "username",
                data: res.data.data.username
            } );

        } else
        {
            // 失败提醒
            Taro.showToast( {
                title: "登录失败，请重试",
                icon: "none"
            } );
        }
        // 检查登录状态
        check_login();
    };
    return (
        <View className="main-warp">
            <View className="main-login-top-bg">
                <View className="main-login-top-title">
                    <Text>预约系统</Text>
                </View>
                {/* 登录状态 */ }
                { !is_login ?
                    <View className="main-login-bottom-card-nologin">
                        <View>
                            <Form onSubmit={ handle_admin_login }>
                                <View style={ { background: "#ececec", borderRadius: "50px", padding: "10px 30px" } }>
                                    <Input name="username" placeholder="请输入用户名" />
                                </View>
                                <View style={ { background: "#ececec", borderRadius: "50px", padding: "10px 30px", marginTop: "20px" } }>
                                    <Input name="password" placeholder="请输入密码" />
                                </View>
                                <View style={ { marginTop: "40px" } }>
                                    <Button className="login-btn" formType="submit">登录</Button>
                                </View>
                            </Form>
                        </View>
                    </View>
                    :
                    <View className="main-login-bottom-card-login">
                        <View>
                            <Button className="login-btn" onClick={ () => handle_scan_qrcode( 1 ) }>扫码入场</Button>
                        </View>
                        <View>
                            <Button className="login-btn" onClick={ () => handle_scan_qrcode( 2 ) } style={ { marginTop: "40px" } }>扫码出场</Button>
                        </View>
                    </View>
                }

            </View>
        </View>
    );
}


MainPage.config = {
    navigationBarTitleText: '首页',
    navigationStyle: "custom"
};


export default MainPage;