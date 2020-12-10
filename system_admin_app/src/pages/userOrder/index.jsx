import Taro, { useDidShow, getCurrentPages, useState } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Button } from '@tarojs/components';
import './index.scss';
import { MAINHOST } from '../../config/index';
import { date_stimap } from '../../pages/utils/common';

function UserOrder () {

    const [ order_list, set_order_list ] = useState( [] );

    useDidShow( () => {
        handle_user_order();
    } );
    // 获取用户今日订单
    const handle_user_order = async () => {
        console.log( this.$router.params );
        let u_id = this.$router.params.u_id || '8169f97f9fb7f334253fb953601a42c185bddaf2';
        let status = this.$router.params.status;
        const res = await Taro.request( {
            url: `${ MAINHOST }/api/v1/reserve_by_uid_and_status`,
            method: "GET",
            data: {
                u_id: u_id,
                status: status
            }
        } );
        // 用户不存在
        if ( res.data.code == 404 )
        {
            Taro.showModal( {
                title: "提示",
                content: "用户不存在，请重新扫码",
                success: function ( res ) {
                    if ( res.confirm )
                    {
                        Taro.navigateBack( {
                        } );
                    }
                }
            } );
        } else
        {
            set_order_list( res.data.data );
        }

    };
    // 用户入场
    const handle_user_admission = async ( v, opt_type ) => {
        const u_id = v.u_id;
        const order_num = v.order_num;
        const payment_method = v.payment_method;
        const payload = {
            order_num: order_num,
            payment_method: payment_method,
            opt_type: opt_type
        };
        // 请求入场接口
        const res = await Taro.request( {
            url: `${ MAINHOST }/api/v1/reserve/${ u_id }`,
            method: "PUT",
            data: payload

        } );
        if ( res.data.code == 1 )
        {
            Taro.showToast( {
                title: this.$router.params.status == 1 ? "出场再次扫码" : "出场完成",
                icon: "success"
            } );
            setTimeout( () => {
                handle_user_order();
            }, 1500 );
        }
    };
    return (
        <View className="user-order-bg">
            <View className="user-order-content-bg">
                <View onClick={ () => { Taro.navigateBack( {} ); } }>
                    <Image
                        style={ { width: "20px", height: "20px", opacity: "0.8", marginTop: "1.5em", marginLeft: "10%" } }
                        src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/icon%E5%85%83%E7%B4%A0/%E8%BF%94%E5%9B%9E.png"
                    />
                </View>
                <Swiper
                    style={ { height: "100vh" } }
                    easingFunction="linear"
                    previousMargin="30px"
                    nextMargin="30px"
                >
                    {
                        order_list.length > 0
                            ? order_list.map( v => {
                                return (
                                    <SwiperItem key={ v._id } >
                                        <View className="user-order-content">

                                            <Text style={ { fontSize: "14px" } }> 订单号：{ v.order_num }</Text>
                                            {/* 订单详情 */ }
                                            {/* 个人信息 */ }
                                            <View style={ { marginTop: "60px" } }>
                                                <View style={ { overflow: "hidden" } }>
                                                    <View style={ { float: "left" } }>
                                                        <Image style={ { width: "50px", height: "50px", background: "#ececec", borderRadius: "50px" } } />
                                                    </View>
                                                    <View style={ { float: "left", marginLeft: "40px", marginTop: "15px" } }>{ v.u_name }</View>
                                                </View>
                                                <View style={ { marginTop: "40px" } }>
                                                    开始时间：
                                             <Text>{ date_stimap( v.start_time ) }</Text>
                                                </View>
                                                <View style={ { marginTop: "40px" } }>
                                                    开始时间：
                                              <Text>{ date_stimap( v.end_time ) }</Text>
                                                </View>
                                                <View style={ { marginTop: "40px" } }>
                                                    开始时间：
                                            <Text>{ v.total_time }</Text>
                                                </View>
                                                <View>
                                                    { this.$router.params.status == 1 && ( <Button className="user-order-btn" onClick={ () => handle_user_admission( v, 'admission' ) }>确定入场</Button> ) }
                                                    { this.$router.params.status == 2 && ( <Button className="user-order-btn" onClick={ () => handle_user_admission( v, 'show_up' ) }>确定出场</Button> ) }

                                                </View>
                                            </View>
                                        </View>

                                    </SwiperItem>
                                );
                            } )

                            : <SwiperItem key='0002' >
                                <View className="user-order-content" >
                                    <View style={ { marginTop: "120px", textAlign: "center" } }>
                                        暂无订单
                                    </View>
                                </View>
                            </SwiperItem>
                    }
                </Swiper>
            </View>
        </View>
    );
}

UserOrder.config = {
    navigationBarTitleText: '用户订单',
    navigationStyle: "custom"
};

export default UserOrder;