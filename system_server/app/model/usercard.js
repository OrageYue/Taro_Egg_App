
// 用户所有的card合集
module.exports = app => {
  const mongoose = app.mongoose;
  const UsercardSchema = new mongoose.Schema( {
    // 卡片类型id，对应card表的c_id
    c_id: { type: Number },
    // 名称
    name: { type: String },
    // 类型（hour_card,day_card,mouth_card）
    type: { type: String },
    // 所属用户id
    u_id: { type: String },
    // 余额，月卡购买后remain为对应套餐的月份
    reMain: { type: Number },
    //   是否激活：月卡购买后可选,其余默认为true
    is_activate: { type: Boolean },
    //  除了月卡，其余均为null，月卡为激活时候添加，
    start_time: { type: String },
    //   结束时间，月卡购买完成后根据remain时长计算
    end_time: { type: String },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' ,currentTime: () =>(new Date().getTime())}
  });
  return mongoose.model("Usercard", UsercardSchema);
};
