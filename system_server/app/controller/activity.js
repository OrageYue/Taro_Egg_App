const ActivityRuleService = require( '../service/activityrule' );

/*
 * @Author: yuncheng
 * @Date: 2020-07-22 14:30:46
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-24 11:01:50
 * @FilePath: /booking_system_server/app/controller/activity.js
 */ 
const Controller = require( 'egg' ).Controller

class ActivityController extends Controller{
    constructor ( ctx ) {
        super(ctx)
    }
    // 查询所有活动
    async index () {
        const { ctx } = this
        const res = await ctx.service.activity.index()
        ctx.helper.success( { ctx, res } )
    }
    // 创建活动
    async create () {
        const { ctx } = this;
        const payload = ctx.request.body;
        const res = await ctx.service.activity.create( payload );
        ctx.helper.success( { ctx, res } );
    }
    // 修改活动
    async update () {
        const { ctx } = this
        const id = ctx.params.id
        const payload = ctx.request.body
        const res = await ctx.service.activity.update( id, payload )
        ctx.helper.success( { ctx, res } )
    }
    // 删除活动
    async destroy () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.activity.destroy( id )
        ctx.helper.success( { ctx, res } )
    }
    // 查询活动报名人员
    async show () {
         const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.activity.show( id )
        ctx.helper.success( { ctx, res } )
    }
        
}

module.exports = ActivityController