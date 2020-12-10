/*
 * @Author: yuncheng
 * @Date: 2020-07-19 22:22:47
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-19 23:01:11
 * @FilePath: /booking_system_server/app/controller/useragreeRecord.js
 */ 
const Controller = require( 'egg' ).Controller

class UseragreeRecordController extends Controller{
    constructor ( ctx ) {
        super(ctx)
    }

    // 创建记录
    async create () {
        const { ctx } = this
        const payload = ctx.request.body
        console.log( payload )
        const res = await ctx.service.useragreerecord.create( payload )
        ctx.helper.success({ctx,res})
    }

    // 获取所有用户记录
    async index () {
        const { ctx } = this
        const {u_id} = ctx.query
        const res = await ctx.service.useragreerecord.index(u_id)
        ctx.helper.success({ctx,res})
    }

}

module.exports= UseragreeRecordController