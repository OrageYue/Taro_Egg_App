/*
 * @Author: yuncheng
 * @Date: 2020-07-22 14:17:26
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-23 17:15:48
 * @FilePath: /booking_system_server/app/model/activityBookingRecord.js
 */ 
// 活动人员集合
module.exports = app => {
    const mongoose = app.mongoose;
    const ActivityBookingRecordSchema = new mongoose.Schema(
        {
        // 订单流水号
        a_number:{type:String},
        // 活动id(对应活动表)
        a_id: { type: String },
        // 人员id
        u_id: { type: String },
        // 人员名称
        u_name: { type: String },
        // 折扣方式类型（ifinity or normal）
        price_type: { type: String },
        // 折扣(几折)
        price_rule: { type: Number },
        // 支付方式
        pay_method: { type: String},
        // 支付金额
        pay_amount: { type: Number },
        // 支付说明
        mark: { type: String },
        // 订单（活动）状态，是否被取消（cancel），或者有效(Effective)
        status: { type: String, default: "Effective" },
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
    return mongoose.model( "ActivityBookingRecord", ActivityBookingRecordSchema );
};
