/*
 * @Author: yuncheng
 * @Date: 2020-05-27 10:45:18
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-29 14:46:07
 * @FilePath: /booking_system_server/app/router.js
 */ 
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get( '/', controller.home.index );
  // |------------------Restful Api
  app.resources( 'users', '/api/v1/users', app.controller.user )
  // |------room接口
  app.resources( 'room', '/api/v1/room', app.controller.room )
  // |------卡类型接口
  app.resources( 'card', '/api/v1/card', app.controller.card )
  // |------生成用户卡接口
  app.resources('usercard','/api/v1/usercard',app.controller.userCard)
  // |------预定接口
  app.resources( 'reserve', '/api/v1/reserve', app.controller.reserve )
  // |------意见反馈
  app.resources( 'feedback', '/api/v1/feedback', app.controller.feedback )
  // |------充值
  app.resources( 'user_recharge', '/api/v1/user_recharge', app.controller.recharge )
  // |------秘钥数据
  app.resources('keyrecord','/api/v1/all_security_keys',app.controller.keyRecord)
  // |------消息推送
  app.resources( 'messagepush', '/api/v1/messagepush', app.controller.messagePush )
  // |------用户协议
  app.resources( 'useragree_record', '/api/v1/useragreeRecord', app.controller.useragreeRecord )
  // |------活动规则配置
  app.resources( 'activity_rule', '/api/v1/activity_rule', app.controller.activityrule )
  // |------活动管理
  app.resources( 'activity', '/api/v1/activity', app.controller.activity )
  // |------活动预定
  app.resources( 'activitybooking', '/api/v1/activitybooking', app.controller.activitybooking )
  // |------协议管理
  app.resources( 'agreement_content', '/api/v1/agreement_content', app.controller.agreementContent )
  // |------------------normal Api
  // |------微信登录
  router.post( '/api/v1/login', controller.login.wxLogin )
  // |------预定时根据用户选择卡片类型获取用户余额
  router.get('/api/v1/user_card_remain',controller.card.user_card_remain)
  // |------用户个人中心获取卡片和余额
  router.get( '/api/v1/user_cards', controller.card.all_user_cards )
  // |------用户根据状态获取对应预定信息
  router.get( '/api/v1/reserve_by_uid_and_status', controller.reserve.query_reserves_by_uid_and_status )
  // |------用户排行榜获取
  router.get( '/api/v1/user_ranking', controller.user.user_ranking )
  // |------用户排行榜数据源历史获取
  router.get( '/api/v1/user_ranking_histroy', controller.user.user_ranking_histroy )
  // 管理员登录
  router.post( '/api/v1/admin_login', controller.admin.admin_login )
  // 用户敏感信息解密操作
  router.post( '/api/v1/user_info_cypoto', controller.user.user_info_cypoto )
  // 用户调用进行统一下单
  router.post( '/api/v1/user_create_unifiedorder', controller.recharge.user_create_unifiedorder )
  // 支付成功后接受微信回调，并且返回状态给微信
   router.post('/api/v1/wxpay_action',controller.recharge.wxpay_action)
  // 小程序MD5加密函数
  router.post( '/api/v1/md5_sign', controller.recharge.md5_sign )
  // 管理员充值管理页面查询单个用户基础信息
  router.get('/api/v1/one_user_info',controller.user.find_user_by_uid)
  // key
  router.get( '/api/v1/qurey_key_by_id', controller.keyRecord.qurey_by_keyid )
  // 查看单个活动的预约人列表
  // router.get('/api/v1/activitybooking',)

  // 每次查询时候写一个函数，对当前时间和订单开始时间进行判断，改变状态自动更新订单状态
  // 测试函数
  //router.get( '/api/v1/update_reserve_auto', controller.reserve.auto_update_reserve )
};
