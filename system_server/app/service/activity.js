const ActivityRuleService = require( './activityrule' );

/*
 * @Author: yuncheng
 * @Date: 2020-07-22 14:26:53
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-24 11:13:31
 * @FilePath: /booking_system_server/app/service/activity.js
 */ 
const Service = require( 'egg' ).Service

class ActivityService extends Service{
    // 查询所有活动
    async index () {
        console.log( '查询所有的活动' )
        const { ctx } = this
        const all_activities = await ctx.model.Activity.find()
        return all_activities
    }
    // 创建活动
    async create (payload) {
        console.log( '创建活动' )
        const { ctx } = this
        const new_activity = await ctx.model.Activity.create( payload )
        return new_activity
    }
    // 编辑活动
    async update ( _id, payload ) {
        console.log( '编辑活动' )
        const new_activity = await this.ctx.model.Activity.findOneAndUpdate( { _id: _id }, payload )
        if ( !new_activity )
        {
            ctx.throw( 404, '活动不存在' )
        }
        return new_activity
    }
    // 删除活动
    async destroy ( _id ) {
        console.log( '删除活动' )
        const { ctx } = this
        const res = await ctx.model.Activity.findOneAndRemove( { _id: _id } )
        if ( !res)
        {
            ctx.throw( 404, '活动不存在' )
        }
        return res
    }
    // 查询活动报名人员(订单Effective)
    async show (id) {
        console.log( '查询活动人员' )
        const { ctx } = this
        const activity_users = await ctx.model.ActivityBookingRecord.find( {
            $and: [
                {
                    a_id: id,
                    status:"Effective"
                }
            ]
        })
        
        return activity_users 
    }
}

module.exports = ActivityService
