import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Table } from 'antd';
import moment from 'moment';
function FeedBackManagement ( { feedback_management, dispatch } ) {

    useEffect( () => {
        handle_feedback_lists();
    }, [] );
    // 获取反馈列表
    const handle_feedback_lists = () => {
        dispatch( {
            type: "feedback_management/query_feedback_list"
        } );
    };

    const columns = [
        {
            title: "用户名",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "手机号",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "反馈内容",
            dataIndex: "content",
            key: "content"
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
        }
    ];
    return (
        <div>
            <Table
                columns={ columns }
                dataSource={ feedback_management.feedbackLists }
            />
        </div>
    );
}

export default connect( ( { feedback_management } ) => ( {
    feedback_management: feedback_management
} ) )( FeedBackManagement );