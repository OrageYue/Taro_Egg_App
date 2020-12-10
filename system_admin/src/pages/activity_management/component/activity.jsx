import React, { useState, useEffect } from 'react';
import { Radio, Table, Button, Row, Form, Modal, Input, InputNumber, message, Popconfirm, Select, DatePicker } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


function ActivityDetail ( props ) {

    const [ form ] = Form.useForm();
    useEffect( () => {
        handle_query_rules();
    }, [] );
    // ------------------->获取所有规则
    const handle_query_rules = () => {
        props.dispatch( {
            type: "activity_management/query_rule_list"
        } );
    };
    return (
        <div>
            <Modal
                footer={ null }
                onCancel={ props.handle_cancel_modal }
                visible
                title={ props.mode == "create" ? '创建' : '编辑' }
            >
                <Form
                    name="rule"
                    { ...layout }
                    form={ form }
                    onFinish={ props.handle_submit }
                    initialValues={ {
                        a_name: props.activity_management.currentActivity.a_name || '',
                        activity_place: props.activity_management.currentActivity.activity_place || '',
                        activity_time: moment( props.activity_management.currentActivity.activity_time || '2020-07-24 21:00:00', 'YYYY/MM/DD HH:mm:ss' ),
                        activity_cover: props.activity_management.currentActivity.activity_cover || '',
                        member_nums: props.activity_management.currentActivity.member_nums || '',
                        price: props.activity_management.currentActivity.price || '',
                        total_time: props.activity_management.currentActivity.total_time || '',
                        rules: props.activity_management.currentActivity.rules || '',
                        mark: props.activity_management.currentActivity.mark || '',
                    } }
                >
                    <Form.Item
                        label="活动名称"
                        name="a_name"
                        rules={ [ { required: true, message: '请输入活动名称' } ] }
                    >
                        <Input placeholder="请输入活动名称" />
                    </Form.Item>
                    <Form.Item
                        label="活动地点"
                        name="activity_place"
                        rules={ [ { required: true, message: '请输入活动地点' } ] }
                    >
                        <Input placeholder="请输入活动地点" />
                    </Form.Item>
                    <Form.Item
                        label="活动人数"
                        name="member_nums"
                        rules={ [ { required: true, message: '请输入人数' } ] }
                    >
                        <InputNumber placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                        label="活动时间"
                        name="activity_time"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <DatePicker defaultValue={ moment( '2020-07-24 21:00:00', "YYYY/MM/DD HH:mm:ss" ) } format="YYYY-MM-DD HH:mm:ss" showTime />
                    </Form.Item>
                    <Form.Item
                        label="活动封面"
                        name="activity_cover"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <Input placeholder="请输入封面" />
                    </Form.Item>
                    <Form.Item
                        label="活动时长"
                        name="total_time"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <InputNumber placeholder="请输入时长" />
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="price"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <InputNumber placeholder="请输入价格" />
                    </Form.Item>
                    <Form.Item
                        label="价格规则"
                        name="rules"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <Select>
                            { props.activity_management.rulesLists.map( r => {
                                return (
                                    <Option key={ r._id } value={ r._id }> { r.r_name }</Option>
                                );
                            } ) }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="说明"
                        name="mark"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <TextArea rows={ 2 } placeholder="请输入说明" />
                    </Form.Item>
                    <div style={ { textAlign: "center" } }>
                        <Button type="primary" htmlType="submit">提交数据</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default connect( ( {
    activity_management
} ) => ( {
    activity_management: activity_management
} ) )( ActivityDetail );