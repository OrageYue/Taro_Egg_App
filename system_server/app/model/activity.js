/*
 * @Author: yuncheng
 * @Date: 2020-07-22 14:17:26
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-23 10:58:43
 * @FilePath: /booking_system_server/app/model/activity.js
 */ 
// 活动集合
module.exports = app => {
    const mongoose = app.mongoose;
    const ActivitySchema = new mongoose.Schema(
        {
        // 活动名称
        a_name: { type: String },
        // 活动封面
        activity_cover: { type: String },
        // 活动地点
        activity_place: { type: String },
        // 活动时间
        activity_time: { type: String },
        // 活动人数
        member_nums: { type: Number },
        // 活动时长
        total_time: { type: Number },
        // 价格(时长)
        price: { type: Number },
        // 折扣规则（对应的折扣规则id）
        rules: { type: String },
        // 活动说明
        mark: { type: String },
        // 创建时间
        created_at: { type: Date, default:function(){return(new Date().getTime())}},
        // 更新时间
        updated_at: { type: Date,default:function(){return(new Date().getTime())} },
    },
        {
        // 自动判断创建和更新
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', currentTime: () => ( new Date().getTime() ) }
        }
    );
    return mongoose.model( "Activity", ActivitySchema );
};
