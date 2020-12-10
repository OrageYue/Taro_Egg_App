/*
 * @Author: yuncheng
 * @Date: 2020-07-22 09:07:04
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-22 15:36:14
 * @FilePath: /booking_system_server/app/controller/activityrule.js
 */ 
const Controller = require( 'egg' ).Controller

class ActivityRuleController extends Controller{
    // 构造函数
    constructor ( ctx ) {
        super(ctx)
    }
    // 获取所有规则
    async index () {
        const { ctx } = this
        const res = await ctx.service.activityrule.index()
        ctx.helper.success( { ctx, res } ) 
    }
    // 添加规则
    async create () {
        const { ctx } = this
        const payload = ctx.request.body
        const res = await ctx.service.activityrule.create_rule( payload )
        ctx.helper.success( { ctx, res } )
    }
    // 查询单个规则
    async show () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.activityrule.show_one( id )
        ctx.helper.success( { ctx, res } )
    }
    // 编辑规则
    async update () {
        const { ctx } = this
        const id = ctx.params.id
        const payload = ctx.request.body
        const res = await ctx.service.activityrule.update_rule( id, payload )
        ctx.helper.success( { ctx, res } )  
    }
    // 删除规则
    async destroy () {
        console.log('删除')
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.activityrule.delete_rule( id );
        ctx.helper.success( { ctx, res } )  
    }
}

module.exports = ActivityRuleController
