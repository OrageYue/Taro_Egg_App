/*
 * @Author: yuncheng
 * @Date: 2020-07-02 11:12:14
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 23:19:15
 * @FilePath: /booking_system_server/app/model/card.js
 */ 
// 自习卡
module.exports = app => {
  const mongoose = app.mongoose;
  const CardSchema = new mongoose.Schema( {
    // 卡片id（每个卡唯一，多个用户id也是一样）
    c_id: { type: Number },
    // 卡片名称 (小时卡，日卡，月卡）
    name: { type: String },
    // 类型（hour_card,day_card,mouth_card）
    type: { type: String },
    // 封面
    c_cover: { type: String },
    // 套餐
    package: { type: Array, default: [] },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("Card", CardSchema);
};
