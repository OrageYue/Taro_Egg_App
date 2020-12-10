/*
 * @Author: yuncheng
 * @Date: 2020-07-07 17:21:13
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-07 17:49:39
 * @FilePath: /booking_system_server/app/service/feedback.js
 */ 
const Service = require( 'egg' ).Service

class FeedbackService extends Service{
    async create_feedback (payload) {
        // 新建意见反馈
        // 查找用户
        const user =await this.ctx.service.user.findUser(payload.u_id)
        const user_name = user.name || '用户'
        const user_phone = user.phone || ''
        const feedback_content = payload.content
        const feedback_schema = {
            username: user_name,
            phone: user_phone,
            content:feedback_content
        }
        const new_feedback = await this.ctx.model.Feedback.create( feedback_schema )
        
        return new_feedback
    }

    async query_all () {
        // 查询所有
        const feedbacks = await this.ctx.model.Feedback.find()
        return feedbacks
    }

    async delete_feedback (id) {
        // 删除数据
        const feedback = await this.ctx.model.Feedback.findByIdAndRemove( { _id: id } )
        if ( !feedback )
        {
            this.ctx.throw(404,'数据不存在')
        }
        return feedback
    }

}

module.exports = FeedbackService