/*
 * @Author: yuncheng
 * @Date: 2020-07-13 09:59:00
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-28 10:47:13
 * @FilePath: /booking_system_server/app/controller/recharge.js
 */ 
const Controller = require( 'egg' ).Controller
var Parser = require( "fast-xml-parser" );
class RechargeController extends Controller {
    constructor ( ctx ) {
        super(ctx)
    }
    // 所有充值记录
    async index () {
        const { ctx } = this
        const {u_id,phone} = ctx.query
       
        const res = await ctx.service.recharge.index( u_id ,phone)
        ctx.helper.success({ctx,res})
    }

    // 用户充值记录
    async show () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.recharge.show( id )
        ctx.helper.success( { ctx, res } )
        
    }
    // 管理员根据用户名搜索
    // 用户调用统一支付下单（返回prepay_id，和我们的r_number）
    async user_create_unifiedorder () {
        const { ctx } = this
        const { amount, u_id } = ctx.request.body
         console.log('amount')
        console.log(amount)
         const res = await ctx.service.recharge.we_chat_pauyment_order(amount,u_id)
        ctx.helper.success({ctx,res})
    }
     // 微信支付成功后创建充值
    async create () {
        const { ctx } = this
        const { u_id, package_payload ,card_id,r_number,card_name} = ctx.request.body
         const res = await ctx.service.recharge.create_recharge(u_id,package_payload,card_id,r_number,card_name)
        ctx.helper.success({ctx,res})
    }

    // 微信支付成功后接收微信回调信息，并返回数据给微信
    async wxpay_action () {
        const { ctx } = this
        const payload = ctx.request.body
        const res = await ctx.service.recharge.wxpay_action(payload)
        ctx.body=res
    }

    // 前端请求md5加密
    async md5_sign () {
        const { ctx } = this
       
        const payload = ctx.request.body
        const res = ctx.service.recharge.md5_sign( payload.sign )
        ctx.helper.success({ctx,res})
    }

}

module.exports = RechargeController