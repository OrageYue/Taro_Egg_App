/*
 * @Author: yuncheng
 * @Date: 2020-05-27 15:34:39
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-01 18:17:32
 * @FilePath: /booking_system_server/app/controller/room.js
 */ 
const Controller = require( 'egg' ).Controller

// 定义参数校验规则
const roomRule = {
    name: "string",
    pwd:'string',
}
class RoomController extends Controller{
    constructor (ctx) {
        super( ctx )
        // 定义添加时候校验参数
        this.roomRuleCreateTransfer = {
            name: { type: 'string', allowEmpty: false },
            position: { type: 'string', allowEmpty: false },
        }
    }
    // 查询 get:rooms
    async index () {
        const { ctx } = this
        const res = await ctx.service.room.index();
        ctx.helper.success( { ctx, res } )
    }
    // 创建 post:room
    async create () {
        const { ctx } = this;
        const body = ctx.request.body
        ctx.validate(this.roomRuleCreateTransfer)
        const res = await ctx.service.room.create( body )
        ctx.helper.success( { ctx, res } )
    }
    // 删除 delete:room
    async destroy () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.room.destroy( id )
        ctx.helper.success( { ctx, res } )
    }
}

module.exports = RoomController