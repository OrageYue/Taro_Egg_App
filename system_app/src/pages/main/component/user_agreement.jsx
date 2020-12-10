import Taro, { useState } from '@tarojs/taro';
import { View, Checkbox, CheckboxGroup, Button } from '@tarojs/components';
import { AtModalHeader, AtModalContent, AtModal } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { MAINHOST } from '../../../config/index';
import './agreement.scss';
function UserAgreement ( props ) {

    const [ is_check, set_is_check ] = useState( false ); //is_check 是否同意

    /**
     * 用户是否勾选操作
     * @function isUserAgree
     * @param {*} e check事件参数
     */
    const isUserAgree = ( e ) => {
        const status = e.detail.value[ 0 ] ? true : false;
        set_is_check( status );
    };
    /**
     * 用户同意协议操作
     * @function userAgreeAction
     */
    const userAgreeAction = async () => {
        const res = await Taro.request( {
            url: `${ MAINHOST }/api/v1/useragreeRecord`,
            method: "POST",
            data: {
                u_id: props.personal.userInfo.u_id,
                u_name: props.personal.userInfo.name,
                status: true
            }
        } );
        if ( res.data.code == 1 )
        {
            props.dispatch( {
                type: "personal/set_open_user_agreement",
                payload: {
                    is_open_agreement: false
                }
            } );
        }
    };

    return (
        <AtModal isOpened={ props.personal.is_open_agreement } closeOnClickOverlay={ false }>
            <AtModalHeader>学习公约</AtModalHeader>
            <AtModalContent>
                {/* 内容 */ }
                <View className='at-article__p' style={ { whiteSpace: "pre-wrap" } }>
                    { props.agreement_contnet }
                </View>
                {/* 操作区 */ }
                <View style={ { marginTop: "40px" } }>
                    <CheckboxGroup onChange={ isUserAgree }>
                        <Checkbox value='选中' checked={ is_check }>
                            我同意以上内容
                    </Checkbox>
                    </CheckboxGroup>
                    <Button className="agreement-btn" style={ { marginTop: "20px" } } onClick={ userAgreeAction } disabled={ !is_check }>提交</Button>
                </View>
            </AtModalContent>

        </AtModal>
    );
}

export default connect( ( {
    personal
} ) => ( {
    personal
} ) )( UserAgreement );