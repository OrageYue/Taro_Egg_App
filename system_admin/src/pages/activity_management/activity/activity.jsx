import React, { useState, useEffect } from 'react';
import { Radio, Table, Button, Row, Form, Modal, Input, InputNumber, message, Popconfirm, Tag } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import { add_rules, edit_rules, delete_rules, query_one_rule, edit_activity, delete_activity, add_activity, query_activity_users } from '../../../services/activity';
import RuleDetail from '../component/rule_detail';
import ActivityDetail from '../component/activity';
import BookingUsers from '../component/booking_users';
const { TextArea } = Input;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


function Activity ( props ) {

    const [ form ] = Form.useForm();

    // state定义
    // ------>规则弹窗
    const [ is_rule_open, set_is_rule_open ] = useState( false );
    // ------>活动弹窗详情
    const [ is_open, set_is_open ] = useState( false );
    // ------>当前操作
    const [ mode, set_mode ] = useState( 'create' );
    // ------>预约人列表
    const [ activity_users, set_activity_users ] = useState( [] );
    // ------>预约人弹窗
    const [ activity_users_modal, set_activity_users_modal ] = useState( false );
    useEffect( () => {
        handle_query_activity();
    }, [] );
    // 获取所有活动
    const handle_query_activity = () => {
        props.dispatch( {
            type: "activity_management/query_activity_list"
        } );
    };
    // 规则—————关闭详情
    const handle_cancel_rule_modal = () => {
        set_is_rule_open( false );
        props.dispatch( {
            type: "activity_management/set_current_rule",
            payload: {
                currentRule: {}
            }
        } );
    };
    // 规则—————查询单个详情
    const handle_one_rule = async ( _id ) => {
        const res = await query_one_rule( _id );
        if ( res.code == 1 )
        {

            props.dispatch( {
                type: "activity_management/set_current_rule",
                payload: {
                    currentRule: res.data
                }
            } );
            set_is_rule_open( true );
        }
    };
    // 活动—————打开弹窗
    const handle_open_modal = async ( type, record ) => {
        console.log( props );
        switch ( type )
        {
            case "create":
                set_is_open( true );
                set_mode( 'create' );
                break;
            case 'edit':
                update_current_activity( record );
                set_mode( 'edit' );
                set_is_open( true );
                break;
            default:
                break;
        }
    };
    //  // 活动—————设置当前
    const update_current_activity = ( record ) => {
        props.dispatch( {
            type: "activity_management/set_current_activity",
            payload: {
                currentActivity: record
            }
        } );
    };
    // 活动—————关闭弹窗
    const handle_cancel_modal = () => {
        set_is_open( false );
        // 清空form
        form.resetFields();
        // 清空当前选择
        props.dispatch( {
            type: "activity_management/set_current_activity",
            payload: {
                currentActivity: {}
            }
        } );
    };
    // 活动—————提交数据
    const handle_submit = async ( values ) => {

        const value = {
            ...values,
            activity_time: values[ 'activity_time' ].format( 'YYYY-MM-DD HH:mm:ss' )
        };
        console.log( value );
        switch ( mode )
        {
            case 'create':
                await add_submit( value );
                break;
            case 'edit':
                await edit_submit( value );
                break;
            default:
                break;
        }
    };
    // ------------------->add操作
    const add_submit = async ( values ) => {

        const res = await add_activity( values );
        if ( res.code == 1 )
        {
            message.success( '添加成功' );
            handle_query_activity();
            handle_cancel_modal();
        }
    };
    // ------------------->edit数据
    const edit_submit = async ( values ) => {
        const id = props.activity_management.currentActivity._id;
        const res = await edit_activity( id, values );
        if ( res.code == 1 )
        {
            message.success( '添加成功' );
            handle_query_activity();
            handle_cancel_modal();
        }
    };
    // ------------------->删除
    const handle_delete = async ( _id ) => {
        const res = await delete_activity( _id );
        if ( res.code == 1 )
        {
            message.success( '删除成功' );
            handle_query_activity();
        } else
        {
            message.error( '操作异常' );
        }
    };
    // ------------------->查看预约人员信息
    const handle_booking_users = async ( record ) => {

        const res = await query_activity_users( record._id );
        set_activity_users( res.data );
        set_activity_users_modal( true );

    };
    // 关闭弹窗
    const handle_close_users = () => {
        set_activity_users( [] );
        set_activity_users_modal( false );
    };
    // ------------------->定义column
    const columns = [
        {
            title: "活动名称",
            dataIndex: "a_name",
            key: "a_name"
        },
        {
            title: "活动地点",
            dataIndex: "activity_place",
            key: "activity_place"
        },
        {
            title: "活动时间",
            dataIndex: "activity_time",
            key: "activity_time"
        },
        {
            title: "活动封面",
            dataIndex: "activity_cover",
            key: "activity_cover",
            render: ( text, record ) => {
                return (

                    <div >
                        <img style={ { width: "100px" } } src={ record.activity_cover } />
                    </div>
                );
            }
        },
        {
            title: "活动人数",
            dataIndex: "member_nums",
            key: "member_nums",
            render: ( text, record ) => {
                return (
                    <div>
                        <Tag color="blue">{ record.member_nums }</Tag>
                    </div>
                );
            }
        },
        {
            title: "活动规则",
            dataIndex: "rules",
            key: "rules",
            render: ( text, record ) => {
                return (
                    <div>
                        <Tag color="green" onClick={ () => handle_one_rule( record.rules ) }>点击查看</Tag>
                    </div>
                );
            }
        },
        {
            title: "活动时长",
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
            title: "价格（消耗时长）",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "创建时间",
            dataIndex: "created_at",
            key: "created_at",
            render: ( text, record ) => {
                return (
                    <div>
                        { moment( record.created_at ).format( "YYYY-MM-DD HH:mm:ss" ) }
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
                        <Button type="link" onClick={ () => handle_booking_users( record ) }>查看预约情况</Button>
                        <Button type="link" onClick={ () => handle_open_modal( 'edit', record ) }>编辑</Button>
                        <Popconfirm title="确定删除？" okText="删除" cancelText="取消" onConfirm={ () => handle_delete( record._id ) }>
                            <Button type="link" style={ { color: "red" } }>删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];
    return (
        <div>
            <Row style={ { overflow: "hidden", marginBottom: "20px" } }>
                <Button type="primary" style={ { float: "left" } } onClick={ () => handle_open_modal( 'create' ) }>创建活动</Button>
            </Row>
            <Table
                columns={ columns }
                dataSource={ props.activity_management.activitiyLists }
            />
            {/* 规则弹窗 */ }
            {
                is_rule_open &&
                <RuleDetail
                    handle_cancel_modal={ handle_cancel_rule_modal }
                    // 只读
                    is_only_read={ true }
                />
            }
            {/* 活动弹窗 */ }
            {
                is_open &&
                <ActivityDetail
                    handle_cancel_modal={ handle_cancel_modal }
                    handle_submit={ handle_submit }

                />
            }
            {
                activity_users_modal &&
                <BookingUsers
                    users={ activity_users }
                    handle_close_users={ handle_close_users }
                />
            }
        </div>
    );
}

export default connect( ( {
    activity_management
} ) => ( {
    activity_management: activity_management
} ) )( Activity );