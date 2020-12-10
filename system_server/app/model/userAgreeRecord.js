/*
 * @Author: yuncheng
 * @Date: 2020-07-19 22:06:23
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-19 22:27:20
 * @FilePath: /booking_system_server/app/model/userAgreeRecord.js
 */ 
// 用户协议同同意情况表

module.exports = app => {
  const mongoose = app.mongoose;
  const UserAgreeRecordSchema = new mongoose.Schema( {
    // 用户姓名
    u_name:{type:String},
    // 用户id
    u_id:{type:String},
    // 状态(是否同意)
    status:{type:Boolean},
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date())} },
   
  }, {
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("UserAgreeRecord", UserAgreeRecordSchema);
};
