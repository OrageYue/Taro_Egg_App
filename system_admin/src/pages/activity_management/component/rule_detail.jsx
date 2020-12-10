import React, { useState, useEffect } from 'react';
import { Radio, Table, Button, Row, Form, Modal, Input, InputNumber, message, Popconfirm } from 'antd';
import { connect } from 'umi';

import { add_rules, edit_rules, delete_rules } from '../../../services/activity';
const { TextArea } = Input;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};


function RuleDetail ( props ) {

    const [ form ] = Form.useForm();

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
                        r_name: props.activity_management.currentRule.r_name || '',
                        normal_rule: props.activity_management.currentRule.normal_rule || '',
                        ifinite_rule: props.activity_management.currentRule.ifinite_rule || '',
                        mark: props.activity_management.currentRule.mark || '',
                    } }
                >
                    <Form.Item
                        label="规则名称"
                        name="r_name"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <Input disabled={ props.is_only_read } placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item
                        label="非会员折扣"
                        name="normal_rule"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <InputNumber disabled={ props.is_only_read } min={ 1 } max={ 10 } placeholder="请输入非会员折扣" />
                    </Form.Item>
                    <Form.Item
                        label="会员折扣"
                        name="ifinite_rule"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <InputNumber disabled={ props.is_only_read } min={ 1 } max={ 10 } placeholder="请输入非会员折扣" />
                    </Form.Item>
                    <Form.Item
                        label="说明"
                        name="mark"
                        rules={ [ { required: true, message: '请输入' } ] }
                    >
                        <TextArea disabled={ props.is_only_read } rows={ 2 } />
                    </Form.Item>

                    <div style={ { textAlign: "center" } }>
                        <Button disabled={ props.is_only_read } type="primary" htmlType="submit">提交数据</Button>
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
} ) )( RuleDetail );