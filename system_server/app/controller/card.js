/*
 * @Author: yuncheng
 * @Date: 2020-05-27 15:34:39
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-29 10:47:49
 * @FilePath: /booking_system_server/app/controller/card.js
 */ 
const Controller = require( 'egg' ).Controller

class CardController extends Controller{
    constructor (ctx) {
        super( ctx )
        // 定义添加时候校验参数
        this.cardRuleCreateTransfer = {
            name: { type: 'string', allowEmpty: false },
        }
    }
    // 查询 get:card
    async index () {
        const { ctx } = this
        const res = await ctx.service.card.index();
        ctx.helper.success( { ctx, res } )
    }
    // 创建 post:card
    async create () {
        const { ctx } = this;
        const body = ctx.request.body
        ctx.validate(this.cardRuleCreateTransfer)
        const res = await ctx.service.card.create( body )
        ctx.helper.success( { ctx, res } )
    }
    // 删除 delete:card
    async destroy () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.card.destroy( id )
        ctx.helper.success( { ctx, res } )
    }
    // 编辑card
    async update () {
         const { ctx } = this
        const id = ctx.params.id
        const payload = ctx.request.body
        const res = await ctx.service.card.update(id,payload)
        ctx.helper.success( { ctx, res } )
    }
    // 预定时根据选择的card类型获取用户余额
    async user_card_remain () {
        const { ctx } = this
        const params = ctx.query
        const c_id = params.c_id
        const res = await ctx.service.card.user_card_remain( params, c_id )
        ctx.helper.success( { ctx, res } )
        
    }
    // 个人中心获取列表和余额
    async all_user_cards () {
        const { ctx } = this
        const params = ctx.query
        const res = await ctx.service.card.all_user_cards( params )
        ctx.helper.success( { ctx, res } )
        
    }
}

module.exports = CardController