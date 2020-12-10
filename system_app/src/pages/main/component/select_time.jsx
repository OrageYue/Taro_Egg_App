
import Taro from '@tarojs/taro';
import { View, Image, Button, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import exchange from '../../../assets/images/exchange.png';
import './index.scss';
import { AtDivider } from 'taro-ui';

function SelectTime ( home ) {

    /**
     * 开始时间选择
     * @function handle_start_select_time
     * @param {*} e 事件参数
     */
    const handle_start_select_time = ( e ) => {
        home.dispatch( {
            type: "home/select_start_time",
            payload: {
                start_time: home.business_hours[ e.detail.value ]
            }
        } );

    };

    /**
     * 结束时间选择
     * @function handle_end_select_time
     * @param {*} e  事件参数
     */
    const handle_end_select_time = ( e ) => {
        home.dispatch( {
            type: "home/select_end_time",
            payload: {
                end_time: home.business_hours[ e.detail.value ]
            }
        } );
    };

    /**
     * 提交预定
     * @function handle_submit_appoint
     */
    const handle_submit_appoint = () => {
        const start = home.start_time;
        const end = home.end_time;

        let time_picker = [];
        let can_uesr_appoint = false;
        // 处理小数点前面
        const pre_diff = parseFloat( end ) - parseFloat( start );
        console.log( pre_diff );
        const back_start = start.split( ':' );
        const back_end = end.split( ':' );
        const back_diff = back_end[ 1 ] - back_start[ 1 ];
        time_picker[ 0 ] = pre_diff;
        time_picker[ 1 ] = back_diff;

        if ( time_picker[ 0 ] == 1 )
        {

            if ( time_picker[ 1 ] >= -30 )
            {
                //预约时间后部差大于-30
                can_uesr_appoint = true;
            }
            else
            {
                //预约时间后部小于-30
                can_uesr_appoint = false;
            }
        } else if ( time_picker[ 0 ] > 1 )
        {
            can_uesr_appoint = true;
        }
        else if ( time_picker[ 0 ] < 1 )
        {

            if ( back_diff >= 30 )
            {
                // 在一小时内且分钟大于30min
                can_uesr_appoint = true;
            }
        }

        if ( !can_uesr_appoint )
        {
            // 不得小于两小时
            Taro.showModal( {
                title: '提示',
                content: '最少预定半小时',
                showCancel: false,
                confirmColor: "#69C0FF",
                confirmText: "知道了"
            } );
        }
        else 
        {
            Taro.navigateTo( {
                url: "../../pages/submitAppointment/submitAppointment"
            } );
        }
    };

    return (
        <View className="main-appoint-card">
            <View style={ { paddingLeft: "5%" } }>
                <View style={ { marginTop: "10%" } } >
                    <View style={ { float: "left", paddingLeft: "10px" } }>
                        <Picker range={ home.business_hours } onChange={ handle_start_select_time }>
                            <View className='picker' style={ { fontSize: "20px", color: "#595959" } }>
                                { home.start_time }
                            </View>
                        </Picker>
                    </View>
                    <View  >
                        <Image src={ exchange } style={ { float: "left", width: "20px", height: "20px", marginLeft: "25%" } }></Image>
                    </View>
                    <View style={ { float: "left", marginLeft: "25%" } }>
                        <Picker range={ home.business_hours } onChange={ handle_end_select_time }>
                            <View className='picker' style={ { fontSize: "20px", color: "#595959" } }>
                                { home.end_time }
                            </View>
                        </Picker>
                    </View>
                </View>
                <View className="appoint-card-line">
                    <AtDivider lineColor="#fafafa" />
                </View>
                <View >
                    <Button className="appoint-card-btn" onClick={ handle_submit_appoint }>立即预定</Button>
                </View>

            </View>
        </View>
    );
}

export default connect( ( { home } ) => ( {
    ...home,
} ) )( SelectTime );
