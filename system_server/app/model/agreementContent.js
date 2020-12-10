/*
 * @Author: yuncheng
 * @Date: 2020-07-22 14:17:26
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-27 09:07:56
 * @FilePath: /booking_system_server/app/model/agreementContent.js
 */ 
// 用户协议
module.exports = app => {
    const mongoose = app.mongoose;
    const AgreementContentSchema = new mongoose.Schema(
        {

        // 版本
        a_version: { type: Number },
        // 协议内容
        content: { type: String },
        // 创建时间
        created_at: { type: Date, default:function(){return(new Date().getTime())}},
        // 更新时间
        updated_at: { type: Date,default:function(){return(new Date().getTime())} },
    },
        {
        // 自动判断创建和更新
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', currentTime: () => ( new Date().getTime() ) }
        }
    );
    return mongoose.model( "AgreementContent", AgreementContentSchema );
};
