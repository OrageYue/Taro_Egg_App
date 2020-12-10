import React from 'react';
import { connect } from 'umi';
import { useEffect } from 'react';
import { Table, Row, Button, Form, Input, message, Popconfirm } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { addKey, deleteKey } from '../../services/key';

function KeyManagement ( { key_management, dispatch } ) {

    const [ form ] = Form.useForm();
    useEffect( () => {
        handle_query_all_keys();
        console.log( key_management );
    }, [] );

    const [ is_visible, set_is_visiible ] = useState( false );

    // 查询value
    const handle_query_all_keys = () => {
        dispatch( {
            type: "key_management/querykeyList"
        } );
    };
    // 添加
    const handle_add = () => {
        set_is_visiible( true );
    };
    // 关闭modal
    const handle_modal_cancel = () => [
        set_is_visiible( false )
    ];
    // 添加提交
    const handle_add_submit = async ( value ) => {
        const res = await addKey( value );
        if ( res.code == 1 )
        {
            message.success( '新增成功' );
            handle_modal_cancel();
            handle_query_all_keys();
        }
    };
    // 删除
    const handle_delete = async ( item ) => {
        console.log( item.key_id );
        const payload = {
            key_id: item.key_id
        };
        const res = await deleteKey( payload );
        if ( res.code == 1 )
        {
            message.success( '删除成功' );
            handle_query_all_keys();
        }
    };
    const column = [
        {
            key: "key_id",
            title: "id",
            dataIndex: "key_id"
        },
        {
            key: "key_name",
            title: "名称",
            dataIndex: "key_name"
        },
        {
            key: "key_type",
            title: "类型",
            dataIndex: "key_type"
        },
        {
            key: "key_value",
            title: "值",
            dataIndex: "key_value"
        },
        {
            title: "操作",
            dataIndex: "action",
            align: "center",
            key: "action",
            render: ( text, record ) => {
                return (
                    <div>
                        <Popconfirm title="确定删除吗？" onConfirm={ () => handle_delete( record ) } cancelText="取消" okText="确定">
                            <Button type="link" style={ { color: "red" } }  >删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };
    return (
        <div>
            <Row>
                <div>
                    <Button type="primary" onClick={ () => handle_add() }>添加</Button>
                </div>
            </Row>
            <Table
                style={ { marginTop: "40px" } }
                dataSource={ key_management.keyLists }
                columns={ column }
            />
            <Modal
                title="key"
                visible={ is_visible }
                onCancel={ handle_modal_cancel }
                footer={ null }
            >
                <Form
                    form={ form }
                    { ...layout }
                    name="key_record"
                    onFinish={ handle_add_submit }
                >
                    <Form.Item
                        name="key_id"
                        label='key的id'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="key_type"
                        label='类型'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="key_name"
                        label='名称'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="key_value"
                        label='key的值'
                    >
                        <Input />
                    </Form.Item>
                    <div style={ { textAlign: "center" } }>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </div>

                </Form>
            </Modal>
        </div>
    );
}

export default connect( ( { key_management } ) => ( {
    key_management: key_management
} ) )( KeyManagement );