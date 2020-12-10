import React, { useState, useEffect } from 'react';
import { Radio, Table, Button, Row, Form, Modal, Input, InputNumber, message, Popconfirm } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import { add_rules, edit_rules, delete_rules } from '../../../services/activity';
import RuleDetail from '../component/rule_detail';

function Rules ( props ) {

    const [ form ] = Form.useForm();
    // state定义
    // ------>是否modal
    const [ is_open, set_is_open ] = useState( false );
    // ------>当前操作
    const [ mode, set_mode ] = useState( 'create' );
    // effect
    useEffect( () => {
        handle_query_rules();
    }, [] );
    // ------------------->获取所有规则
    const handle_query_rules = () => {
        props.dispatch( {
            type: "activity_management/query_rule_list"
        } );
    };
    // ------------------->打开modal
    const handle_open_modal = async ( type, record ) => {
        console.log( props );
        switch ( type )
        {
            case "create":
                set_is_open( true );
                set_mode( 'create' );
                break;
            case 'edit':

                update_current_rule( record );
                set_mode( 'edit' );
                setTimeout( () => {
                    set_is_open( true );
                }, 500 );

                console.log( props );
                break;
            default:
                break;
        }
    };
    // ------------------->编辑内容
    const update_current_rule = ( record ) => {
        props.dispatch( {
            type: "activity_management/set_current_rule",
            payload: {
                currentRule: record
            }
        } );
    };
    // ------------------->关闭modal
    const handle_cancel_modal = () => {
        set_is_open( false );
        // 清空form
        form.resetFields();
        // 清空当前选择
        props.dispatch( {
            type: "activity_management/set_current_rule",
            payload: {
                currentRule: {}
            }
        } );
    };
    // ------------------->提交数据
    const handle_submit = async ( values ) => {
        switch ( mode )
        {
            case 'create':
                await add_submit( values );
                break;
            case 'edit':
                await edit_submit( values );
                break;
            default:
                break;
        }
    };
    // ------------------->add操作
    const add_submit = async ( values ) => {
        const res = await add_rules( values );
        if ( res.code == 1 )
        {
            message.success( '添加成功' );
            handle_query_rules();
            handle_cancel_modal();
        }
    };
    // ------------------->edit数据
    const edit_submit = async ( values ) => {
        const id = props.activity_management.currentRule._id;
        const res = await edit_rules( id, values );
        if ( res.code == 1 )
        {
            message.success( '添加成功' );
            handle_query_rules();
            handle_cancel_modal();
        }
    };
    // ------------------->删除
    const handle_delete = async ( _id ) => {
        const res = await delete_rules( _id );
        if ( res.code == 1 )
        {
            message.success( '删除成功' );
            handle_query_rules();
        } else
        {
            message.error( '操作异常' );
        }
    };
    // ------------------->定义column
    const columns = [
        {
            title: "规则名称",
            dataIndex: "r_name",
            key: "r_name"
        },
        {
            title: "普通折扣",
            dataIndex: "normal_rule",
            key: "normal_rule",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.normal_rule }折
                    </div>
                );
            }
        },
        {
            title: "无限付费卡会员折扣",
            dataIndex: "ifinite_rule",
            key: "ifinite_rule",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.ifinite_rule }折
                    </div>
                );
            }
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
                <Button type="primary" style={ { float: "left" } } onClick={ () => handle_open_modal( 'create' ) }>添加规则</Button>
            </Row>
            <Table
                columns={ columns }
                dataSource={ props.activity_management.rulesLists }
            />
            {/* 规则编辑和添加弹窗 */ }
            { is_open &&
                <RuleDetail
                    handle_cancel_modal={ handle_cancel_modal }
                    handle_submit={ handle_submit }
                    mode={ mode }
                    is_only_read={ false }
                />
            }
        </div>
    );
}

export default connect( ( {
    activity_management
} ) => ( {
    activity_management: activity_management
} ) )( Rules );