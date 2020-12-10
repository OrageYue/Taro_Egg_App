/*
 * @Author: yuncheng
 * @Date: 2020-07-16 09:35:25
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-16 10:53:55
 * @FilePath: /booking_system_server/app/service/keyrecord.js
 */ 
const Service = require( 'egg' ).Service

class KeyRecordService extends Service{

    // ---------------------------查询所有数据---------------------------
    async all_keyrecords () {
        const res = await this.ctx.model.KeyRecord.find()
        return res
    }
    // ---------------------------新建---------------------------
    async create (payload) {
        const res = await this.ctx.model.KeyRecord.create( payload )
        return res
    }
    // ---------------------------删除---------------------------
    async destroy (key_id) {
        const res = await this.ctx.model.KeyRecord.remove({key_id:key_id})
        return res
    }
    // ---------------------------根据key_type和key_id请求---------------------------
    async qurey_by_keyid ( key_type, key_id ) {
        const keyrecord = await this.ctx.model.KeyRecord.findOne( {
            $and: [
                { key_id: key_id },
                { key_type: key_type }
            ]
        } )
        if ( !keyrecord )
        {
            this.ctx.throw(404,'没有数据')
        }
        const value = {
            key_value:keyrecord.key_value
        }
        return value
    }
}

module.exports= KeyRecordService