//无限卡组件
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import './infinitecard.scss';
function InfiniteCard ( props ) {
    return (
        <View>
            {/* card区域 */ }
            <View className="infinite-card">
                <View style={ { overflow: "hidden" } }>
                    <View style={ { float: "left", paddingLeft: "10px", paddingTop: "10px" } }>
                        <Text style={ { fontSize: "18px", color: "#94661c", fontWeight: "500" } }>
                            { props.current_study_card.name }
                        </Text>
                    </View>
                </View>
                <View style={ { overflow: "hidden", marginTop: "90px" } }>
                    <View style={ { float: "left", color: "#94661c", paddingLeft: "10px" } }>
                        <Text style={ { marginLeft: "5px", fontSize: "18px" } }>{ props.current_study_card.remain }</Text>
                        <Text style={ { marginLeft: "5px", fontSize: "12px" } }> 天</Text>
                        <Text style={ { fontSize: "12px" } }>可用·</Text>
                        <Text style={ { marginLeft: "5px", fontSize: "12px" } }>尊享会员中</Text>
                    </View>
                </View>

            </View>
            <View className="recharge-detail" >
                <View style={ { float: "right" } } onClick={ () => {
                    Taro.navigateTo( {
                        url: "../../pages/rechargeRecord/rechargeRecord"
                    } );
                } }>
                    明细 { `>` }
                </View>
            </View>
            {/* 套餐选择区域 */ }
            <View className="recharge-setmeal">
                <View style={ { paddingTop: "15px", marginBottom: "20px" } }>
                    {/* <Text>充值套餐选择</Text> */ }
                </View>
                {/* 套餐 */ }
                { props.current_study_card.package && props.current_study_card.package.map( item => {
                    return (
                        <View key={ item.v_id } style={ { overflow: "hidden", padding: "20px 0", color: props.current_package.id == item.id ? "#FFE1B1" : "#ffffff" } } onClick={ () => props.handle_select_package( item ) }>
                            <View style={ { float: "left", marginLeft: "20px" } }>
                                <Text>{ item.name }</Text>
                            </View>
                            <View style={ { float: "right", marginRight: "30px" } }>
                                <Text style={ { color: props.current_package.id == item.id ? "#FFE1B1" : "#ffffff", fontWeight: "500", fontSize: "18px" } }>{ item.p_amount && item.p_amount.toFixed( 2 ) } </Text>
                                <Text style={ { color: props.current_package.id == item.id ? "#FFE1B1" : "#e8e8e8", fontWeight: "400", fontSize: "12px", marginLeft: "5px" } }>元 </Text>
                            </View>
                        </View>
                    );
                } ) }

            </View>;

            {/* 待支付区域 */ }
            <View className="recharge-pay">
                <View style={ { paddingTop: "15px" } }>
                    <Text>待支付</Text>
                    <View style={ { float: "right", } }>
                        <Text style={ { fontSize: "24px", marginLeft: "10px", fontSize: "20px" } }>   { props.current_package.p_amount && props.current_package.p_amount.toFixed( 2 ) }</Text>

                        <Text style={ { marginLeft: "5px", fontSize: "20px" } }>元</Text>
                    </View>

                </View>
            </View>;
            {/* 按钮区域 */ }
            <View style={ { marginTop: "10px", width: "80%", paddingLeft: "10%" } }>
                <Button className="recharge-btn" onClick={ props.handle_submit_recharge }>立即购买</Button>
            </View>
        </View>
    );
}

export default InfiniteCard;