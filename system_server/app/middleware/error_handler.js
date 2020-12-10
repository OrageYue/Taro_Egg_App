/*
 * @Author: yuncheng
 * @Date: 2020-05-27 11:12:36
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-05-27 15:12:03
 * @FilePath: /cp_server/app/middleware/error_handler.js
 */ 
'use strict'
// 自定义异常处理中间件
module.exports = (option, app) => {
  return async function (ctx, next) {
    try
    {
      // 1、执行next函数，
      // 2、才能正确得执行下一个中间件。
      await next()
      if (ctx.status === 404 && !ctx.body) {
        if (ctx.acceptJSON) {
          ctx.body = { error: '没有找到' }
        } else {
          ctx.body = '<h1>指向错误</h1>'
        }
      }
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, this)
      const status = err.status || 500
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod'
        ? '服务器错误 Internal Server Error'
        : err.message
      // 1、从 error 对象上读出各个属性，
      // 2、设置到响应中
      ctx.body = {
        code: status, 
        error: error
      }
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = 200
    }
  }
}