import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import './card.scss';
function ActivityCard ( props ) {
    return (
        <View style={ { marginTop: "20px", minHeight: "100vh", } }>
            { props.activities.length > 0 ?
                <View>
                    {
                        props.activities.map( item => {
                            return (
                                <View key={ item._id } style={ { marginTop: "20px" } }>
                                    {/* 卡片 */ }
                                    {/* 如果用户取消类型，添加遮罩 */ }
                                    <View className="card-wrap"  >
                                        {/* 图片 */ }
                                        <View className="card-cover" style={ { backgroundImage: `url(${ item.activity_cover })`, backgroundSize: "100% 100%", } }></View>
                                        {/* 内容 */ }
                                        <View className="card-content">
                                            {/* 活动标题 */ }
                                            <View style={ { overflow: "hidden" } }>
                                                <View className="card-title" style={ { float: "left" } }>
                                                    { item.a_name }
                                                </View>
                                                <View className="card-price" style={ { float: "right", } }>
                                                    <View >
                                                        <Text style={ { fontSize: "12px" } }> 时长：</Text>
                                                        <Text style={ { color: "#E50E0E", marginRight: "5px" } }>
                                                            { item.total_time }
                                                        </Text>
                                                        <Text style={ { fontSize: "12px" } }> 小时</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {/* 底部 */ }

                                            <View style={ { overflow: "hidden" } } className="card-bottom">
                                                <View style={ { float: "left" } }>
                                                    <View className="card-title-time" >
                                                        { item.activity_time }
                                                    </View>
                                                    <View className="card-title-place" >
                                                        { item.activity_place }
                                                    </View>
                                                </View>
                                                {/* 当前操作类型 */ }
                                                { props.is_user_reserve ?
                                                    <View>
                                                        {/* 取消的订单 */ }
                                                        { item.status == "cancel" &&
                                                            <View>
                                                                <View style={ { float: "right", marginLeft: "5px", color: "#FF4D4F" } }>
                                                                    已取消
                                                </View>
                                                            </View>
                                                        }
                                                        {/* 正常的订单 */ }
                                                        { item.status == "Effective" &&
                                                            <View>
                                                                <View style={ { float: "right", marginLeft: "5px" } }>
                                                                    <Button className="card-btn-cancel" onClick={ () => {
                                                                        Taro.showModal( {
                                                                            title: "提示",
                                                                            content: "确定取消吗？",

                                                                            success: function ( res ) {
                                                                                if ( res.confirm )
                                                                                {
                                                                                    props.post_cancel( item );
                                                                                } else if ( res.cancel )
                                                                                {
                                                                                    console.log( '用户点击取消' );
                                                                                }
                                                                            }
                                                                        } );
                                                                    } }>取消预定</Button>
                                                                </View>
                                                                <View style={ { float: "right" } }>
                                                                    <Button className="card-btn" onClick={ () => {
                                                                        Taro.navigateTo( {
                                                                            url: "../../pages/qrcode/qrcode"
                                                                        } );
                                                                    } }>去扫码</Button>
                                                                </View>
                                                            </View>
                                                        }

                                                    </View>
                                                    :
                                                    <View style={ { float: "right" } }>
                                                        <Button className="card-btn" onClick={ () => props.handle_resrver_activity( item ) }>立即预定</Button>
                                                    </View> }

                                            </View>

                                        </View>
                                    </View>
                                </View>
                            );
                        } )
                    }
                </View>
                :
                <View>
                </View> }

        </View>
    );
}

export default ActivityCard;