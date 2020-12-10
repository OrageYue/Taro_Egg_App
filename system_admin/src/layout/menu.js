/*
 * @Author: yuncheng
 * @Date: 2020-06-09 11:33:12
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-22 10:00:38
 * @FilePath: /booking_system_admin/src/layout/menu.js
 */
import { UserOutlined ,AccountBookOutlined, BookOutlined,WalletOutlined,ScheduleOutlined,SecurityScanOutlined,HomeOutlined,PaperClipOutlined,CustomerServiceOutlined,BellOutlined} from '@ant-design/icons';
  const is_super =  ( window.localStorage.getItem( 'user' )=='super_admin')
export default [
    {
    name: "预定管理",
    path: "/reserve",
    icon: <BookOutlined/>,
    children: [
      {
        name: "预定查询",
        path: "/reserve/list",
      },
    ]
    },
    {
    name: "用户管理",
    path: '/user_management',
    icon: <UserOutlined />,
    children: [
        {
            name: "用户管理",
            path:"/user_management/lists"
        }
    ]
    },
    {
    name: "充值管理",
    path: '/payment',
    icon: <WalletOutlined />,
    children: [
        {
            name: "充值记录",
            path:"/payment/lists"
        }
    ]
    },
    {
    name: "客服反馈",
    path: '/customservice',
    icon: <CustomerServiceOutlined />,
    children: [
        {
            name: "反馈记录",
            path:"/customservice/feedback"
        }
    ]
    },
    {
    name: "活动管理",
    path: '/activity_management',
    icon: <BellOutlined />,
    children: [
        {
            name: "规则配置",
            path:"/activity_management/rules"
        },
        {
            name: "活动管理",
            path:"/activity_management/activity"
        }
    ]
    },
    {
            
    name: "安全管理",
        path: '/security',
     disabled:!is_super,
    icon: <SecurityScanOutlined />,
    children: [
        {
            name: "秘钥管理",
            path:"/security/key_management"
        },
    ]
    },
    {
    name: "系统数据管理",
        path: '/system',
    disabled:!is_super,
    icon: <PaperClipOutlined />,
    children: [
        {
            name: "自习室管理",
            path:"/system/room_management"
        },
        {
            name: "自习卡管理",
            path:"/system/card_management"
        }
    ]
    },
];
