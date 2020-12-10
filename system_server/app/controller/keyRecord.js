/*
 * @Author: yuncheng
 * @Date: 2020-07-16 09:32:58
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 10:45:13
 * @FilePath: /booking_system_server/app/controller/keyRecord.js
 */ 
const controller = require( 'egg' ).Controller

class keyRecordController extends controller{
    constructor ( ctx ) {
        super(ctx)
    }

    // 查询所有key
    async index () {
        const { ctx } = this
        const res = await ctx.service.keyrecord.all_keyrecords()
        ctx.helper.success( { ctx, res } )
        
    }
    // 添加key
    async create () {
        const { ctx } = this
        const payload = ctx.request.body
        const res = await ctx.service.keyrecord.create(payload)
        ctx.helper.success( { ctx, res } )
    }
    // 删除key
    async destroy () {
        const { ctx } = this
        const id = ctx.params.id
        const res = await ctx.service.keyrecord.destroy( id )
        ctx.helper.success( { ctx, res } )
        
    }
    // 根据key_type和key_id查询key值（前端小程序用）
    async qurey_by_keyid () {
        const { ctx } = this
        const { key_id, key_type } = ctx.query
        const res = await ctx.service.keyrecord.qurey_by_keyid( key_type, key_id )
         ctx.helper.success( { ctx, res } )
    }
}

module.exports= keyRecordController