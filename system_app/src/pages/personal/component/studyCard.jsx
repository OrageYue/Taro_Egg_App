/*
 * @Author: yuncheng
 * @Date: 2020-06-30 09:59:46
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-08-14 15:28:29
 * @FilePath: /cp_taro/src/pages/personal/component/studyCard.jsx
 */
import Taro, { useEffect, useRef } from '@tarojs/taro';
import { connect } from "@tarojs/redux";
import { View, Button } from '@tarojs/components';
import './index.scss';
function StudyCard ( { personal, recharge, dispatch } ) {

    useEffect( () => {
    }, [] );
    /**
     * 进入充值页面
     * @function handle_recharge
     * @param {*} item 当前选择套餐
     */
    const handle_recharge = ( item ) => {
        // 设置当前选择套餐
        dispatch( {
            type: "recharge/handle_set_current_card",
            payload: {
                current_study_card: item
            }
        } );
        Taro.navigateTo( {
            url: "../../pages/recharge/recharge"
        } );
    };
    return (
        <View style={ { paddingLeft: "4%", paddingRight: "4%", marginTop: "10px" } }>
            { personal.study_card_lists.length > 0 && personal.study_card_lists.map( ( item ) => {
                return (
                    <View key={ item.v_id }
                        style={ { minHeight: "80px", marginBottom: "10px", overflow: "hidden", padding: "10px 10px", borderRadius: "0 4px 4px 0", backgroundImage: `url(${ item.c_cover })`, backgroundSize: "100%  100%" } }>
                        {/* 名称区域 */ }
                        <View style={ { overflow: "hidden", marginTop: "10px" } }>
                            <View style={ { float: "left", marginLeft: "10px" } }>
                                <Text style={ { fontSize: "14px", color: "#ffffff" } } >{ item.name }</Text>
                            </View>
                            <View style={ { float: "right", } }>
                                <Button className="radius-btn-small" onClick={ () => handle_recharge( item ) }>充值</Button>
                            </View>
                        </View>
                        {/* 功能区 */ }
                        <View>
                            {/* 剩余时间 */ }
                            <View style={ { float: "left", marginTop: "5%", marginLeft: "10px" } }>
                                <Text style={ { fontSize: "24px", marginRight: "10px", color: "#ffffff" } }>{ item.remain }</Text>
                                { item.type == "hour_card" && <Text style={ { fontSize: "12px", fontWeight: "300", color: "#ffffff" } }>小时</Text> }
                                { item.type == "day_card" && <Text style={ { fontSize: "12px", fontWeight: "300", color: "#ffffff" } }>天</Text> }
                                <Text style={ { fontSize: "12px", fontWeight: "300", color: "#ffffff" } }>可用</Text>
                            </View>
                        </View>
                    </View>
                );
            } ) }
        </View >
    );
}

export default connect( ( { personal, recharge }
) => ( {
    personal, recharge
} ) )( StudyCard );