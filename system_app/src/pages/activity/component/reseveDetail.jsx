import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './reseveDetail.scss';

function ReserveDetail ( props ) {

    return (
        <View className="reserve-modal" >
            {/* 内容 */ }
            <View className="reserve-modal-card">
                <View className="reserve-cancel" onClick={ () => props.handle_resrver_cancel() }>
                    <Image className="reserve-cancel-icon" src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/cancel-icon.png" ></Image>
                </View>
                {/* 头部title */ }
                <View className="reserve-card-title-info" >
                    <Text className="top-title" >预定信息</Text>
                </View>
                {/* 活动基础信息 */ }
                <View className="reserve-card-info">
                    <View className="activity-info-item">
                        <Text className="activity-info-text-left">活动名称：</Text>
                        <Text className="activity-info-text-right">{ props.current_activity.a_name }</Text>
                    </View>
                    <View className="activity-info-item">
                        <Text className="activity-info-text-left">开始时间：</Text>
                        <Text className="activity-info-text-right">{ props.current_activity.activity_time }</Text>
                    </View>
                    <View className="activity-info-item">
                        <Text className="activity-info-text-left">活动时长：</Text>
                        <Text className="activity-info-text-right">{ props.current_activity.total_time }</Text>
                    </View>
                    <View className="activity-info-item">
                        <Text className="activity-info-text-left">活动地址：</Text>
                        <Text className="activity-info-text-right">{ props.current_activity.activity_place }</Text>
                    </View>
                    {/* 费用确认信息 */ }
                    <View className="activity-price-check">

                        <Text className="activity-price-check-left">小时卡支付</Text>
                        { props.userInfo.is_ifinite_user ?

                            <Text className="activity-price-check-left" style={ { fontSize: "14px", marginTop: "2px" } }>（无限卡会员{ props.price_rules.ifinite_rule }折）</Text>

                            :

                            <Text className="activity-price-check-left">（普通会员）</Text>

                        }
                        <Text className="activity-price-check-right" >小时</Text>
                        {/* 计算价格（price*折扣） */ }
                        { props.userInfo.is_ifinite_user ?
                            <View className="activity-price-check-right">
                                <View> <Text className="activity-price-check-right-top" style={ { marginRight: "10px" } }>{ ( props.current_activity.price * props.price_rules.ifinite_rule * 0.1 ).toFixed( 2 ) }</Text></View>
                                <View> <Text className="activity-price-check-right-bottom" style={ { marginRight: "10px", fontSize: "14px" } }>{ props.current_activity.price.toFixed( 2 ) }</Text></View>
                            </View>
                            :
                            <Text className="activity-price-check-right" style={ { marginRight: "10px" } }>{ ( props.current_activity.price * props.price_rules.normal_rule * 0.1 ).toFixed( 2 ) }</Text>
                        }

                    </View>

                </View>
                {/* 确定按钮 */ }

                <View className="activity-btn" onClick={ () => props.handle_reserve_submit() }>
                    <Text className="activity-btn-text" >立即预定</Text>
                </View>
            </View>
        </View>
    );
}

export default ReserveDetail;