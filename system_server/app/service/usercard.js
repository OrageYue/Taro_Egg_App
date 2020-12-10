/*
 * @Author: yuncheng
 * @Date: 2020-07-03 14:47:32
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-11-16 11:21:30
 * @FilePath: /booking_system_server/app/service/usercard.js
 */ 
const Service = require( 'egg' ).Service
// 用户卡集合service

class UserCardService extends Service{
    // 生成用户卡
    async create (payload) {
        const { ctx } = this
        const usercard = await ctx.model.Usercard.create( payload )
        return usercard
    }
    // 查询所有用户卡
    async query_all () {
        const { ctx } = this
        const usercards = await ctx.model.Usercard.find()
        return usercards
    }
    // 根据id查询对应的卡集合
    async query_user_card (id) {
        const { ctx } = this
        await this.service.card.update_mouth_card_remain(id,3000)
        const usercard = await ctx.model.Usercard.find( { u_id: id } )
        return usercard
    }
    // 根据u_id和c_id查询用于支付的卡数据
    async query_user_payment_card (u_id,c_id) {
        const usercard = await this.ctx.model.Usercard.findOne( {
            $and: [
                { u_id: u_id },
                { c_id: c_id }
            ]
        } )
        return usercard
    }
    // 更新用户卡余额
    async update_user_card_remain ( _id, remain ) {
        const usercard = await this.ctx.model.Usercard.updateOne( { _id: _id }, { $set: { reMain: remain } } )
        return usercard
    }
}

module.exports= UserCardService