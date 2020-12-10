const card = require( '../model/card' );
const axios = require( 'axios' )
/*
 * @Author: yuncheng
 * @Date: 2020-07-03 10:31:35
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-10-23 07:39:54
 * @FilePath: /booking_system_server/app/service/reserve.js
 */ 
const Service = require( 'egg' ).Service
const crypto = require( 'crypto' )
class ReserveService extends Service{
    // ------------------------------提交预约------------------------------
    // 1：从用户卡合集找到用于支付的用户卡
    // 2：验证提交三项card参数和用户card是否对应，对应进行3，否则返回异常
    // 3：扣除对应卡的余额
    // 4：添加用户total时间
    // 6：生成预定信息
    async submit_reserve ( payload ) {
        // 检查状态
        this.check_status()
        const { ctx } = this
        // 解析参数
        // --用户id
        const u_id = payload.u_id
        // 支付卡类型
        const payment_type = payload.payment_type

        // 支付卡id
        const card_id = payload.card_id
        // |-----新增检查该时段是否有活动
        if (await this.chcek_is_survive_activity( payload.start_time ) )
        {
            console.log( this.chcek_is_survive_activity( payload.start_time ))
        //    活动存在，不可预订
             ctx.throw(404,'抱歉！当前时间存在活动，不可预订')
        } else
        {
            // 活动不存在，可预订
            // 当前时间已经超过了预定时间 不可预订
            if ( new Date().valueOf() >= new Date( payload.start_time ).valueOf() )
            {
                ctx.throw( 404, "预约开始时间不能早于当前时间" );
            }
            else
            { 
                                            const user = await ctx.service.user.findUser( u_id )
                    // 美团特殊处理
                if ( payload.payment_type == 'meituan' )
                {
                    console.log( '美团处理' )
                    // 生成预约单数据
                    const reserve_record = {
                        u_id: u_id,
                        u_name:user.name,
                        order_num: this.create_order_num(u_id),
                        phone: user.phone,
                        start_time:new Date(payload.start_time).valueOf(),
                        end_time: new Date( Date.parse( payload.end_time ) ).valueOf(),
                        total_time: payload.total,
                        payment_method:payment_type
                    }
                    const res_meituan = this.meituan_card_pay( payload, reserve_record, user )
                    return res_meituan
                    
                } else
                {
                    // 正常处理
                    //   |-----1、从用户卡合集内查询支付用的用户卡数据
                    const payment_card = await ctx.service.usercard.query_user_payment_card( u_id, card_id )
            
                // 用户手机号不存在，先去绑定
                    if ( !payment_card )
                    {
                        ctx.throw( 404, '用户异常，数据未找到' )

                    } else
                    {


                        
                            // 生成预约单数据
                            const reserve_record = {
                                u_id: u_id,
                                u_name:user.name,
                                order_num: this.create_order_num(u_id),
                                phone: user.phone,
                                start_time:new Date(payload.start_time).valueOf(),
                                end_time: new Date( Date.parse( payload.end_time ) ).valueOf(),
                                total_time: payload.total,
                                payment_method:payment_type
                            }
                            console.log( reserve_record )
                            // payload:是前端提交的创建预约参数
                            // reserve_record：生成用于创建预约记录的数据集
                            // user：是当前用户的信息
                            switch ( payment_type )
                            {
                                case "hour_card":
                                    // 小时卡抵扣
                                    const res_hour = this.hour_card_pay( payload, payment_card, reserve_record, user );
                                    return res_hour;
                                    break;
                                case "day_card":
                                    // 日卡抵扣
                                    const res_day = this.day_card_pay( payload, payment_card, reserve_record, user );
                                    return res_day;
                                    break;
                                case "mouth_card":
                                    // 月卡抵扣
                                    const res_mouth = this.mouth_card_pay( payload, payment_card, reserve_record, user );
                                    return res_mouth;
                                    break;
                            }   
                        
                    }   
                }
            }


       }
      
    }
    // ------------------------------订单取消------------------------------
    // 根据order_num找到订单
    // --订单还未开始，可以取消
    // --订单超过时间不可取消
    // 订单取消
    // 用户学习时间减少，用户卡余额增加
    async update_reserve_cancel ( u_id, order_num,payment_method,mark ) {
        // 执行订单状态复查修改
        // 判断是否可修改
        // 查找当前订单，用户,用户卡数据
        const ole_user = await this.ctx.model.User.findOne( { u_id: u_id } )
        const ord_reserve_record = await this.ctx.model.ReserveRecord.findOne( { order_num: order_num } )
        const ord_usercard = await this.ctx.model.Usercard.findOne( {
            $and: [
                { u_id: u_id },
                { type: payment_method }      
        ]})
        if ( ord_reserve_record.payment_method == 'hour_card')
        {
            console.log('小时卡')
            // 小时卡
            // ----》修改订单（订单状态1->4，添加取消理由）
            const new_reserve_record = await this.ctx.model.ReserveRecord.updateOne( { order_num: order_num }, { $set: { status: 4, mark:mark|| "用户主动取消" } } )
            // ----》修改用户total(用户当前total-订单total)
            const new_user = await this.ctx.model.User.updateOne( { u_id: u_id }, { $set: { total: ole_user.total - ord_reserve_record.total_time } } )
            // ----》 修改卡余额（新卡余额是当前时长+订单时长）
            const new_usercard = await this.ctx.model.Usercard.updateOne( {
                $and: [ {
                    u_id: u_id,
                    c_id:ord_usercard.c_id
            }] }, { $set: { reMain: ord_usercard.reMain + ord_reserve_record.total_time } } )

            return { message: '取消成功' }
            
        } else if (ord_reserve_record.payment_method == 'day_card')
        {
             console.log('日卡')
           // 日卡+1
             // ----》修改订单（订单状态1->4，添加取消理由）
            const new_reserve_record = await this.ctx.model.ReserveRecord.updateOne( { order_num: order_num }, { $set: { status: 4, mark:mark|| "用户主动取消" } } )
            // ----》修改用户total(用户当前total-订单total)
            const new_user = await this.ctx.model.User.updateOne( { u_id: u_id }, { $set: { total: ole_user.total - ord_reserve_record.total_time } } )
            // ----》 修改卡余额（新卡余额是当前时长+订单时长）
            const new_usercard = await this.ctx.model.Usercard.updateOne( {
                $and:
                    [ {
                    u_id: u_id,
                    c_id:ord_usercard.c_id
            }] }, { $set: { reMain: ord_usercard.reMain +1 } } )

            return { message: '取消成功' }
        } else if ( ord_reserve_record.payment_method == 'mouth_card' )
        {
            // 月卡直接取消
            const new_reserve_record = await this.ctx.model.ReserveRecord.updateOne( { order_num: order_num }, { $set: { status: 4, mark: mark || "用户主动取消" } } )
             // ----》修改用户total(用户当前total-订单total)
            const new_user = await this.ctx.model.User.updateOne( { u_id: u_id }, { $set: { total: ole_user.total - ord_reserve_record.total_time } } )
            return { message: '取消成功' }
        }else if ( ord_reserve_record.payment_method == 'meituan' )
        {
            // 美团直接取消
            const new_reserve_record = await this.ctx.model.ReserveRecord.updateOne( { order_num: order_num }, { $set: { status: 4, mark: mark || "用户主动取消" } } )
             // ----》修改用户total(用户当前total-订单total)
            const new_user = await this.ctx.model.User.updateOne( { u_id: u_id }, { $set: { total: ole_user.total - ord_reserve_record.total_time } } )
            return { message: '取消成功' }
        }
        // --修改订单

        
    }
    // ------------------------------用户入场------------------------------

    async update_reserve_admission ( u_id, order_num, payment_method ) {
        // 更新用户订单状态
        const res = await this.ctx.model.ReserveRecord.findOneAndUpdate(
            { order_num: order_num },
            {
                $set: {
                status:2
            }}
        )
        return res 
    }
    // ------------------------------用户出场------------------------------

    async update_reserve_show_up( u_id, order_num, payment_method ) {
         // 更新用户订单状态
        const res = await this.ctx.model.ReserveRecord.findOneAndUpdate(
            { order_num: order_num },
            {
                $set: {
                status:3
            }}
        )
        return res 
    }

    // ------------------------------查询所有预约记录------------------------------
    async query_all_reserves () {
        this.check_status()
        const reserve_records = this.ctx.model.ReserveRecord.find().sort( { created_at: -1 } )
        return reserve_records
    }
    // ------------------------------根据用户id查询对应预约记录------------------------------
    async query_reserves_by_uid ( u_id ) {
        this.check_status()
        const reserve_records = this.ctx.model.ReserveRecord.find( { u_id: u_id } )
        return reserve_records
    }
    // ------------------------------根据用户id和状态查询对应的预约记录
    async query_reserves_by_uid_and_status ( u_id, status ) {
        this.check_status()
        const user = await this.ctx.model.User.findOne( { u_id: u_id } )
        if ( !user )
        {
            this.ctx.throw(404,'用户不存在')
        }
        const reserve_records =await this.ctx.model.ReserveRecord.find( {
            $and: [
                { u_id: u_id },
                { status: status }    
            ]
        } )
        
        return reserve_records
    }


    // ------------------------------操作函数------------------------------
    // |------------生成订单号
    create_order_num ( u_id ) {
        let order_num
        var date = new Date()
        order_num = date.getFullYear() + '' + date.getMonth() + date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + u_id.substring( 0, 7 )
        
        return order_num
    }
    // |------------小时卡抵扣处理
    async hour_card_pay ( payload, payment_card,reserve_record ,user) {
        const { ctx } = this
        let u_id =  user.u_id 
        if ( payment_card.type == payload.payment_type && payment_card.reMain >= payload.total )
            {
                let new_remian = payment_card.reMain-payload.total
            console.log( '余额是' )
            console.log( payment_card.reMain )
             console.log(payload.total)
                 console.log(new_remian)
                // 用户卡余额抵扣
                const res = await ctx.service.usercard.update_user_card_remain( payment_card._id, new_remian )
                if ( res.ok == 1 )
                {
                     // 调用推送
                    await this.push_reserve_success_message(user.openid,reserve_record.start_time)
                    // 抵扣成功 生成预约记录
                    const record_res = await ctx.model.ReserveRecord.create( reserve_record )
                    // 用户学习时间增加
                    let new_total = user.total + payload.total 
                    const new_user_res = await ctx.model.User.updateOne( { u_id: u_id }, { $set: { total: new_total } } ) 
                    // 预定成功
                    return {code:1,data:record_res}

                } else
                {
                    // 预约提交异常
                    return { code: 0, msg: "预定异常" }
                }
            } else
            {
                // 预定类型，不一致或者余额不足
                ctx.throw(404,"余额不足，请充值后再进行操作")
            } 
    }
    // |------------日卡抵扣
    async day_card_pay ( payload, payment_card,reserve_record ,user) {
        const { ctx } = this
        let u_id = user.u_id
        // 目前一期就是最多预定一天的，所以只要日卡余额大于1就可以抵消24h内的
        if ( payment_card.type == payload.payment_type&&payment_card.reMain>=1 )
        {
            let new_remian = payment_card.reMain - 1
            // 用户卡余额更新
            const res = await ctx.service.usercard.update_user_card_remain( payment_card.id, new_remian )
            if ( res.ok == 1 )
            {
                 // 调用推送
                await this.push_reserve_success_message(user.openid,reserve_record.start_time)
                // 抵扣成功，生成预约记录
                const record_res = await ctx.model.ReserveRecord.create( reserve_record )
                // 用户学习时间增加
                let new_total = user.total + payload.total 
                const new_user_res = await ctx.model.User.updateOne( { u_id: u_id }, { $set: { total: new_total } } ) 
                // 预定成功
                return {code:1,data:record_res}
            } else
            {
                // 预约提交异常
                    return { code: 0, msg: "预定异常" }
            }
        } else
        {
             // 预定类型，不一致或者余额不足
                ctx.throw(404,"余额不足，请充值后再进行操作")
        }
        // 日卡
    }
    // |------------月卡抵扣（直接创建订单）
    async mouth_card_pay ( payload, payment_card,reserve_record ,user) {
        const { ctx } = this
                // 目前一期就是最多预定一天的，所以只要日卡余额大于1就可以抵消24h内的
        if ( payment_card.type == payload.payment_type&&payment_card.reMain>=1 )
        {
                // 调用推送
                await this.push_reserve_success_message(user.openid,reserve_record.start_time)
                // 抵扣成功，生成预约记录
                const record_res = await ctx.model.ReserveRecord.create( reserve_record )
                // 用户学习时间增加
                let new_total = user.total + payload.total 
                const new_user_res = await ctx.model.User.updateOne( { u_id: user.u_id }, { $set: { total: new_total } } ) 
                // 预定成功
                console.log(record_res)
               return { code: 1, data: record_res }
            
        } else
        {
             // 预定类型，不一致或者余额不足
                ctx.throw(404,"操作异常")
        }
    }
    // |------------美团直接创建订单
    async meituan_card_pay ( payload,reserve_record ,user) {
        const { ctx } = this
        await this.push_reserve_success_message(user.openid,reserve_record.start_time)
                // 抵扣成功，生成预约记录
                const record_res = await ctx.model.ReserveRecord.create( reserve_record )
                // 用户学习时间增加
                let new_total = user.total + payload.total 
                const new_user_res = await ctx.model.User.updateOne( { u_id: user.u_id }, { $set: { total: new_total } } ) 
                // 预定成功
                console.log(record_res)
               return { code: 1, data: record_res }
    }
    // 通用检查订单时间函数，改变订单状态（在每次执行订单查询时候都要进行）
    async check_status () {
        // 获取所有未入场数据
        console.log('刷新超时取消')
        // 当前时间大于开始时间不可以（即是迟到）
        const now_time = new Date().valueOf()
        const all_noused_reserve_records = await this.ctx.model.ReserveRecord.updateMany(
            {
                status: 1,
                // 筛选
                start_time: { $lt: now_time }
                
            },
            { $set: { status: 4, mark: "超时取消" } } )
        // 默认设置出场（结束时间小于当前时间，例如结束14：00当前17：00）
    }

    // 检查订单是否快开始 is_record_will_start
    async check_is_record_will_start () {
        const {ctx} = this
        const now_time = new Date().valueOf()
        // 查找未开始的订单 status==1
        const all_records = await this.ctx.model.ReserveRecord.find( { status: 1 } )
        // promise原理？
        let res = await Promise.all(all_records.map(  ( item ,index) => {
            return ( async () => {
                let diff_time = ctx.helper.diffTime( now_time, item.start_time )
                // 时间判断应该在15min这里有点问题
                // is_will_start_notice如果推送过，则不再提醒
               if (diff_time.timeH== 0 && diff_time.timeMinute <= 15 &&item.is_will_start_notice==false)
               {
                //    推送
                   await this.push_reserve_will_start_message(item.u_id,item.start_time,item._id )
            }
               return item
            })()
        } ) ) 
    }

    // 后期抽离
    // 预约成功发送推送
    async push_reserve_success_message (openid,start_time) {
        const {ctx} = this
        // 获取微信后端api凭证
        const res_access_token = await ctx.helper.get_wechat_access_token()
        let access_token = res_access_token
        // 创建推送参数
        const push_payload = {
            // 用户id
            touser: openid,
            // 模板id
            template_id: "osZUlOK27gcOmcN2_bFZLshYcPrV1dbdVTeDsAi7ZsY",
            // 进入页面
            page: "pages/appointment/appointment",
            // 内容
            data:{
            //     thing1:{
            //     value:"预定自习室"
            // },
            time1:{
                value:ctx.helper.date_stimap(start_time)
            },
            thing2:{
                value:"预约成功"
                 }
             }         
        }
        const url=`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token }`
        const res = await axios.post( url, push_payload )
    }

    // -----》预约即将开始推送
    async push_reserve_will_start_message ( u_id, start_time, _id ) {
        const {ctx} = this
        // 用户openid
        const user = await ctx.model.User.findOne( { u_id: u_id } )
        let  openid = user.openid
        // 获取微信后端api凭证
        const res_access_token = await ctx.helper.get_wechat_access_token()
        let access_token = res_access_token
        // 创建推送参数
        const push_payload = {
            // 用户id
            touser: openid,
            // 模板id
            template_id: "bL3z4Vx6z5h8O6vzsOTysQuJyyJ6aimxAfhs6_RIQCo",
            // 进入页面
            page: "pages/appointment/appointment",
            // 内容
            data:{
                thing1:{
                    value:'自习室预约即将开始'
            },
                date2:{
                    value:ctx.helper.date_stimap(start_time)
            },
                thing3:{
                    value:"请尽快扫码入场"
                 }
             }         
        }
        const url=`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token }`
        const res = await axios.post( url, push_payload )
        console.log( res )
        // 推送成功
        if ( res.data.errcode == 0 )
        {
            // 设置标识符为true,表示已经通知过
            await ctx.model.ReserveRecord.updateOne( { _id: _id }, {
                $set: {
                is_will_start_notice:true
            }})
        }
    }

    // -----》预约即将结束推送
    async push_reserve_will_end_message (u_id,thing1,data2,thing3) {
        // 接收参数
        // 用户id
        
        // 预定事项
        // 预定时间
        // 预定状态
        const {ctx} = this
        // 获取微信后端api凭证
        const res_access_token = await ctx.helper.get_wechat_access_token()
        let access_token = res_access_token
       
        // 创建推送参数
        const push_payload = {
            // 用户id
            touser: "oMkUf0T9mOOxPDEdBLnEgqyKzShA",
            // 模板id
            template_id: "2RYTPd95mPLNlJ_IjjD80b9dyGwVo9zXMWzNWFtDdvU",
            // 进入页面
            page: "pages/appointment/appointment",
            // 内容
            data:{
                thing1:{
                value:"预定自习室"
            },
            date2:{
                value:"2020-02-20"
            },
            thing3:{
                value:"预约成功"
                 }
             }         
        }
        const url=`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token }`
        const res = await axios.post( url, push_payload )
        console.log(res)
    }

    // -----》检查该时段是否有活动
    async chcek_is_survive_activity ( time ) {
        let is_survive = false
        console.log('time')
       
        const all_activities = await this.ctx.model.Activity.find()
      
        all_activities.map( ( item ) => {
            console.log( '12' )
             console.log( time )
            console.log(item.activity_time )
            const diffH = this.ctx.helper.diffTime( Date.parse( time ), Date.parse( item.activity_time ) ).timeH
             const diffM = this.ctx.helper.diffTime( Date.parse( time ), Date.parse( item.activity_time ) ).timeMinute
            // 时间差不能在正向2h内，否则就是存在
            if ((diffH<=2&&diffH>=0))
            {
                is_survive = true
            }
        } )
        
        console.log( is_survive )
        return is_survive
    }
}

module.exports = ReserveService