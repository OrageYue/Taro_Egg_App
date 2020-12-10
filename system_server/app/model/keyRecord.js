/*
 * @Author: yuncheng
 * @Date: 2020-07-07 17:18:25
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 10:17:09
 * @FilePath: /booking_system_server/app/model/keyRecord.js
 */ 
// 关键安全隐私数据记录表

module.exports = app => {
  const mongoose = app.mongoose;
  const keyRecordSchema = new mongoose.Schema( {
    // 关键id
    key_id: { type: String },
    // 名称
    key_name:{type:String},
    // 类型
    key_type: { type: String },
    //  数值
    key_value: { type: String },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("keyRecord", keyRecordSchema);
};
