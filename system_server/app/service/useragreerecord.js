/*
 * @Author: yuncheng
 * @Date: 2020-07-19 22:19:47
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-19 23:17:02
 * @FilePath: /booking_system_server/app/service/useragreerecord.js
 */ 
// 用户协议记录
const Service = require( 'egg' ).Service

class UseragreeRecordService extends Service{
    // 创建用户协议
    async create (payload) {
        const agree_record = await this.ctx.model.UserAgreeRecord.create( payload )
        return agree_record
    }
    // 获取所有数据
    async index ( u_id ) {
        if ( u_id )
        {
            const agree_record = await this.ctx.model.UserAgreeRecord.findOne( { u_id: u_id } )
            if ( !agree_record )
            {
                this.ctx.throw(404,'不存在')
            }
            return agree_record.status 
        } else
        {
            const agree_records = await this.ctx.model.UserAgreeRecord.find( )
            return agree_records
        }
    }

}

module.exports= UseragreeRecordService