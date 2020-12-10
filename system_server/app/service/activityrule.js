/*
 * @Author: yuncheng
 * @Date: 2020-07-22 09:03:50
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-22 15:35:50
 * @FilePath: /booking_system_server/app/service/activityrule.js
 */
// 活动折扣规则
const Service = require( 'egg' ).Service

class ActivityRuleService extends Service{
    // 查询所有规则
    async index () {
        console.log('查询所有规则')
        const { ctx } = this
        const all_rules = await ctx.model.ActivityRule.find()
        return all_rules
    }
    // 添加规则
    async create_rule (payload) {
        console.log( '添加规则' )
        const { ctx } = this
        const new_rule = await ctx.model.ActivityRule.create( payload )
        return new_rule
    }
    // 查询单个规则
    async show_one (_id) {
        console.log( '单个规则' )
        const { ctx } = this
        const rule = await ctx.model.ActivityRule.findOne( { _id: _id } )
        if ( !rule )
        {
            ctx.throw( 404, '规则不存在' )
        }
        return rule
    }
    // 编辑规则
    async update_rule ( id,payload ) {
        console.log( '编辑规则' )
        const { ctx } = this
        const new_rule = await ctx.model.ActivityRule.updateOne(
            { _id: id },
            payload
        )
        if ( !new_rule )
        {
            ctx.throw( 404, '规则不存在' )
        }
        return new_rule
    }
    // 删除规则
    async delete_rule (_id) {
        console.log( '删除规则' )
        const { ctx } = this
        const res = await ctx.model.ActivityRule.findOneAndRemove( { _id: _id } )
        if ( !res )
        {
            ctx.throw( 404, '规则不存在' )
        }
        return res
    }
}

module.exports = ActivityRuleService
