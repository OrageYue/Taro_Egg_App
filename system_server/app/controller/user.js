/*
 * @Author: yuncheng
 * @Date: 2020-05-27 15:34:39
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-29 11:09:30
 * @FilePath: /booking_system_server/app/controller/user.js
 */ 
const Controller = require( 'egg' ).Controller
const axios = require( 'axios' )
class UserController extends Controller{
    // 查询所有数据字段
    async index () {
        const { ctx } = this
        // 查询字段
        const payload = ctx.params
        console.log('users')
        const users = await ctx.service.user.index(payload)
        ctx.body = {
           data: users
        }
    }
    // query one -> user/:id
    async show () {
        
        const { ctx } = this;
        const userId = ctx.params.id
        const user = await ctx.service.user.find( userId );
        ctx.body = {
            user
        }
    }
    // create one
    async create () {
        const { ctx } = this;
        const body = ctx.request.body
        // if success ，return id
        const id = await ctx.service.user.create(body)
        
    }

    async update () {
        const { ctx } = this
        const u_id = ctx.params.id
        const payload = ctx.request.body 
        const res = await ctx.service.user.update_user_info( u_id, payload )
        ctx.helper.success( { ctx, res } )
        
    }
    async destroy () {
        const { ctx } = this
        const u_id = ctx.params.id
        const res = await ctx.service.user.delete_user_info( u_id )
        ctx.helper.success( { ctx, res } )
        
    }

    // 用户敏感信息解密
    async user_info_cypoto () {
        const { ctx } = this
        const payload = ctx.request.body

        
        const {session_key} = await ctx.service.login.get_openid_sessionKey( payload.code )
       
        const res =await ctx.service.user.user_info_cypoto( payload, session_key )
        
        ctx.helper.success( { ctx, res } )
        
    }

    // 获取用户排行榜
    async user_ranking () {
        const { ctx } = this
        const res = await ctx.service.user.get_user_ranking()
        ctx.helper.success({ctx,res})
    }
    // 获取用户排行榜历史
    async user_ranking_histroy () {
        const { ctx } = this
        const id = ctx.query.id
        const res = await ctx.service.user.get_user_ranking_histroy(id)
        ctx.helper.success({ctx,res})
    }
    // 根据id查询用户
    async find_user_by_uid () {
        const { ctx } = this
        const {u_id} = ctx.query
        const res = await ctx.service.user.findUser(u_id)
        ctx.helper.success({ctx,res})
    }
}

module.exports = UserController