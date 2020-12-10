import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Table } from 'antd';

function BookingUsers ( props ) {
    const columns = [
        {
            title: "姓名",
            dataIndex: "u_name",
            key: "u_name"
        },
        {
            title: "支付小时卡",
            dataIndex: "pay_amount",
            key: "pay_amount"
        },
    ];
    return (
        <Modal title="预约情况" footer={ false } visible onCancel={ () => props.handle_close_users() }>
            <Table
                columns={ columns }
                dataSource={ props.users }
            />
        </Modal>
    );
}

export default BookingUsers;