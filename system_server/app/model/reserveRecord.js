/*
 * @Author: yuncheng
 * @Date: 2020-07-03 16:03:27
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-21 21:43:53
 * @FilePath: /booking_system_server/app/model/reserveRecord.js
 */ 

// 预约记录
module.exports = app => {
  const mongoose = app.mongoose;
  const ReserveRecordSchema = new mongoose.Schema( {
    // 预定id
    r_id: { type: Number },
    // 用户姓名
    u_name:{type:String},
    // 用户id
    u_id:{type:String},
    // 预约号
    order_num:{type:String},
    // 手机号
    phone:{type:String},
    // 状态(1:待使用，2：已入场，3：已完成，4：已取消)
    status:{type:Number,default:1},
    // 起始时间
    start_time:{type:String},
    // 结束时间
    end_time:{type:String},
    // 总时间
    total_time:{type:Number},
    // 支付方式
    payment_method:{type:String},
    // 备注(取消时)
    mark: { type: String },
    // 是否已经提醒开始标识符
    is_will_start_notice: { type: Boolean, default: false },
     // 是否已经提醒结束标识符
    is_will_end_notice:{ type: Boolean, default: false },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date())} },
   
  }, {
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("ReserveRecord", ReserveRecordSchema);
};
