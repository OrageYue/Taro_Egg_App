/*
 * @Author: yuncheng
 * @Date: 2020-05-28 17:07:05
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-28 09:57:47
 * @FilePath: /booking_system_server/app/service/login.js
 */ 
const Service = require( 'egg' ).Service
const crypto = require( 'crypto' )
const axios = require( 'axios' )
class LoginService extends Service{
    // 微信登录
    async wxLoginOrRegister ( openid, body, session_key ) {

         
        // 是否无限卡
        let is_ifinite_user= false
        const { ctx, service } = this
        // 寻找用户是否存在
        const user = await ctx.model.User.findOne( { openid: openid } )
        if(!user){
            // |------>组合用户基本信息
            const userSchema = {
                // 加密用户id
                u_id:this.encry_openid(openid),
                openid: openid,
                name: body.name,
                avatar_src: body.avatar_src,
                session_key:session_key
            }
            // |------>调用service进行获取
            const newUser = await service.user.create( userSchema )
            return newUser;
        }
        // 判断用户是否存在无限卡
            const user_cards = await ctx.model.Usercard.findOne( {
                $and: [
                    {
                        u_id: user.u_id,
                        c_id:3000
                    }
                ]
            } )

        if ( user_cards && user_cards.reMain > 0 )
        {
    
            is_ifinite_user= true
        }
 
        let new_user = JSON.parse( JSON.stringify( user ) )
        new_user.is_ifinite_user=is_ifinite_user
        return new_user
    }
    // 加密id
    encry_openid ( openid ) {

        let u_id
        let hash = crypto.createHash( 'sha1' )
        hash.update( openid )
        u_id = hash.digest( 'hex' );
        return u_id
    }
    // 获取openid sessionkey
    async get_openid_sessionKey ( code ) {

        const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'
        const secret = '换成自己的secret'
        const appid = '换成自己的appid'
        const js_code = code
        const grant_type = 'authorization_code'
        const value = {
            secret,
            appid,
            js_code,
            grant_type
        }
        // 获取openid
        const { data } = await axios.get( loginUrl, { params: value } )
         console.log( 'data' )
         console.log(data)
        return data
    }
    
}

module.exports= LoginService