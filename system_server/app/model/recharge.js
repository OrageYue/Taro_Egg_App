/*
 * @Author: yuncheng
 * @Date: 2020-07-07 17:18:25
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-15 14:37:23
 * @FilePath: /booking_system_server/app/model/recharge.js
 */ 
// 意见反馈记录

module.exports = app => {
  const mongoose = app.mongoose;
  const RechargeSchema = new mongoose.Schema( {
    // 交易流水号
      r_number: { type: String },
    // 交易金额
      r_amount: { type: Number },
    // 套餐归属卡类型
      package_type: { type: String },
    // 用户id
      u_id: { type: String },
    // 卡片id
      card_id:{type:Number},
    // 套餐id
      package_id:{type:Number},
   //  套餐名称
      package_name:{type:String},
    // 套餐所属时长
      package_total: { type: String },
    // 交易是否成功回调（初始为loading等待，等微信回调后，改为success）
      is_success: { type: String ,default:'loading'},
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("Recharge", RechargeSchema);
};
