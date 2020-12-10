/*
 * @Author: yuncheng
 * @Date: 2020-07-27 08:50:20
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-27 09:11:18
 * @FilePath: /booking_system_server/app/service/agreementContent.js
 */ 
const Service = require( 'egg' ).Service

class AgreementContentService extends Service{

    // 添加用户协议
    async create (payload) {
        const agreement_content = await this.ctx.model.AgreementContent.create( payload )
        return agreement_content
    }
    // 按版本获取用户协议
    async show_one ( id ) {
        
        const agreement =await  this.ctx.model.AgreementContent.findOne( {
            a_version: id,
        } )
        if ( !agreement )
        {
            this.ctx.throw( 404, '不存在' )
        }
        console.log(agreement)
        return agreement
    }
}

module.exports= AgreementContentService