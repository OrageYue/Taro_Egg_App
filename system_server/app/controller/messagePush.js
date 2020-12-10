/*
 * @Author: yuncheng
 * @Date: 2020-07-17 09:41:10
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-17 09:52:18
 * @FilePath: /booking_system_server/app/controller/messagePush.js
 */ 
const Controller = require( 'egg' ).Controller

class MessagePushController extends Controller{
    constructor (ctx) {
        super(ctx)
    }
    async index () {
        const { ctx } = this
        ctx.body=815449703187
    }
}
module.exports = MessagePushController