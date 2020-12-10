const ActivityRuleController = require( './activityrule' );

/*
 * @Author: yuncheng
 * @Date: 2020-07-22 18:46:16
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-23 18:38:47
 * @FilePath: /booking_system_server/app/controller/activitybooking.js
 */ 
const Controller = require( 'egg' ).Controller

class ActivityBookingController extends Controller{
    constructor ( ctx ) {
        super(ctx)
    }
    // 查询所有预定活动信息
    async index () {
        const { ctx } = this
        const res = await ctx.service.activityBooking.index()
         ctx.helper.success( { ctx, res } )
    }
    // 获取某个活动预订列表

    // 获取某个用户预订列表
    async show () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.activityBooking.user_booking_record( id )
        ctx.helper.success( { ctx, res } )

    }
    // 用户创建预定单
    async create () {
        const { ctx } = this
        const payload = ctx.request.body
        const res = await ctx.service.activityBooking.create( payload )
        ctx.helper.success( { ctx, res } )
        
    }

    // 用户取消（修改订单状态）
    async update () {
        const { ctx } = this
        const id = ctx.params.id
        const payload = ctx.request.body
        const res = ctx.service.activityBooking.user_cancel( id, payload.a_number )
        ctx.helper.success( { ctx, res } )
        
    }


}

module.exports = ActivityBookingController