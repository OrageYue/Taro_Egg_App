// 套餐详情table
import React from 'react';
import { connect } from 'umi';
import { Modal, Table } from 'antd';
function CardPackage ( { card_management, dispatch } ) {


    // 关闭展示套餐
    const handle_close_package = () => {
        // 关闭
        dispatch( {
            type: "card_management/set_is_open_package",
            payload: {
                is_open_package: false
            }
        } );
        // 清空
        dispatch( {
            type: "card_management/set_current_card",
            payload: {
                current_select_card: {}
            }
        } );
    };
    // column

    const columns = [
        {
            title: "套餐名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "套餐金额",
            dataIndex: "p_amount",
            key: "p_amount"
        },
        {
            title: "类型",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "包含时长",
            dataIndex: "total",
            key: "total"
        }
    ];
    return (
        <Modal
            title="套餐管理"
            visible={ card_management.is_open_package }
            onCancel={ handle_close_package }
            footer={ null }
        >
            <Table
                dataSource={ card_management.current_select_card.package }
                columns={ columns }
            />
        </Modal>
    );
}

export default connect( ( {
    card_management
} ) => ( {
    card_management: card_management
} ) )( CardPackage );