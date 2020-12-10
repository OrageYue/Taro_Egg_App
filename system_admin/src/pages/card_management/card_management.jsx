import React from 'react';
import { connect } from 'umi';
import { useEffect } from 'react';
import { Table, Popover, Tooltip, Button, message } from 'antd';
import moment from 'moment';
import CardPackage from './component/card_package';
import { useState } from 'react';
import CardDetail from './component/card_detail';
import { update_card } from '../../services/card';
function CardManagement ( { card_management, dispatch } ) {

    const [ is_detail, set_is_detail ] = useState( false );
    const [ current_card, set_carrent_detail ] = useState( {} );
    const [ mode, set_mode ] = useState( 'edit' );

    useEffect( () => {
        handle_all_card_lists();
    }, [] );
    // 获取数据
    const handle_all_card_lists = () => {
        dispatch( {
            type: "card_management/query_card_list"
        } );
    };
    // 打开套餐
    const handle_open_package = ( record ) => {
        // 打开
        dispatch( {
            type: "card_management/set_is_open_package",
            payload: {
                is_open_package: true
            }
        } );
        // 设置值
        dispatch( {
            type: "card_management/set_current_card",
            payload: {
                current_select_card: record
            }
        } );
    };
    // 打开详情
    const handle_open_detail = ( type, record ) => {
        set_is_detail( true );
        set_mode( type );
        set_carrent_detail( record );
    };
    // 关闭详情
    const handle_close_detail = () => {
        set_is_detail( false );
        set_carrent_detail( {} );
    };
    // 提交操作
    const handle_submit_detail = async ( value ) => {
        console.log( value );
        console.log( current_card._id );
        const res = await update_card( current_card._id, value );
        console.log( res );
        if ( res.code == 1 )
        {
            message.success( '修改成功' );
            handle_close_detail();
            handle_all_card_lists();
        }
        // console.log(current_select_card)
    };
    // table column
    const columns = [
        {
            title: "卡id",
            dataIndex: "c_id",
            key: "c_id"
        },
        {
            title: "卡名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "卡类型",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "卡封面",
            dataIndex: "c_cover",
            key: "c_cover",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        <Tooltip title={ record.c_cover }>
                            <img src={ record.c_cover } style={ { width: "300px", height: "60px" } } />
                        </Tooltip>
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
            title: "修改时间",
            key: "updated_at",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        { moment( record.updated_at ).format( "YYYY-MM-DD HH:mm:ss" ) }
                    </div>
                );
            }
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            render: ( text, record ) => {
                return (
                    <div>
                        <Button type="link" onClick={ () => handle_open_detail( 'edit', record ) }>编辑</Button>
                        <Button type="link" onClick={ () => handle_open_package( record ) }>查看套餐</Button>
                        <Button type="link" style={ { color: "red" } }>删除</Button>
                    </div>
                );
            }
        }
    ];
    return (
        <div>
            <Table
                dataSource={ card_management.cardLists }
                columns={ columns }
            />
            <CardPackage />
            {
                is_detail &&
                <CardDetail
                    onCancel={ handle_close_detail }
                    current_card={ current_card }
                    onSubmit={ handle_submit_detail }

                />
            }
        </div>
    );
}

export default connect( ( { card_management } ) => ( {
    card_management: card_management
} ) )( CardManagement ); 