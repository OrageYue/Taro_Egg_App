/*
 * @Author: yuncheng
 * @Date: 2020-07-07 17:18:25
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-15 14:40:14
 * @FilePath: /booking_system_server/app/model/feedback.js
 */ 
// 意见反馈记录

module.exports = app => {
  const mongoose = app.mongoose;
  const FeedbackSchema = new mongoose.Schema( {
    // 用户名
    username: { type: String },
    // 内容
    content: { type: String },
    //  手机号
    phone: { type: String },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("Feedback", FeedbackSchema);
};
