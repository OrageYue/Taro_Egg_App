/*
 * @Author: yuncheng
 * @Date: 2020-07-01 16:29:11
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 15:52:37
 * @FilePath: /booking_system_server/app/model/room.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-07-01 16:29:11
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-15 09:45:12
 * @FilePath: /booking_system_server/app/model/room.js
 */ 
// 自习室位置
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RoomSchema = new mongoose.Schema( {
        // 自习室名称
        name: { type: String },
        // 位置描述
        position: { type: String },
        // 地理位置
        location: { type: Schema.Types.Mixed,default:{ latitude:0,longitude:0} },
        // 备注
      mark: { type: String },
        // 是否有效
      is_open: { type: Boolean },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("Room", RoomSchema);
};
