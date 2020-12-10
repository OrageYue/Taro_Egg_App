
import Taro, { useState } from '@tarojs/taro';
import { View, Textarea, Image, Button, Form } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './u_customService.scss';
import { MAINHOST } from '../../config';
import { AtModal, AtModalContent, AtModalAction } from 'taro-ui';
function U_customService ( { personal } ) {

  const [ is_open, set_is_open ] = useState( false );// is_open 反馈成功状态

  /**
   * 拨打电话函数
   * @function handle_contact_phone
   */
  const handle_contact_phone = () => {
    Taro.makePhoneCall( {
      phoneNumber: '15921670951'
    } );
  };

  /**
   * 提交建议
   * @param {*} e 表单event
   */
  const handle_submit = async ( e ) => {
    const payload = {
      u_id: personal.userInfo.u_id,
      content: e.detail.value.feedback_content
    };
    await Taro.request( {
      url: `${ MAINHOST }/api/v1/feedback`,
      method: "POST",
      data: payload
    } );
    set_is_open( true );
    setTimeout( () => {
      Taro.navigateBack( {} );
    }, 1000 );
  };

  return (
    <View className='u_customService-wrap'>
      {/* 在线客服 */ }
      <View className="u_customService-contact">
        <View style={ { paddingTop: "15px" } }>
          <Text style={ { fontSize: "14px", fontWeight: "500", marginLeft: "3%" } }>您可以直接联系在线客服</Text>
        </View>
        {/* 按钮区域 */ }
        <View className='at-row' style={ { textAlign: "center", marginTop: "15px" } }>
          {/* 打电话 */ }
          <View className='at-col' onClick={ handle_contact_phone }>
            <View>
              <Image style={ { width: "35px", height: "35px" } } src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/%E7%94%B5%E8%AF%9D.png"></Image>
            </View>
            <View>
              <Button className="contact-btn" >电话联系</Button>
            </View>
          </View>
          {/* 客服跳转 */ }
          <View className='at-col'>
            <View>
              <Image style={ { width: "35px", height: "35px" } } src="https://booking-system-resource.oss-cn-beijing.aliyuncs.com/%E5%9C%A8%E7%BA%BF%E5%AE%A2%E6%9C%8D.png"></Image>
            </View>
            <View>
              <Button className="contact-btn" openType="contact">微信客服</Button>
            </View>

          </View>
        </View>
      </View>
      {/* 意见反馈 */ }
      <View className="u_customService-feedback">
        <View style={ { paddingTop: "15px" } }>
          <Text style={ { fontSize: "14px", fontWeight: "500", marginLeft: "3%" } }>问题反馈</Text>
        </View>
        <Form
          onSubmit={ handle_submit }
        >
          <Textarea
            name="feedback_content"
            style={ { background: "#fafafa", width: "90%", margin: "15px 4%", borderRadius: "10px", paddingTop: "10px", paddingLeft: "10px", fontSize: "14px" } }
            placeholder="请提交您的反馈，我们将尽快为您处理"
            placeholderStyle="font-size: 12px; color: #8c8c8c"
          />
          <View style={ { marginRight: "3%", float: "right" } }>
            <Button className="submit-btn" formType="submit">提交</Button>
          </View>
        </Form>
      </View>
      <AtModal isOpened={ is_open }>
        <AtModalContent>
          我们已经收到您的意见，会尽快联系您。
          感谢您的反馈
        </AtModalContent>
        <AtModalAction>
          <Button
            onClick={ () => { set_is_open( false ); Taro.navigateBack( {} ); } }
            style={ { color: "#00D0C7" } }
          >
            确定
          </Button>
        </AtModalAction>
      </AtModal>

    </View>
  );
}
U_customService.config = {
  navigationBarTitleText: '客服'
};
export default connect( ( { personal } ) => ( {
  personal,
} ) )( U_customService );
