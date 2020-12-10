import React from 'react';
import { connect } from 'umi';
import { useEffect } from 'react';
import { Table, Button, Row, Input, Statistic, message, Popconfirm } from 'antd';
import moment from 'moment';
import UserDetail from './component/user_detail';
import UserReserve from './component/user_reserve';
import { delete_user } from '../../services/user';

const { Search } = Input;
const is_super = ( window.localStorage.getItem( 'user' ) == 'super_admin' );
function User_management ( props ) {

    useEffect( () => {
        handle_query_users();

    }, [] );
    // 获取用户列表
    const handle_query_users = () => {
        props.dispatch( {
            type: "user_management/queryList",
        } );
    };
    // 获取用户详情
    const handle_user_detail = ( record ) => {
        // 设置用户数据
        props.dispatch( {
            type: "user_management/set_current_user",
            payload: {
                current_user: record
            }
        } );
        // 显示详情页
        props.dispatch( {
            type: "user_management/set_is_detail",
            payload: {
                is_detail: true
            }
        } );
    };
    // 预定记录
    const handle_user_reserve = ( record ) => {
        props.dispatch( {
            type: "user_management/set_current_user",
            payload: {
                current_user: record
            }
        } );
        props.dispatch( {
            type: "user_management/set_is_reserve",
            payload: {
                is_reserve: true
            }
        } );
    };
    // 删除用户
    const handle_delete_user = async ( record ) => {
        const u_id = record.u_id;
        const res = await delete_user( u_id );
        if ( res.code == 1 )
        {
            message.success( '删除完成' );
            handle_query_users();
        }
    };
    const columns = [
        {
            title: "用户",
            key: "avatar_src",
            render: ( text, record ) => {
                return (
                    <div >
                        <img style={ { width: "40px", height: "40px" } } src={ record.avatar_src }></img>
                    </div>
                );
            }
        },
        {
            title: "微信昵称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "手机号",
            key: "phone",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.phone ? record.phone : '暂无' }
                    </div>
                );
            }
        },
        {
            title: "学习时长",
            key: "total",
            render: ( ext, record ) => {
                return (
                    <div>
                        { record.total }小时
                    </div>
                );
            }
        },
        {
            title: "真实姓名",
            key: "phone",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.real_name ? record.real_name : '暂未填写' }
                    </div>
                );
            }
        }, {
            title: "创建时间",
            key: "created_at",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        { moment( record.created_at ).format( "YYYY-MM-DD HH:mm:ss" ) }
                    </div>
                );
            }
        }, {
            title: "操作",
            key: "action",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        <Button type="link" onClick={ () => handle_user_reserve( record ) }>预定记录</Button>
                        <Button type="link" onClick={ () => handle_user_detail( record ) }>详情信息</Button>
                        <Popconfirm disabled={ !is_super } onConfirm={ () => handle_delete_user( record ) } title="确定删除吗？" >
                            <Button disabled={ !is_super } type="link" style={ { color: "red" } }  >删除</Button>
                        </Popconfirm>

                        {/* <Button type="link">时长赠送</Button> */ }
                    </div>
                );
            }
        },
    ];
    return (
        <div>
            <div style={ { marginBottom: "20px", overflow: "hidden" } }>
                <div style={ { float: "left" } }>
                    <div style={ { textAlign: "center" } }>
                        <h1>注册用户</h1>
                    </div>
                    <div style={ { textAlign: "center", fontSize: "30px" } }>
                        { props.user_management.userLists.length }
                    </div>
                </div>
                <div style={ { float: "right" } }>
                    <Search
                        placeholder="输入用户昵称"
                        enterButton
                        onSearch={ value => console.log( value ) }
                        style={ { width: "300px" } }
                    />
                </div>
            </div>
            <Table
                rowKey="created_at"
                columns={ columns }
                dataSource={ props.user_management.userLists }
            />
            {/* 用户详情 */ }
            {
                props.user_management.is_detail &&
                <UserDetail />
            }
            {/* 预定信息 */ }
            {
                props.user_management.is_reserve &&
                <UserReserve />
            }
        </div>
    );
}

export default connect( ( user_management ) => ( {
    user_management: user_management.user_management
} ) )( User_management );