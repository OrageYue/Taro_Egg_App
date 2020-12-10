/*
 * @Author: yuncheng
 * @Date: 2020-07-15 18:12:33
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-10-23 07:40:50
 * @FilePath: /cp_taro/src/config/index.js
 */

/**
 * 生产环境
 */
// export const ONLINEHOST = 'https://www.xxx.com'
   export const ONLINEHOST = 'http://localhost:7008'

/** 
 * 测试环境
 */
export const QAHOST = 'https://www.xxxx.com'

/** 
 * 线上mock
 */
export const MOCKHOST = 'https://www.xxxx.com'

/** 
 * 是否mock
 */
export const ISMOCK = false

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = ONLINEHOST
export const ALIOSS = 'https://booking-system-resource.oss-cn-beijing.aliyuncs.com/'
/**
 * 全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
}
