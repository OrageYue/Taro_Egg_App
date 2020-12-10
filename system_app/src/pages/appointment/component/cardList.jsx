
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Button } from '@tarojs/components';
import './index.scss';
import { MAINHOST } from '../../../config';
import { date_stimap } from '../../../utils/common';
function CardList ( { appointment, personal, dispatch } ) {
    /**
     * 取消订单操作
     * @function handle_reserver_cancel
     * @param {*} item 订单项
     */
    const handle_reserver_cancel = ( item ) => {
        Taro.showModal( {
            title: "提示",
            content: "您确定要取消吗",
            success: function ( res ) {
                if ( res.confirm )
                {
                    handle_update_appointment( personal.userInfo.u_id, item.order_num, item.payment_method );
                }
            }
        } );
    };
    /**
     * 订单取消执行函数
     * @function handle_update_appointment
     * @param {*} u_id  用户id
     * @param {*} order_num  订单号
     * @param {*} payment_method  支付方式
     */
    const handle_update_appointment = async ( u_id, order_num, payment_method ) => {
        Taro.request( {
            url: `${ MAINHOST }/api/v1/reserve/${ u_id }`,
            method: "PUT",
            data: {
                order_num,
                payment_method,
                opt_type: "user_cancel"
            },
            success: function ( res ) {
                if ( res.data.code == 1 )
                {
                    Taro.showToast( {
                        title: "取消成功",
                        icon: "check"
                    } );
                    dispatch( {
                        type: "appointment/get_reserve_record",
                        payload: {
                            u_id: personal.userInfo.u_id,
                            status: 1

                        }
                    } );
                }
            }
        } );
    };
    /**
     * 订单提醒操作
     * @function handle_remain_user_willstart
     */
    const handle_remain_user_willstart = async () => {
        await Taro.requestSubscribeMessage( {
            tmplIds: [ 'bL3z4Vx6z5h8O6vzsOTysQuJyyJ6aimxAfhs6_RIQCo' ],
            success: function ( res ) {
                Taro.showToast( {
                    title: "添加提醒成功",
                    icon: "success"
                } );
            }
        } );
    };
    return (
        <View style={ { paddingLeft: "10px", paddingRight: "10px" } }>
            { appointment.appointLists.map( item => {
                return (
                    <View key={ item.v_id } style={ { background: "#ffffff", margin: "5px 0", borderRadius: "5px" } }>
                        <View style={ { padding: "5px 5%" } }>
                            <View style={ { paddingBottom: "20px" } }>
                                {/* 订单号 */ }
                                <View style={ { float: "left", } }>
                                    <Text style={ { fontSize: "12px", color: "#bfbfbf" } }>订单号:</Text>
                                    <Text style={ { fontSize: "12px", marginLeft: "5px", color: "#bfbfbf" } }>{ item.order_num }</Text>
                                </View>
                                {/* 展示状态信息 */ }
                                { item.status == 1 && item.payment_method == 'meituan' &&
                                    <View style={ { float: "right", height: "40px", marginTop: "5px" } }>
                                        <View >
                                            <Text style={ { fontSize: "14px", color: "#00D0C7" } }>美团订单</Text>
                                        </View>
                                    </View>
                                }
                                { item.status == 2 &&
                                    <View style={ { float: "right", height: "40px", marginTop: "5px" } }>
                                        <View >
                                            <Text style={ { fontSize: "14px", color: "#00D0C7" } }>订单进行中</Text>
                                        </View>
                                    </View>
                                }
                                { item.status == 3 &&
                                    <View style={ { float: "right", height: "40px", marginTop: "5px" } }>
                                        <View >
                                            <Text style={ { fontSize: "14px", color: "#00D0C7" } }>已完成</Text>
                                        </View>
                                    </View>
                                }
                                { item.status == 4 &&
                                    <View style={ { float: "right", height: "40px", marginTop: "5px" } }>
                                        <View >
                                            <Text style={ { fontSize: "12px", color: "#ff4d4f" } }>{ item.mark }</Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            {/* 底部区域 */ }
                            <View style={ { marginTop: "30px", overflow: "hidden", paddingBottom: "10px" } }>
                                {/* 时间展示 */ }
                                <View style={ { float: "left" } }>
                                    <View style={ { fontSize: "14px" } }>
                                        <Text style={ { fontWeight: "500" } }>开始时间：</Text>
                                        <Text style={ { marginLeft: "10px" } }>{ date_stimap( item.start_time ) }</Text>
                                    </View>
                                    <View style={ { marginTop: "20px", fontSize: "14px" } }>
                                        <Text style={ { fontWeight: "500" } }>结束时间：</Text>
                                        <Text style={ { marginLeft: "10px" } }>{ date_stimap( item.end_time ) }</Text>
                                    </View>
                                </View>
                                {/* 提示用户扫码 */ }
                                { item.status == 1 &&
                                    <View style={ { float: "right", marginTop: "20px" } }>
                                        <View >
                                            <Button style={ { float: "left", fontSize: "12px", marginRight: "20px" } } className="appoint-card-btn" onClick={ () => {
                                                Taro.navigateTo( {
                                                    url: "../../pages/qrcode/qrcode"
                                                } );
                                            } }>到店使用</Button>
                                            <Button style={ { float: "left", fontSize: "12px", marginRight: "20px" } } className="appoint-card-btn" onClick={ () => {
                                                handle_remain_user_willstart();
                                            } }>订单提醒</Button>
                                            <Button style={ { float: "right", fontSize: "12px" } } className="appoint-card-btn-cancle" onClick={ () => handle_reserver_cancel( item ) }>取消订单</Button>
                                        </View>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                );
            } ) }
        </View>
    );
}

export default connect( ( { appointment, personal } ) =>
    ( { appointment, personal } ) )( CardList );