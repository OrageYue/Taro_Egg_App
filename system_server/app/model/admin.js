// 管理员信息
module.exports = app => {
  const mongoose = app.mongoose;
  const AdminSchema = new mongoose.Schema( {
    // 用户名
    username: { type: String },
    // 密码
    password: { type: String },
  });
  return mongoose.model("Admin", AdminSchema);
};
