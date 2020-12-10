/*
 * @Author: yuncheng
 * @Date: 2020-07-22 18:24:40
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-24 08:11:00
 * @FilePath: /booking_system_server/app/service/activityBooking.js
 */ 
// 活动预定

const Service = require( 'egg' ).Service

class ActivityBookingService extends Service{
    // --|主要接口
    // 获取所有数据列表
    async index () {
        const { ctx } = this
       
        const all_bookings = await ctx.model.ActivityBookingRecord.find()
        return all_bookings
    }
    // 获取某个活动预订列表（寻找活动号对应的切状态为有效）

    // 获取某个用户预订列表(订单信息和活动信息共同获取)
    async user_booking_record ( u_id ) {
        const { ctx } = this
        // 获取用户预订提交记录
        const user_records =await ctx.model.ActivityBookingRecord.find( { u_id: u_id } )
        // 整合活动信息
        let new_user_records = await Promise.all(user_records.map(  ( item ) => {
            return ( async () => {
               console.log(item)
            //    根据a_id查找活动信息
               let activity_info = await ctx.model.Activity.findOne( { _id: item.a_id } )
                console.log( activity_info )
                
                 console.log('activity_info')
                let item2 = JSON.parse( JSON.stringify( item ) )
                 let item3 = JSON.parse( JSON.stringify( activity_info) )
                console.log(item2)
               let new_record = {
                   ...item3,
                   ...item2
               }
                console.log(new_record)
               return new_record
            })()
        } ) )
        
        return new_user_records
    }
    // 创建活动预定订单
    async create ( payload ) {
        const { ctx } = this
         // 查看用户预订状态
        // 不存在：直接预订
        // 存在：查看订单status，如果是cancel可预订
        const is_reserve = await ctx.model.ActivityBookingRecord.findOne( {
            $and: [
                {
                    a_id: payload.a_id,
                    u_id:payload.u_id
                }
            ]
        } )
        if ( is_reserve && is_reserve.u_id && is_reserve.status=="Effective" )
        {
            // （1）---用户订单存在，且状态正常，不可预订
            ctx.throw(404,'已经预订过,不可重复预订')
        } 
        else if (is_reserve && is_reserve.u_id && is_reserve.status=="cancel")
        {
             // （2）---用户订单记录存在，修改即可
            const a_number = ctx.helper.create_rechage_number()
            const booking_record = await ctx.model.ActivityBookingRecord.updateOne( {
                $and: [ {
                    a_id: payload.a_id,
                    u_id:payload.u_id
                }]
            }, {
                $set: {
                status:"Effective"
            }})

            // 创建成功，用户卡要扣除相应的余额
            if ( booking_record )
            {
                // 寻找用户小时卡
                const payment_card = await ctx.service.usercard.query_user_payment_card( payload.u_id, 1000 )
                // 新的余额
                let new_remian = payment_card.reMain-payload.pay_amount
                // 用户卡余额抵扣（因为暂时只支持小时卡，所以c_id=1000）
                const res = await ctx.service.usercard.update_user_card_remain(payment_card._id, new_remian )
            }
            return booking_record
        }
        else
        {
             // （3）---用户订单不存在，可直接预订
            const a_number = ctx.helper.create_rechage_number()
            const book_payload = {
                ...payload,
                a_number
            }
            const booking_record = await ctx.model.ActivityBookingRecord.create( book_payload )

            // 创建成功，用户卡要扣除相应的余额
            if ( booking_record )
            {
                // 寻找用户小时卡
                const payment_card = await ctx.service.usercard.query_user_payment_card( payload.u_id, 1000 )
                // 新的余额
                let new_remian = payment_card.reMain-payload.pay_amount
                // 用户卡余额抵扣（因为暂时只支持小时卡，所以c_id=1000）
                const res = await ctx.service.usercard.update_user_card_remain(payment_card._id, new_remian )
            }
            return booking_record
        }

    }
    // 用户取消预定（用户订单状态设为cancel）
    async user_cancel ( u_id, a_number ) {
        // 根据用户和订单id修改
        const { ctx } = this
        const old = await ctx.model.ActivityBookingRecord.findOne( {
                $and: [ {
                    u_id: u_id,
                    a_number: a_number,
                    }
                ]
        } )
        console.log('old')
        console.log(old)
        if ( old.status == "cancel" )
        {
            ctx.throw(404,'重复取消')
        } else if( old.status == "Effective")
        {
            const res = await  ctx.model.ActivityBookingRecord.updateOne( {
                $and: [ {
                    u_id: u_id,
                    a_number: a_number,
                    // 正常状态才可取消
                    status:"Effective"
                },]
                }, {
                $set: {
                status:"cancel"
                }
            } )
            console.log( res )
            // 修改成功恢复余额
         if ( res.ok == 1 )
            {
           
                // 寻找用户小时卡
                const payment_card = await ctx.service.usercard.query_user_payment_card( u_id, 1000 )
                // 新的余额
                let new_remian = payment_card.reMain+old.pay_amount
                // 用户卡余额增加（因为暂时只支持小时卡，所以c_id=1000）
                await ctx.service.usercard.update_user_card_remain(payment_card._id, new_remian )
         }
            return res
        }
       
        
    }
    
}

module.exports = ActivityBookingService
