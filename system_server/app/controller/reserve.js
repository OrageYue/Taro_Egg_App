/*
 * @Author: yuncheng
 * @Date: 2020-07-03 10:20:17
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-21 10:13:21
 * @FilePath: /booking_system_server/app/controller/reserve.js
 */ 
const Controller = require( 'egg' ).Controller

class CardController extends Controller {

    constructor ( ctx ) {
        super(ctx)
    }
    // 创建预定信息 post
    async create () {
        const { ctx } = this
        const body = ctx.request.body
        const res = await ctx.service.reserve.submit_reserve( body )
        ctx.helper.success( { ctx, res } )
        
    }
    // 查询所有预约记录 get
    async index () {
        const { ctx } = this
        const res = await ctx.service.reserve.query_all_reserves()
        ctx.helper.success( { ctx, res } )
    }
    // 根据用户id查询预约记录
    async show () {
        const { ctx } = this
        const { id } = ctx.params
        const res = await ctx.service.reserve.query_reserves_by_uid(id)
        ctx.helper.success( { ctx, res } )
        
    }
    // 根据用户的id和status获取预定信息
    async query_reserves_by_uid_and_status () {
        const { ctx } = this
        const { u_id, status } = this.ctx.query

        const res = await ctx.service.reserve.query_reserves_by_uid_and_status( u_id, status )
        ctx.helper.success( { ctx, res } )
    }
    // 修改订单
    // 根据 opt_type判断用户
    // ----》user_cancel：取消订单
    // ----》admissionn：入场
    // ----》show_up：出场
    async update () {
        const { ctx } = this
        const u_id = ctx.params.id
        const { order_num, payment_method,opt_type } = ctx.request.body
        const { mark } = ctx.request.body || null
        // 根据类型判断
        let res
        if ( opt_type == "user_cancel" )
        {
            // 用户取消
            res = await ctx.service.reserve.update_reserve_cancel( u_id, order_num, payment_method, mark ) 
        } else if (opt_type == "admission" )
        {
            // 用户入场
            res = await ctx.service.reserve.update_reserve_admission( u_id, order_num, payment_method) 
        } else if ( opt_type == "show_up" )
        {
            // 用户出场
            res = await ctx.service.reserve.update_reserve_show_up( u_id, order_num, payment_method)
        }
       
        ctx.helper.success( { ctx, res } )
        
    }

    // 测试自动更新失效订单
    async auto_update_reserve () {
        const { ctx } = this
        const res = await ctx.service.reserve.check_status()
    }


}
 
module.exports = CardController
