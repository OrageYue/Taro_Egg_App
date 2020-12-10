import React from 'react';
import { Modal, Form, Input, Row, Col, Table } from 'antd';
import { connect } from 'umi';
import { useState } from 'react';
import { query_user_cards } from '../../../services/user';
import { useEffect } from 'react';

function UserDetail ( props ) {

    useEffect( () => {
        setTimeout( () => {
            handle_query_user_cards();
        }, 100 );

    }, [] );
    // 关闭用户详情Modal
    const handle_detail_close = () => {
        props.dispatch( {
            type: "user_management/set_is_detail",
            payload: {
                is_detail: false
            }
        } );
    };
    // 获取用户卡列表
    const [ user_cards, set_user_cards ] = useState( [] );
    const handle_query_user_cards = async () => {
        const res = await query_user_cards( { u_id: props.user_management.current_user.u_id } );
        set_user_cards( res.data );
    };
    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "卡类型",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "余额",
            dataIndex: "reMain",
            key: "reMain"
        }
    ];
    return (
        <Modal visible title="用户详情" onCancel={ handle_detail_close } footer={ null } width={ 800 }>
            <Form
                name="user_detail"
                initialValues={ {
                    name: props.user_management.current_user.name || "暂无",
                    real_name: props.user_management.current_user.real_name || "暂无",
                    phone: props.user_management.current_user.phone || "暂无",
                    group: props.user_management.current_user.group || "暂无",
                    understand_channel: props.user_management.understand_channel || "暂无",
                    target: props.user_management.current_user.target || "暂无",
                    plan: props.user_management.current_user.plan || "暂无",
                } }
            >
                <div style={ { textAlign: "center", marginBottom: "30px" } }>
                    <img style={ { width: "60px", height: "60px", borderRadius: "50px" } } src={ props.user_management.current_user.avatar_src }></img>
                    <h3>{ props.user_management.current_user.name }</h3>
                </div>
                <Row gutter={ 24 }>
                    <Col span={ 12 }>
                        <Form.Item
                            label="真实姓名"
                            name='real_name'
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={ 12 }>
                        <Form.Item
                            label="手机号"
                            name='phone'
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={ 24 }>
                    <Col span={ 12 }>
                        <Form.Item
                            label="用户群体"
                            name='group'
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={ 12 }>
                        <Form.Item
                            label="了解渠道"
                            name='understand_channel'
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={ 24 }>
                    <Col span={ 24 }>
                        <Form.Item
                            label="学习目的"
                            name='target'
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={ 24 }>
                    <Col span={ 24 }>
                        <Form.Item
                            label="学习计划"
                            name="plan"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <h3>用户卡列表</h3>
                </Form.Item>

                <Table
                    dataSource={ user_cards }
                    columns={ columns }
                />

            </Form>
        </Modal>
    );
}

export default connect( ( user_management ) => ( {
    user_management: user_management.user_management
} ) )( UserDetail );