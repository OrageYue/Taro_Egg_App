/*
 * @Author: yuncheng
 * @Date: 2020-06-28 11:21:37
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-29 11:09:07
 * @FilePath: /booking_system_server/app/service/user.js
 */ 
const Service = require( 'egg' ).Service
var WXBizDataCrypt = require('../utils/WXBizDataCrypt')
class UserService extends Service {

    // 查询所有
    async index ( payload ) {
        const { name, phone } = payload;
        
        let res = []
        if ( name )
        {
            res = await this.ctx.model.User.find( { name: { $regex: name } } )
        } else if ( phone )
        {
            res = await this.ctx.model.User.find( { name: { $regex: phone } } )
        }
        else
        {
             res = await this.ctx.model.User.find()
        }
       
        return res
    }
    // 根据u_id查询单个用户
    async findUser ( u_id ) {
        const user = await this.ctx.model.User.findOne( { u_id: u_id } )
        if ( !user )
        {
            this.ctx.throw(404,'用户不存在')
        }
         return user
    }
    // 创建新用户
    async create ( payload ) {
        // 通过传入参数创建新的一条记录
        const { ctx, service } = this    
        const user = await ctx.model.User.create( payload )
        let new_user = JSON.parse(JSON.stringify(user))
        delete new_user.openid
        return new_user
    }

    // 编辑用户数据
    async update_user_info (u_id,payload) {
        const user = this.ctx.model.User.findOneAndUpdate( { u_id: u_id }, payload )
        if ( !user )
        {
            this.ctx.throw( 404, '用户未找到' )
        }
        return user
    }
    // 删除用户数据(特殊使用)
    async delete_user_info (u_id) {
        const user = this.ctx.model.User.findOneAndRemove({u_id:u_id})
        if ( !user )
        {
            this.ctx.throw( 404, '用户未找到' )
        }
        return user
    }

    // 获取用户排行榜
    async get_user_ranking () {
        const all_users_sort = await this.ctx.model.User.find().sort( { total: -1 } )
        
        console.log( all_users_sort )
        
        return all_users_sort
    }
     // 获取用户排行榜历史数据（预约订单完成的数据 status==3）
    async get_user_ranking_histroy ( id ) {
        console.log(id)
        const all_users_sort_histroy = await this.ctx.model.ReserveRecord.find( {
            $and: [
                {
                    u_id: id,
                    status:3
                }
            ]
        }).sort( { total: -1 } )
        
        console.log( all_users_sort_histroy )
        
        return all_users_sort_histroy
    }
    // -------------------------通用函数-------------------------
    // 用户敏感信息解密

    async user_info_cypoto (payload,session_key) {
        const encryptedData = payload.encryptedData
        const u_id = payload.u_id
        const iv = payload.iv
        // 获取用户session_key
        const user = await this.ctx.model.User.updateOne( { u_id: u_id },{$set:{session_key:session_key}} )
        const appId = '换成自己的appid'
        var pc = new WXBizDataCrypt( appId, session_key )
        var data = pc.decryptData( encryptedData, iv )
        return data
    }

    
    
}

module.exports= UserService