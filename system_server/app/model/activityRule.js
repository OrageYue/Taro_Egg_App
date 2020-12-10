/*
 * @Author: yuncheng
 * @Date: 2020-07-07 17:18:25
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-22 10:40:46
 * @FilePath: /booking_system_server/app/model/activityRule.js
 */ 
// 活动规则配置

module.exports = app => {
  const mongoose = app.mongoose;
  const ActivityRuleSchema = new mongoose.Schema( {
    // 规则名称
    r_name: { type: String },
    // 普通会员折扣（几折）
    normal_rule:{type:Number},
    // 无限卡折扣（几折）
    ifinite_rule: { type: Number },
    //  说明
    mark: { type: String },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("ActivityRule", ActivityRuleSchema);
};
