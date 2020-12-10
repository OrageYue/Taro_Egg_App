import React from 'react';
import { Modal, Form, Input, Row, Col, Table, Tag } from 'antd';
import { connect } from 'umi';
import { useState } from 'react';
import { query_user_reserve } from '../../../services/user';
import { useEffect } from 'react';
import moment from 'moment';
function UserReserve ( props ) {


    useEffect( () => {
        setTimeout( () => {
            handle_query_user_reserve();
        }, 100 );

    }, [] );
    // 关闭用户详情
    const handle_reserve_close = () => {
        props.dispatch( {
            type: "user_management/set_is_reserve",
            payload: {
                is_reserve: false
            }
        } );
    };
    // 获取用户卡列表
    const [ user_reserve, set_user_reserve ] = useState( [] );
    const handle_query_user_reserve = async () => {
        const res = await query_user_reserve( { u_id: props.user_management.current_user.u_id } );
        set_user_reserve( res.data );
    };
    const columns = [
        {
            title: "预订人姓名",
            dataIndex: "u_name",
            key: "u_name"
        },
        {
            title: "预订状态",
            key: "status",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.status == 1 && <Tag color="#2db7f5">待使用</Tag> }
                        { record.status == 2 && <Tag color="#87d068">已入场</Tag> }
                        { record.status == 3 && <Tag color="#2db7f5">已完成</Tag> }
                        { record.status == 4 && <Tag color="#f50">已取消</Tag> }
                    </div>
                );
            }
        },
        {
            title: "预订开始时间",
            key: "start_time",
            render: ( text, record ) => {
                return (
                    <div>
                        { moment( parseInt( record.start_time ) ).format( "YYYY-MM-DD HH:mm:ss" ) }
                    </div>
                );
            }
        },
        {
            title: "预订结束时间",
            key: "start_time",
            render: ( text, record ) => {
                return (
                    <div>
                        { moment( parseInt( record.end_time ) ).format( "YYYY-MM-DD HH:mm:ss" ) }
                    </div>
                );
            }
        },
        {
            title: "预订总时长",
            dataIndex: "total_time",
            key: "total_time",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.total_time }小时
                    </div>
                );
            }
        },
    ];
    return (
        <Modal visible title="用户预定" onCancel={ handle_reserve_close } footer={ null } width={ 800 }>
            <Form
                name="user_reserve"
            >

                <Table
                    dataSource={ user_reserve }
                    columns={ columns }
                />

            </Form>
        </Modal>
    );
}

export default connect( ( user_management ) => ( {
    user_management: user_management.user_management
} ) )( UserReserve );