/*
 * @Author: yuncheng
 * @Date: 2020-05-27 15:34:44
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 18:02:56
 * @FilePath: /booking_system_server/app/service/room.js
 */ 
const Service = require( 'egg' ).Service

class RoomService extends Service {
    // |-----主要操作
    // --->获取所有room列表
    async index () {
        const rooms = await this.ctx.model.Room.find()
        return rooms
    }
    // --->创建自习室
    async create ( payload ) {
        const { ctx, service } = this
        return ctx.model.Room.create( payload )
    }
    // --->删除自习室
    async destroy ( _id ) {
        const { ctx } = this
        const room = await ctx.service.room.find( _id )
        if ( !room )
        {
            ctx.throw(404, "不存在自习室");
        }
        return ctx.model.Room.findByIdAndRemove(_id)
    }
    // |-----通用
    // 查找单个自习室
    async find (id) {
        const room = await this.ctx.model.Room.findById(id)
        return room
    }
}

module.exports= RoomService