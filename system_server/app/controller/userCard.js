/*
 * @Author: yuncheng
 * @Date: 2020-07-03 14:49:19
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-03 15:11:02
 * @FilePath: /booking_system_server/app/controller/userCard.js
 */ 
const Controller = require( 'egg' ).Controller

class UserCardController extends Controller{
    constructor ( ctx ) {
        super( ctx )
    }

    async create () {
        // 生成一个卡
        const { ctx } = this
        const body = ctx.request.body
        const res = await ctx.service.usercard.create( body )
        ctx.helper.success( { ctx, res } )
    }
    
    async index () {
        // 查询所有用户卡数据
        const { ctx } = this
        const res = await ctx.service.usercard.query_all()
        ctx.helper.success( { ctx, res } )
    }

    async show () {
        // 查询单个用户对应的所有卡
        const { ctx } = this
        const { id } = ctx.params
        const res = await ctx.service.usercard.query_user_card( id )
        ctx.helper.success( { ctx, res } )
    }
}
module.exports= UserCardController