import React from 'react';
import { connect } from 'umi';
import { useEffect } from 'react';
import { Table, Button, Tag, Popconfirm, message, Card, Row, Col, Divider } from 'antd';
import moment from 'moment';
import { cancel_reserve } from '../../services/reserve';
import TopicStatistics from '../../component/topic_statistics';
function ReserveManagement ( { reserve_management, dispatch } ) {

    useEffect( () => {
        handle_query_lists();
    }, [] );

    const handle_query_lists = () => {
        dispatch( {
            type: "reserve_management/queryList"
        } );
    };

    const handle_update_reserve = async ( record, opt_type, mark ) => {
        const res = await cancel_reserve(
            { u_id: record.u_id },
            { order_num: record.order_num, payment_method: record.payment_method, mark: mark, opt_type: opt_type }
        );
        if ( res.code == 1 )
        {
            message.success( "操作成功" );
        }
        dispatch( {
            type: "reserve_management/queryList"
        } );
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
                        { record.status == 1 && <Tag color="#8d8d8d">待使用</Tag> }
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
                    <div style={ { color: "#1980ff" } }>
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
                    <div style={ { color: "#1980ff" } }>
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
        {
            title: "是否推送开始通知",
            dataIndex: "is_will_start_notice",
            key: "is_will_start_notice",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.is_will_start_notice ?
                            <Tag color="green">是</Tag>
                            : <Tag color="red">否</Tag> }
                    </div>
                );
            }
        },
        {
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
        },
        {
            title: "备注",
            dataIndex: "mark",
            key: "mark",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div >
                        { record.mark ?
                            <span style={ { fontWeight: "500", color: "red" } }>{ record.mark }</span>
                            :
                            '无'
                        }
                    </div>
                );
            }
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.status == 1 &&
                            <Popconfirm title="用户确定入场？" onConfirm={ () => handle_update_reserve( record, 'admission' ) }>
                                <Button type="link" size="small">用户入场</Button>
                            </Popconfirm>
                        }
                        { record.status == 2 &&
                            <Popconfirm title="用户确定出场？" onConfirm={ () => handle_update_reserve( record, 'show_up' ) }>
                                <Button type="link" size="small">用户出场</Button>
                            </Popconfirm>
                        }
                        { record.mark == '超时取消' &&
                            <Popconfirm title="确定返还超时积分？" onConfirm={ () => handle_update_reserve( record, 'user_cancel', '超时取消,积分返还' ) }>
                                <Button type="link" size="small">超时积分返还</Button>
                            </Popconfirm>
                        }
                        <Popconfirm title="确定要取消订单吗？" disabled={ !( record.status == 1 ) } onConfirm={ () => handle_update_reserve( record, 'user_cancel', '商家取消' ) }>
                            <Button disabled={ !( record.status == 1 ) } type="link">取消订单</Button>
                        </Popconfirm>
                    </div>

                );
            }
        }
    ];
    return (
        <div>
            <TopicStatistics
                topicColumn={ [
                    {
                        title: "订单总数",
                        data: reserve_management.reserveLists.length
                    },
                    {
                        title: "待入场数",
                        data: ( reserve_management.reserveLists.filter( item => { return item.status == 1; } ) ).length
                    },
                    {
                        title: "进行总数",
                        data: ( reserve_management.reserveLists.filter( item => { return item.status == 3; } ) ).length
                    }
                ] } />
            <Table
                style={ { marginTop: "20px" } }
                columns={ columns }
                dataSource={ reserve_management.reserveLists }
            />
        </div>
    );
}

export default connect( ( { reserve_management } ) => (
    {
        reserve_management: reserve_management
    }
) )( ReserveManagement );
