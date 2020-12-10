import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

import { Table, Button, Row, Form, Input, Radio, message, Popconfirm } from 'antd';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';

import { add_room, delete_room } from '../../services/room';
function RoomManagement ( { room_management, dispatch } ) {

    useEffect( () => {
        handle_query_room();
    }, [] );
    const [ form ] = Form.useForm();
    const [ is_open, set_is_open ] = useState( false );

    // 获取自习室列表
    const handle_query_room = () => {
        dispatch( {
            type: "room_management/queryRoomList",
        } );
    };
    // 打开modal
    const handle_open_modal = ( type ) => {
        set_is_open( true );
    };
    // 关闭modal
    const handle_cancel_modal = () => {
        set_is_open( false );
    };
    // 提交数据
    const handle_submit = async ( value ) => {

        const res = await add_room( value );
        if ( res.code == 1 )
        {
            message.success( '添加成功' );
            handle_query_room();
            handle_cancel_modal();
        }
    };
    // 删除
    const handle_delete = async ( value ) => {
        const payload = {
            _id: value._id
        };
        const res = await delete_room( payload );
        if ( res.code == 1 )
        {
            message.success( '删除成功' );
            handle_query_room();

        }
    };
    // column
    const columns = [
        {
            title: "名称",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "位置",
            key: "position",
            dataIndex: "position"
        },
        {
            title: "说明",
            key: "mark",
            dataIndex: "mark"
        },
        {
            title: "经纬度",
            key: "location",
            render: ( text, record ) => {
                return (
                    <div>
                        <div>维度：  { record.location.latitude }</div>
                        <div>经度：   { record.location.longitude }</div>

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

    return (
        <div>
            <Row>
                <Button type="primary" onClick={ () => handle_open_modal( 'add' ) }>添加自习室</Button>
            </Row>
            <Table
                style={ { marginTop: "20px" } }
                dataSource={ room_management.roomLists }
                columns={ columns }
            />
            <Modal
                okText="提交"
                cancelText="放弃"
                title="自习室"
                visible={ is_open }
                onCancel={ handle_cancel_modal }
                footer={ null }

            >
                <Form name="room_form" onFinish={ handle_submit }>
                    <Form.Item
                        label="自习室名称"
                        name='name'
                        rules={ [ { required: true, message: '请输入名称' } ] }
                    >
                        <Input placeholder="自习室名称" />
                    </Form.Item>
                    <Form.Item
                        label="自习室地址"
                        name='position'
                        rules={ [ { required: true, message: '请输入地址' } ] }
                    >
                        <Input placeholder="请输入自习室地址" />
                    </Form.Item>
                    <Form.Item
                        label="自习室备注"
                        name='mark'

                    >
                        <Input placeholder="自习室备注" />
                    </Form.Item>
                    <Form.Item
                        label="是否开业"
                        name='is_open'

                    >
                        <Radio.Group>
                            <Radio value={ false }>否</Radio>
                            <Radio value={ true }>是</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="经度"
                        name={ [ 'location', 'longitude' ] }
                        rules={ [ { required: true, message: '请输入经度' } ] }
                    >
                        <Input placeholder="经度" />
                    </Form.Item>
                    <Form.Item
                        label="纬度"
                        name={ [ 'location', 'latitude' ] }
                        rules={ [ { required: true, message: '请输入纬度' } ] }
                    >
                        <Input placeholder="纬度" />
                    </Form.Item>
                    <div style={ { textAlign: "center" } }>
                        <Button htmlType="submit" type="primary">提交</Button>
                    </div>
                </Form>

            </Modal>
        </div>
    );
}

export default connect( ( {
    room_management
} ) => ( {
    room_management: room_management
} ) )( RoomManagement );