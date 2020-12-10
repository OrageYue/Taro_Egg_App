import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Form, Input, Button, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
const { TextArea } = Input;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

function CardDetail ( props ) {
    const [ form ] = Form.useForm();
    const [ lists, set_lists ] = useState( [] );
    useEffect( () => {
        console.log( 'p' );
        console.log( props.current_card.package );
        set_lists( props.current_card.package );
    }, [] );
    return (
        <Modal title="详情" visible={ true } onCancel={ () => props.onCancel() } footer={ false } width={ 800 }>
            <Form
                name="detail"
                onFinish={ props.onSubmit }
                form={ form }
                { ...layout }
                initialValues={ {
                    name: props.current_card.name,
                    c_id: props.current_card.c_id,
                    c_cover: props.current_card.c_cover,
                    type: props.current_card.type,
                    package: props.current_card.package
                } }
            >
                <Form.Item
                    label="套餐名称"
                    name="name"
                >
                    <Input placeholder="请输入套餐名称" />
                </Form.Item>
                <Form.Item
                    label="套餐id"
                    name="c_id"
                >
                    <InputNumber placeholder="请输入套餐名称" />
                </Form.Item>
                <Form.Item
                    label="套餐封面(url)"
                    name="c_cover"
                >
                    <TextArea rows={ 4 } placeholder="请输入套餐封面" />
                </Form.Item>
                <Form.Item
                    label="套餐类型"
                    name="type"
                >
                    <Select>
                        <Select.Option value="hour_card">小时卡</Select.Option>
                        <Select.Option value="day_card">日卡</Select.Option>
                        <Select.Option value="mouth_card">无限付费卡</Select.Option>

                    </Select>
                </Form.Item>
                <Form.List name="package">
                    { ( lists, { add, remove } ) => {

                        return (
                            <div>
                                { lists.map( field => (
                                    <Space key={ field.key } style={ { display: 'flex', marginBottom: 8 } } align="start">
                                        <Form.Item
                                            { ...field }
                                            name={ [ field.name, 'id' ] }
                                            fieldKey={ [ field.fieldKey, 'id' ] }
                                            rules={ [ { required: true, message: '请输入id' } ] }
                                        >
                                            <InputNumber placeholder="id" />
                                        </Form.Item>
                                        <Form.Item
                                            { ...field }
                                            name={ [ field.name, 'name' ] }
                                            fieldKey={ [ field.fieldKey, 'name' ] }
                                            rules={ [ { required: true, message: '请输入名称' } ] }
                                        >
                                            <Input placeholder="套餐名称" />
                                        </Form.Item>
                                        <Form.Item
                                            { ...field }
                                            name={ [ field.name, 'p_amount' ] }
                                            fieldKey={ [ field.fieldKey, 'p_amount' ] }
                                            rules={ [ { required: true, message: '请输入套餐金额' } ] }
                                        >
                                            <InputNumber placeholder="请输入套餐金额" />
                                        </Form.Item>
                                        <Form.Item
                                            { ...field }
                                            name={ [ field.name, 'type' ] }
                                            fieldKey={ [ field.fieldKey, 'type' ] }
                                            rules={ [ { required: true, message: '请输入套餐类型' } ] }
                                        >
                                            <Select style={ { width: "200px" } } placeholder="请输入套餐类型">
                                                <Select.Option value="hour_card">小时卡</Select.Option>
                                                <Select.Option value="day_card">日卡</Select.Option>
                                                <Select.Option value="mouth_card">无限付费卡</Select.Option>

                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            { ...field }
                                            name={ [ field.name, 'total' ] }
                                            fieldKey={ [ field.fieldKey, 'total' ] }
                                            rules={ [ { required: true, message: '请输入套餐时长' } ] }
                                        >
                                            <InputNumber placeholder="请输入套餐时长" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={ () => {
                                                remove( field.name );
                                            } }
                                        />
                                    </Space>
                                ) ) }

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={ () => {
                                            add();
                                        } }
                                        block
                                    >
                                        <PlusOutlined /> Add field
                </Button>
                                </Form.Item>
                            </div>
                        );
                    } }
                </Form.List>

                <div style={ { textAlign: "center" } }>
                    <Button type="primary" htmlType="submit">提交</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default CardDetail;
