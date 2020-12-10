/*
 * @Author: yuncheng
 * @Date: 2020-07-06 16:13:16
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-13 17:57:58
 * @FilePath: /booking_system_server/app/service/admin.js
 */ 
const Service = require( 'egg' ).Service

class AdminService extends Service{
    async admin_login_check (username,password) {
        const admin =await this.ctx.model.Admin.findOne( {
            $and: [ {
                username: username,
                password:password
            }]
        } )
        // console.log(admin)
        if ( !admin )
        {
            this.ctx.throw(404,'没有找到')
        } else
        {
            return admin
        }
    }
}

module.exports = AdminService