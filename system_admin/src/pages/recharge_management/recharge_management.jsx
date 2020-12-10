import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Table, Tag, Button, Row, Col, Divider, Input } from 'antd';
import moment from 'moment';
import TopicStatistics from '../../component/topic_statistics';
import UserDetail from '../user_management/component/user_detail';
const { Search } = Input;

function Recharge ( { recharge_management, dispatch, user_management } ) {

    //调用获取所有充值列表
    useEffect( () => {
        handle_query_recharge_lists();
    }, [] );

    const handle_query_recharge_lists = () => {
        dispatch( {
            type: "recharge_management/queryList"
        } );
    };
    // 获取用户详情
    const handle_user_detail = ( record ) => {
        // 获取用户数据
        dispatch( {
            type: "user_management/queryOneUser",
            payload: {
                u_id: record.u_id
            }
        } );
    };
    // 根据手机号查询用户订单
    const handle_recharge_by_phone = ( value ) => {
        dispatch( {
            type: "recharge_management/queryList",
            payload: {
                phone: value
            }
        } );
    };
    // column
    const columns = [
        {
            title: "交易订单号",
            dataIndex: "r_number",
            align: "center",
            key: "r_number"
        },
        {
            title: "金额",
            dataIndex: "r_amount",
            key: "r_amount",
            render: ( text, record ) => {
                return (
                    <div>{ record.r_amount }元</div>
                );
            }
        },
        {
            title: "套餐类型",
            dataIndex: "package_type",
            key: "package_type",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.package_type == 'hour_card' && ( <span>小时卡</span> ) }
                        { record.package_type == 'day_card' && ( <span>日卡</span> ) }
                        { record.package_type == 'mounth_card' && ( <span>月卡</span> ) }
                    </div>
                );
            }
        },
        {
            title: "套餐名称",
            dataIndex: "package_name",
            key: "package_name"
        },

        {
            title: "交易状态",
            dataIndex: "is_success",
            key: "is_success",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.is_success == 'true' && ( <Tag color="green">成功</Tag> ) }
                        { record.is_success == 'loading' && ( <Tag color="red">等待校验支付</Tag> ) }
                        { record.is_success == 'fail' && ( <Tag color="red">失败</Tag> ) }
                    </div>
                );
            }
        },
        {
            title: "套餐包含时长",
            dataIndex: "package_total",
            key: "package_total",
            render: ( text, record ) => {
                return (
                    <div>
                        { record.package_type == 'hour_card' && (
                            <div>
                                <span style={ { color: "#000000", fontSize: "16px" } }>{ record.package_total } </span>小时
                            </div> ) }
                        { record.package_type == 'day_card' && (
                            <div>
                                <span style={ { color: "#000000", fontSize: "16px" } }>{ record.package_total }</span> 天
                            </div> ) }
                        { record.package_type == 'mounth_card' && (
                            <div>
                                <span style={ { color: "#000000", fontSize: "16px" } }>{ record.package_total } </span>月
                            </div> ) }
                    </div>
                );
            }
        },
        {
            title: "交易创建时间",
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
            key: "action",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        <Button type="link" onClick={ () => handle_user_detail( record ) }>用户详情</Button>
                    </div>
                );
            }
        }
    ];
    return (
        <div >
            <TopicStatistics
                topicColumn={ [
                    {
                        title: "交易总数",
                        data: recharge_management.rechargeLists.length
                    },
                    {
                        title: "今日笔数",
                        data: ( recharge_management.rechargeLists.filter( item => { return item.created_at == new Date(); } ) ).length
                    },
                    {
                        title: "本月笔数",
                        data: ( recharge_management.rechargeLists.filter( item => { return item.created_at == new Date(); } ) ).length
                    }
                ] } />
            <div style={ { overflow: "hidden" } }>
                <div style={ { float: "left" } }>
                    <Button style={ { marginTop: "30px" } } type="primary" onClick={ () => window.open( 'https://pay.weixin.qq.com/' ) }>微信支付系统</Button>
                </div>
                <div style={ { float: "right" } }>
                    <Search style={ { marginTop: "30px" } } placeholder="请输入手机号" onSearch={ value => handle_recharge_by_phone( value ) } enterButton />
                </div>
            </div>
            <Table
                style={ { marginTop: "20px" } }
                columns={ columns }
                dataSource={ recharge_management.rechargeLists } />
            {/* 用户详情 */ }
            {
                user_management.is_detail &&
                <UserDetail />
            }
        </div>
    );
}
export default connect( ( {
    recharge_management,
    user_management
} ) => ( {
    recharge_management: recharge_management,
    user_management: user_management
} ) )( Recharge );