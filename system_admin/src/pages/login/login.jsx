import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getFakeCaptcha, userLogin } from '../../services/login';
import { connect, history } from 'umi';

const layout = {
    wrapperCol: { span: 16, offset: 6 }
};
const layout2 = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16, push: 6 }
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
};

function LoginPage ( props ) {

    useEffect( () => {
        handleCheckLogin();
        console.log( props );
    }, [] );
    // 登录状态检验
    const handleCheckLogin = () => {
        if ( window.localStorage.getItem( 'user' ) )
        {
            window.location.assign( '/' );
        } else
        {
            return false;
        }
    };
    // 登录操作
    const handleLogin = async ( values ) => {
        const payload = {
            username: values.userName,
            password: values.passWord
        };
        const res = await userLogin( payload );
        // 1-成功登
        // 0-失败
        console.log( res );
        if ( res.code == 1 )
        {
            props.dispatch( {
                type: "user_login/save_user",
                payload: {
                    user_info: values.userName
                }
            } );
            // if ( values.remember )
            // {
            //     // 记住用户则存入本地
            //     window.localStorage.setItem( "user", values.userName );
            // }
            window.localStorage.setItem( "user", values.userName );
            // history.push( '/' );
            window.location.href = '/';
            message.success( '登录成功' );
        } else
        {
            message.error( '登录失败' );
        }
    };

    return (
        <Form
            style={ { marginTop: "150px", width: "500px", textAlign: "center", margin: "150px 30%" } }
            name="loginForm"
            onFinish={ handleLogin }
        >
            <Form.Item { ...layout }>
                <h1>TiTan</h1>
            </Form.Item>
            <Form.Item
                { ...layout }
                name="userName"
            >
                <Input prefix={ <UserOutlined /> } placeholder="用户名" />
            </Form.Item>
            <Form.Item
                { ...layout }
                name="passWord"
            >
                <Input prefix={ <LockOutlined /> } placeholder="密码" />
            </Form.Item>
            {/* <Form.Item { ...tailLayout } name="remember" valuePropName="checked">
                <Checkbox>自动登录</Checkbox>
            </Form.Item> */}
            <Form.Item { ...layout2 }>
                <Button
                    htmlType="submit"
                    type="primary"
                    style={ { width: "100%", marginTop: "40px", height: "40px" } }
                >登录
                    </Button>
            </Form.Item>
        </Form>
    );
}

export default connect( ( { user_login } ) => ( {
    user_login: user_login
} ) )( LoginPage );