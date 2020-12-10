/*
 * @Author: yuncheng
 * @Date: 2020-06-03 14:36:56
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-22 15:06:52
 * @FilePath: /booking_system_admin/.umirc.ts
 */
import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
       'target': 'http://localhost:7008/api/',
      // 'target': 'https://www.xxxxxx.com/api/',
       'changeOrigin': true,
       'pathRewrite': { '^/api' : '' },
    },
  },
  routes: [
    {
      path: '/login',
      component:'@/pages/login/login'
    },
    {
      path: '/',
      component: '@/layout/index.jsx',
     
      routes: [
        {
          path: "/",
          exact: true,
          redirect:"/reserve/list"
        },
        {
          path: "/reserve/list",
          component:'@/pages/reserve_management/reserve_management'
        },
        {
          path: "/user_management/lists",
          component:"@/pages/user_management/user_management"
        },
        {
          path: "/payment/lists",
          component:"@/pages/recharge_management/recharge_management"
        },
        {
          path: "/customservice/feedback",
          component:"@/pages/feedback_management/feedback_management"
        },
        {
          path: "/activity_management/rules",
          component:"@/pages/activity_management/rules/rules"
        },
        {
          path: "/activity_management/activity",
          component:"@/pages/activity_management/activity/activity"
        },
        {
          path: "/security/key_management",
          component:"@/pages/key_management/key_management"
        },
        {
          path: "/system/room_management",
          component:"@/pages/room_management/room_management"
        },
        {
          path: "/system/card_management",
          component:"@/pages/card_management/card_management"
        },
        {
          path: "/*",
          exact:true,
          component:'@/pages/err-page/err404'
        }
      ]
    },
  ],
  dva: {
    // immer: true,
    hmr: false,
  },
  mock: {
    
  }
});
