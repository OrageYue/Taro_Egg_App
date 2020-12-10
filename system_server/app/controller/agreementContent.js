/*
 * @Author: yuncheng
 * @Date: 2020-07-27 08:54:57
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-27 09:11:33
 * @FilePath: /booking_system_server/app/controller/agreementContent.js
 */ 
const Controller = require( 'egg' ).Controller

class AgreementContentController extends Controller{
    constructor (ctx) {
        super(ctx)
    }
    // 创建
    async create () {
        const { ctx } = this
        const payload = ctx.request.body
        const res = await ctx.service.agreementContent.create( payload )
        ctx.helper.success({
            ctx,res
        })
    }
    // 获取单个
    async show () {
        const { ctx } = this
        const id = ctx.params.id
        const res =await ctx.service.agreementContent.show_one( id )
        ctx.helper.success({
            ctx,res
        })
    }
}

module.exports= AgreementContentController