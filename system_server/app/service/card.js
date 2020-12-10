const card = require( '../model/card' );

/*
 * @Author: yuncheng
 * @Date: 2020-05-27 15:34:44
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-11-16 11:10:17
 * @FilePath: /booking_system_server/app/service/card.js
 */ 
const Service = require( 'egg' ).Service

class CardService extends Service {
    // |-----主要操作
    // --->获取所有card列表
    async index () {
        const cards = await this.ctx.model.Card.find()
        return cards
    }
    // --->创建card
    async create ( payload ) {
        const { ctx, service } = this
         return ctx.model.Card.create( payload )
    }
    // --->编辑card
    async update (id, payload ) {
        const { ctx } = this
        const new_card = await ctx.model.Card.updateOne( { _id: id }, payload )
        return new_card
    }
    // --->删除card
    async destroy ( _id ) {
        const { ctx } = this
        const room = await ctx.service.card.find( _id )
        if ( !room )
        {
            ctx.throw(404, "不存在自习室");
        }
        return ctx.model.Card.findByIdAndRemove(_id)
    }

    // ---->个人中心用户所有卡
    async all_user_cards ( payload ) {
        // 获取所有卡类型
        const cards = await this.ctx.model.Card.find()
        // 循环获取余额
        let res = await Promise.all(cards.map(  ( item ) => {
           return ( async () => {
               let remain = await this.user_card_remain( payload, item.c_id )
               let item2 = JSON.parse( JSON.stringify( item ) )
               item2.remain = remain
               return item2
            })()
        } ))
         return res
    }
    // 从用户卡合集里面获取用户对应卡的余额
    async user_card_remain (payload,c_id) {
        const u_id = payload.u_id
        let remain = 0

        // 从用户卡合集里获取对应用户卡
        const usercard = await this.ctx.model.Usercard.findOne( {
            $and: [
                { u_id: u_id },
                { c_id: c_id }
            ]
        } )
        console.log(usercard)
        if ( usercard )
        {
            if ( c_id == 3000 )
            {
                 // 月卡刷新卡余额
             const mouth_new_remain = await this.update_mouth_card_remain(u_id,c_id)
             remain =  mouth_new_remain
            } else
            {
                // 普通卡直接返回
               remain = usercard.reMain 
            }  
        } 
        let new_remain = remain.toFixed(2)
        return new_remain
    }
    // |-----通用
    // 查找单个card
    async find (id) {
        const room = await this.ctx.model.Card.findById(id)
        return room
    }

    // 刷新付费卡余额
    async update_mouth_card_remain ( u_id, c_id ) {
        let com_remain = 0
        // 传入两个参数：用户id和卡片id
        // 新的余额计算规则：到期时间-当前时间
        const usercard = await this.ctx.model.Usercard.findOne( {
            $and: [
                { u_id: u_id },
                { c_id: c_id }
            ]
        } )
        console.log('----》《----')
        console.log( usercard )
          console.log('----》《----')
            //   处理remian为0
               if ( usercard.reMain == 0 )
               {
                   console.log('余额为0')
                  // 余额为0
                    com_remain = 0
                  
               } else
               {
                var day1 = new Date(usercard.end_time);
                   var day2 = new Date( this.card_end_time( new Date() ) );
                   if ( day2 > day1 )
                   {
                        console.log('超时数据')
                    // 超时数据
                    com_remain = 0
                    
                   } else
                   {
                        console.log('正常数据')
                    // 正常数据
                   com_remain = Math.abs( day1 - day2 ) / 1000 / 60 / 60 / 24;                  
                   }
               }
                // 更新数据
                await this.ctx.model.Usercard.updateOne( {
                    $and: [
                    { u_id: u_id },
                    { c_id: c_id }
                    ]
                    }, {
                    $set: {
                    reMain: Math.ceil(com_remain) 
                }})
                return  com_remain
    }
        // 计算到期时间
    card_end_time (date) {
        var year = date.getFullYear();
        var month = date.getMonth()+1, month = month < 10 ? '0' + month : month;
        var day = date.getDate(), day =day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }
}

module.exports= CardService