/*
 * @Author: yuncheng
 * @Date: 2020-05-28 16:59:14
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-21 14:22:21
 * @FilePath: /booking_system_server/app/controller/login.js
 */ 
const Controller = require( 'egg' ).Controller
const axios = require( 'axios' )
class LoginController extends Controller{
    // 微信登录
    async wxLogin () {
        const { ctx, service } = this
        const body = ctx.request.body

        const { openid, session_key } = await ctx.service.login.get_openid_sessionKey( body.code )

        // 进行用户操作
        const user = await service.login.wxLoginOrRegister( openid, body, session_key )
        
        ctx.body = {
            code:1,
            data: user        
        }
        ctx.status=201
    }
    
}

module.exports = LoginController