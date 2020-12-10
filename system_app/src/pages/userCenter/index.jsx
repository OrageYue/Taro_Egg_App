/*
 * @Author: yuncheng
 * @Date: 2020-05-28 18:22:29
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-06-29 09:30:04
 * @FilePath: /cp_taro/src/pages/userCenter/index.jsx
 */
import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtButton, AtAvatar } from 'taro-ui';
import { connect } from '@tarojs/redux';


function UserCenter ( { dispatch, user } ) {


    // 进入根据openid获取用户数据
    // reques会自动检查token是否存在，不存在会获取
    // 自动获取完token之后，用户点击登录

    useEffect( () => {
        handleQueryUserInfoByOpenid();
        console.log( user );
    }, [] );

    const handleQueryUserInfoByOpenid = async () => {
        const payload = {
            id: Taro.getStorageSync( 'token' ),
        };
        await dispatch( {
            type: 'user/queryUserInfo',
            payload
        } );
    };

    // 获取用户信息执行update，保证每次数据最新
    const handleQueryUserInfo = async ( e ) => {
        const payload = {
            id: Taro.getStorageSync( 'token' ),
            name: e.target.userInfo.nickName,
            avatar_url: e.target.userInfo.avatarUrl,
            // city: e.target.userInfo.city,
            // country: e.target.userInfo.country,
            // gender: e.target.userInfo.gender,
            // province: e.target.userInfo.province
        };
        await dispatch( {
            type: 'user/updateUser',
            payload
        } );
    };

    return (
        <View>
            <View>
                { user.userInfo.name
                    ?
                    <View style={ { margin: '20px 10% ' } } className="at-row">
                        <AtAvatar className="at-col" circle image={ user.userInfo.avatar_url }></AtAvatar>
                        <View className="at-col" style={ { marginTop: '10px', marginLeft: "40px" } }>
                            <Text>{ user.userInfo.name }</Text>
                        </View>
                    </View>

                    : <AtButton type="primary" openType="getUserInfo" onGetUserInfo={ handleQueryUserInfo.bind( this ) }   >授权并且登录</AtButton>
                }
            </View>

        </View>
    );
}

UserCenter.config = {
    navigationBarTitleText: '个人中心'
};

export default connect( ( { user } ) => ( {
    user
} ) )( UserCenter );