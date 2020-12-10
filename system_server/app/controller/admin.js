/*
 * @Author: yuncheng
 * @Date: 2020-07-06 16:06:40
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-13 17:58:52
 * @FilePath: /booking_system_server/app/controller/admin.js
 */ 
const Controller = require( 'egg' ).Controller

class AdminController extends Controller{
    constructor ( ctx ) {
        super(ctx)
    }

    async admin_login () {
       
        const { ctx } = this
       
        const { username, password } = ctx.request.body

        const res = await ctx.service.admin.admin_login_check( username, password )
      
        ctx.helper.success({ctx,res})
    }
}

module.exports  = AdminController