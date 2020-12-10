/*
 * @Author: yuncheng
 * @Date: 2020-05-29 09:14:41
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-01 17:43:14
 * @FilePath: /cp_taro/src/utils/request.js
 */ 
import Taro, { Component } from '@tarojs/taro'
import {
  ISMOCK,
  MAINHOST
} from '../config'
import {
  conmomPrams,
  requestConfig
} from '../config/requestConfig'
import Tips from './tips'

import { createLogger } from './logger'

//   Methods = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
//   Headers = { key };
//   Datas = { method,key, };


export class Request {
  //登陆的promise
  static loginReadyPromise = Promise.resolve()
  // 正在登陆
  static isLogining = false
  // 导出的api对象
  static apiLists = {}
  // token
  static token = ''

  // constructor(setting) {

  // }


  static conbineOptions ( opts, data, method ) {
    typeof opts === 'string' && (opts = { url: opts })
    return {
    data: { ...conmomPrams, ...opts.data, ...data },
    method: opts.method || data.method || method || 'GET',
    url: data.id? `${opts.host || MAINHOST}${opts.url}/${data.id}`:`${opts.host || MAINHOST}${opts.url}`
    }
  }

  // 如果用户token不存在则跳转
  static getToken() {
    !this.token && (this.token = Taro.getStorageSync('token'))
    return this.token
  }

  /**
   * 
   * @static request请求 基于 Taro.request
   * @param {Options} opts 
   */
  static async request(opts) {
    // token不存在
    //  if (!this.getToken()) { await this.login() }

    // token存在
     let options = Object.assign(opts, { header: { 'token': this.getToken() } })

    //  Taro.request 请求
    const res = await Taro.request(opts)

    // 是否mock
    if (ISMOCK) { return res.data }

    // 登陆失效 
    if (res.data.code === 99999) { await this.login(); return this.request(opts) }

    // 请求成功
    // if (res.data && res.data.code === 0 || res.data.succ === 0) { return res.data }
    if (res.data) { return res.data }

    // 请求错误
    const d = { ...res.data, err: (res.data && res.data.msg) || `网络错误～` }
    Tips.toast(d.err);
    throw new Error(d.err)
  }

  /**
   * 
   * @static 登陆
   * @returns  promise 
   * @memberof Request
   */
  static login() {
    if (!this.isLogining) { this.loginReadyPromise = this.onLogining() }
    return this.loginReadyPromise
  }

  /**
   *
   * @static 登陆的具体方法
   * @returns
   * @memberof Request
   */
  static onLogining() {
    this.isLogining = true
    return new Promise(async (resolve, reject) => {
      // 获取code
      const { code } = await Taro.login()
    //   // 请求登录
        const { data } = await Taro.request( {
            url: `${MAINHOST}${requestConfig.loginUrl}`,
            data: { code: code },
            method:"POST"
        })
        // if (data.code !== 0 || !data.data || !data.data.openid) {
        //     reject()
        //     return
        // }

      Taro.setStorageSync('token', data.data.openid)
      this.isLogining = false
      resolve()
    })
  }

  /**
   *
   * @static  创建请求函数
   * @param {(Options | string)} opts
   * @returns
   * @memberof Request
   */
    static creatRequests ( opts ) {
        return async (data = {}, method = "GET") => {
        const _opts = this.conbineOptions(opts.url, data, opts.method)
        const res = await this.request(_opts)
        // createLogger({ title: 'request', req: _opts, res: res })
        return res
        }
  }

  /**
   *
   * @static 抛出整个项目的api方法
   * @returns
   * @memberof Request
   */
  static getApiList(requestConfig) {
    if (!Object.keys(requestConfig).length) return {}

    Object.keys(requestConfig).forEach((key) => {
      this.apiLists[key] = this.creatRequests(requestConfig[key])
    })

    return this.apiLists
  }
}

// 导出
// 通过引入config内的api配置进行请求
const Api = Request.getApiList(requestConfig)
Component.prototype.$api = Api
export default Api 
