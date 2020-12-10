// 用户
module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema( {
    // 加密用户id
    u_id: { type: String },
    // 用户openid
    openid: { type: String },
    // 用户微信昵称
    name: { type: String },
    // 头像
    avatar_src: { type: String },
    // 真实姓名
    real_name: { type: String, default: "" },
    // 手机号
    phone: { type: String, default: "" },
    // 群体
    group: { type: String, default:  "" },
    // 了解途径
    understand_channel: { type: String, default:  ""  },
    // 目的
    target: { type: String, default:  ""  },
    // 学习计划
    plan: { type: String, default:  "" },
    // 学习时长
    total: { type: Number, default: 0 },
    // 学习卡集合
    user_card: { type: Array, default: [] },
    // 用于之后获取敏感信息的session_key
    session_key: { type: String },
    // 创建时间
    created_at: { type: Date, default:function(){return(new Date().getTime())}},
    // 更新时间
    updated_at: { type: Date,default:function(){return(new Date().getTime())} },
  },{
     // 自动判断创建和更新
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at',currentTime: () =>(new Date().getTime()) }
  });
  return mongoose.model("User", UserSchema);
};
