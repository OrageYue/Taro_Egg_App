
const axios = require( 'axios' )
const Service = require( 'egg' ).Service
const crypto = require( 'crypto' );
var Parser = require("fast-xml-parser");

class RechargeService extends Service{
    // ---------------------------------->所有充值记录<----------------------------------------
    async index ( u_id, phone ) {
        let rechagres
        console.log(phone)
        if ( u_id )
        {
            // 用户id存在
            rechagres =await this.ctx.model.Recharge.find(  { u_id: u_id } )
        } else if ( phone )
        {
            // 手机号存在
            // 先查用户
            const user = await this.ctx.model.User.findOne( { phone: phone } )
            // 根据u_id查询记录
            if ( !user )
            {
                this.ctx.throw(404,'用户不存在')
            }
            rechagres = await this.ctx.model.Recharge.find( { u_id: user.u_id} )
        } else
        {
            rechagres = await this.ctx.model.Recharge.find( )
        }
        
        return rechagres
    }
    // 获取用户充值记录
    async show ( u_id ) {
        const rechagres = await this.ctx.model.Recharge.find( { u_id: u_id } )
        return rechagres
    }
    // ---------------------------------->微信付款完成调用，创建充值订单信息<----------------------------------------
    async create_recharge ( u_id, package_payload, card_id ,r_number,card_name) {
        const {ctx} = this
        // （1）、获取该笔订单微信支付状态
        const pay_state = await this.query_wxpay_action( r_number )
        // （2）、判断微信支付交易状态，是否成功（SUCCESS）
        if ( ( pay_state.trade_state=="SUCCESS") && (pay_state.result_code=="SUCCESS"))
        {
            // -----------------------------------卡操作start-----------------------------------
            // 2.1、微信支付成功
            console.log( '支付成功' )
            console.log( pay_state.trade_state )
            const recharge_record = {
            // 2.2、组合订单数据
            r_number: r_number,
            u_id,
            card_id,
            r_amount: package_payload.p_amount,
            package_id: package_payload.id,
            package_type: package_payload.type,
            package_name: package_payload.name,
            package_total: package_payload.total,
            is_success:"true"
        }
        // (3)、查找当前用户对应卡的余额
        const res_usercard = await ctx.model.Usercard.findOne( {
            $and: [
                { u_id: u_id },
                {c_id:card_id}
            ]
        } )
        let old_usercard = res_usercard
            // N:如果用户卡不存在的话,先给用户创建这张卡
            if ( !old_usercard )
            { 
                 var now = this.card_end_time( new Date() ) 
                const usercard_payload = {
                        c_id: card_id,
                        name:card_name,
                        type: package_payload.type,
                        u_id: u_id,                
                        reMain: 0,               
                        is_activate: true,
                        start_time: "",
                        // 开卡时候直接根据当前时间和total计算endtime
                        end_time:package_payload.type=="mouth_card"?now:""
                }
                old_usercard = await ctx.service.usercard.create( usercard_payload )
            }
            // 月卡刷新余额(余额=当前有效结束时间-当前时间)
                var day1 = new Date(old_usercard.end_time);
                var day2 = new Date(this.card_end_time( new Date() )) ;
                var new_mouth_card_remain = Math.abs(day1-day2)/1000/60/60/24;
            // 如果之前就有无限月卡，那么设置新的结束时间=当前结束时间+新增时长
                var new_end_time = old_usercard.end_time
                new_end_time = new_end_time.split('-')
                new_end_time = new Date( Number( new_end_time[ '0' ] ), ( Number( new_end_time[ '1' ] ) - 1 ), Number( new_end_time[ '2' ] ) )  
                new_end_time.setDate( new_end_time.getDate() + package_payload.total)
                var new_end_time = ctx.helper.formatTime( new_end_time ) 
        //（4）Y:根据用户卡id修改余额
        const new_card = await ctx.model.Usercard.updateOne( {
                $and: [
                    { u_id: u_id },
                        {c_id:card_id}
                    ]
                }, {
                        $set: {
                            // 新的余额=旧的余额+充值金额
                        reMain:  package_payload.type=="mouth_card"?new_mouth_card_remain+ package_payload.total:old_usercard.reMain + package_payload.total,
                            // 到期时间设置
                        end_time:package_payload.type=="mouth_card"?new_end_time:""
                    }
                } )
            if ( new_card )
            {
                // （5）用户余额修改成功，创建交易记录
                const new_recharge_record = ctx.model.Recharge.create( recharge_record )
                return new_recharge_record
            }
            // -----------------------------------卡操作end-----------------------------------
        }
        else
        {
             // （6）chuan失败,后期处理
            console.log( '支付失败' )
        }

    }
    //---------------------------------->接收微信支付通知回调<----------------------------------------
    async wxpay_action ( payload ) {
        const { ctx } = this
        
        console.log(new Parser.parse( payload ).xml)
        var jsonObj = new Parser.parse( payload ).xml
        // 订单号
        const r_number = jsonObj.out_trade_no
        if (jsonObj.result_code=="SUCCESS")
        {
            // 支付成功
            await ctx.model.Recharge.updateOne( { r_number: r_number }, { $set: { is_success: "true" } } )
            console.log( '订单完成' )
            // 返回参数(转为xml)
            const result_payload = {
                xml: {
                    return_code: "SUCCESS",
                }
                
            }
            var parser = new Parser.j2xParser({format: true,});
            var xml = parser.parse( result_payload);
            return xml
        } else
        {
            // 支付失败
             const result_payload = {
                 xml: {
                    return_code: "FAIL",
                }
                
             }
             // 返回参数(转为xml)
            var parser = new Parser.j2xParser({format: true,});
            var xml = parser.parse( result_payload );
            return xml
        }
    }
    //---------------------------------->主动查询微信支付结果<----------------------------------------
    async query_wxpay_action ( r_number ) {
        //  不同于上方被动接收，而是主动调用微信接口，查询订单状态
        // （1）、生成随机字符串
        const noncestr = crypto.randomBytes( Math.ceil( 32 / 2 ) ).toString( 'hex' ).slice( 0, 32 ).toUpperCase()
        // （2）、组合需要的四个参数：appid，商户id，随机字符串，订单号（我们使用的商户侧订单号）
        const payload = {
            appid: '换成自己的appid',
            // 商户号
            mch_id: "换成自己的商户号",
            // 随机字符串
            nonce_str: noncestr,
            // 商户订单号
            out_trade_no: r_number,
        }
        // （3）、对之前四个参数进行签名，得到sign（对前四个参数按照ASCII顺序组成字符串加上商户key进行MD5加密）
        let stringA = `appid=${ payload.appid }&mch_id=${ payload.mch_id }&nonce_str=${ payload.nonce_str }&out_trade_no=${ payload.out_trade_no }`
        let stringSignTemp = stringA + "&key=换成自己的key"; //注：key为商户平台设置的密钥key
        let sign = this.md5_sign( stringSignTemp ).toUpperCase()
        // （4）、组装四个参数和根据四个参数生成的sign
        let new_payload = {
            xml: {
            ...payload,
            sign
            }
        }
        // (5)、微信接收的是xml格式请求，所以进行json转xml
        var parser = new Parser.j2xParser({format: true,});
        var xml = parser.parse( new_payload );
        // (6)、调用支付订单状态查询接口 ，查询订单状态
        const query_url='https://api.mch.weixin.qq.com/pay/orderquery'
        const { data } = await axios.post( query_url, xml )
        var jsonObj = new Parser.parse( data )
        // (7)、返回订单状态
        return jsonObj.xml
    }
    //---------------------------------->微信统一下单函数，返回prepay_id给用户<----------------------------------
    async we_chat_pauyment_order ( r_amount, u_id ) {
        // 获取商户号key值
        const {key_value} =  await this.ctx.service.keyrecord.qurey_by_keyid('mch_key','3Q9tru0102')
        // 前端先调用统一下单接口，获取prepay_id后才可以在小程序发起微信支付
        // （1）、根据请求用户的u_id查找用户openid
        const user = await this.ctx.model.User.findOne( { u_id: u_id } )
        if ( !user )
        {
            this.ctx.throw(404,'用户不存在')
        }
        const openid = user.openid
         // （2）、生成商户侧订单随机订单号
        const  r_number = this.create_rechage_number()
        const payUrl = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
         // （3）、生成随机字符串
        const noncestr = crypto.randomBytes( Math.ceil( 32 / 2 ) ).toString( 'hex' ).slice( 0, 32 ).toUpperCase()
         // （4）、金额转为分
        const totalfree = r_amount * 100
         // （5）、组装参数1
        const payload = {
            appid: '换成自己的appid',
            body: "自习卡充值", // 商品描述
            mch_id: "换成自己的商户号", // 商户号
            nonce_str: noncestr, // 随机字符串
            notify_url: "https://www.xxxxx.com/xxx",  // 通知地址
            openid:openid, // openid
            out_trade_no: r_number, // 商户订单号
            spbill_create_ip: "ip地址",  // 终端ip
            total_fee: totalfree, // 金额（分）
            trade_type:"JSAPI" // 交易类型（JSAPI：小程序支付）
        }
        console.log(key_value)
        // （6）、对参数1和商户key进行组合签名，获取sign
        let stringA = `appid=${ payload.appid }&body=${ payload.body }&mch_id=${ payload.mch_id }&nonce_str=${ payload.nonce_str }&notify_url=${ payload.notify_url }&openid=${payload.openid}&out_trade_no=${ payload.out_trade_no }&spbill_create_ip=${ payload.spbill_create_ip }&total_fee=${ payload.total_fee }&trade_type=${ payload.trade_type }`
       
        let stringSignTemp = stringA + `&key=${ key_value }`; //注：key为商户平台设置的密钥key
        
        
        let sign = this.md5_sign( stringSignTemp ).toUpperCase()

        
         // （7）、将参数1和sign组合为参数2
        let new_payload = {
            xml: {
            ...payload,
            sign
            }
        }
        console.log(new_payload)
        // （8）、对参数2 json转xml
        var parser = new Parser.j2xParser({format: true,});
        var xml = parser.parse( new_payload );
        // （9）、请求微信统一支付接口
        const { data } = await axios.post( payUrl, xml )
        // （10）、对返回参数xml转json
        var jsonObj = new Parser.parse( data )

        console.log(jsonObj)
        // （11）、返回prepay_id等信息到小程序
        const res_payload = {
            ...jsonObj.xml,
            // 返回生成的随机订单号，用于之后创建订单
            r_number:r_number
        }
        return res_payload
    }
    //--------------------------------------通用分类处理--------------------------------------
    //-------------------------------------->生成订单号<--------------------------------------
    create_rechage_number () {
        const now_date = new Date().valueOf() // 生成时间戳
        const random_number = crypto.randomBytes( Math.ceil( 8 / 2 ) ).toString( 'hex' ).slice( 0, 8 ) // 随机序列
        const rechagre_number=now_date+random_number //组合订单号
        return rechagre_number
    }
    //-------------------------------------->MD5加密<--------------------------------------
    md5_sign ( stringSignTemp ) {
        console.log( '签名' )
        console.log(stringSignTemp)
        let sign
        let md5 = crypto.createHash( 'md5' )
        md5.update( stringSignTemp )
        sign = md5.digest( 'hex' );
         console.log(sign)
        return sign
    }

    // 计算到期时间
    card_end_time (date) {
        var year = date.getFullYear();
        var month = date.getMonth()+1, month = month < 10 ? '0' + month : month;
        var day = date.getDate(), day =day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }
}

module.exports = RechargeService