import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import '../personal.scss';
import { ALIOSS } from '../../../config/index';
function ActionBtn ( props ) {

    const btnData = [
        {
            actionType: 'ranking',
            actionSrc: '%E6%8E%92%E8%A1%8C%E6%A6%9C.png',
            actionTitle: '学习排行'
        },
        {
            actionType: 'info',
            actionSrc: '%E8%B5%84%E6%96%99.png',
            actionTitle: '我的信息'
        },
        {
            actionType: 'extension',
            actionSrc: '%E6%8E%A8%E5%B9%BF.png',
            actionTitle: '数据中心'
        },
        {
            actionType: 'about',
            actionSrc: '%E5%85%B3%E4%BA%8E.png',
            actionTitle: '关于我们'
        },
        {
            actionType: 'customService',
            actionSrc: '%E5%AE%A2%E6%9C%8D.png',
            actionTitle: '联系客服'
        }
    ];
    return (
        <View style={ { width: "100%" } }>
            <View style={ { marginTop: "20px", paddingBottom: "10px", overflow: "hidden", } }>
                <View className='at-row' >
                    { btnData.map( item => {
                        return (
                            <View style={ { float: "left", marginLeft: "7%", textAlign: "center" } } onClick={ () => props.handle_select_function( `${ item.actionType }` ) } >
                                <View >
                                    <Image src={ `${ ALIOSS }${ item.actionSrc }` } style={ { width: "25px", height: "25px" } }></Image>
                                </View>
                                <View>
                                    <Text style={ { fontSize: "12px", color: "#ffffff" } }>{ item.actionTitle }</Text>
                                </View>
                            </View>
                        );
                    } ) }
                </View>
            </View>
        </View>
    );
}

export default ActionBtn;