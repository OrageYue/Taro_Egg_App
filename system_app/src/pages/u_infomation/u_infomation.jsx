
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Form, Switch, Button, Input, Textarea } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './u_infomation.scss';
import { MAINHOST } from '../../config';
import { AtAvatar } from 'taro-ui';

function U_infomation ( { u_infomation, personal, dispatch } ) {

  /**
   * 提交信息
   * @function handle_submit
   * @param {*} e 表单event
   */
  const handle_submit = async ( e ) => {
    const res = await Taro.request( {
      url: `${ MAINHOST }/api/v1/users/${ personal.userInfo.u_id }`,
      method: "PUT",
      data: e.target.value,
    } );
    if ( res.data.code == 1 )
    {
      Taro.showToast( {
        title: "修改成功",
        icon: 'success',
      } );
      setTimeout( () => {
        Taro.switchTab( {
          url: "../../pages/personal/personal"
        } );
      }, 1500 );
    }
  };
  /**
   * 获取手机号
   * @function getphonenumber
   * @param {*} e 
   */
  const getphonenumber = ( e ) => {
    Taro.login( {
      success: function ( res ) {
        if ( res.code )
        {
          dispatch( {
            type: "u_infomation/get_user_phone",
            payload: {
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
              u_id: personal.userInfo.u_id,
              code: res.code
            }
          } );
        }
      }
    } );
  };
  return (
    <View className='u_infomation-wrap'>
      {/* 头像昵称展示 */ }
      <View className="info-avatar">
        {/* 头像 */ }
        <View className="user-avatar">
          <AtAvatar circle size="large" image={ personal.userInfo.avatar_src || "" }></AtAvatar>
        </View>
        {/* 昵称 */ }
        <View className="user-name">
          <Text style={ { fontSize: "16px" } }>{ personal.userInfo.name || "2222" }</Text>
        </View>
      </View>
      {/* 表单 */ }
      <View style={ { paddingTop: "10px", margin: "0 10px" } }>
        <Form onSubmit={ handle_submit }>
          {/* 真实姓名 */ }
          <View style={ { background: "#ffffff", borderRadius: "10px", padding: "10px 0" } }>
            <View className="info-form-item">
              <View style={ { float: "left" } }>
                <Text className="item-label">姓名</Text>
              </View>
              <View style={ { float: "right" } }>
                <Input name="real_name" style={ { color: "#595959", fontSize: "16px" } } type='text' placeholderStyle="font-size:14px" placeholder='真实姓名' value={ personal.userInfo.real_name || "" } />
              </View>
            </View>
            {/* 手机号码 */ }
            <View className="info-form-item">
              <View style={ { float: "left" } }>
                <Text className="item-label">手机号码</Text>
              </View>
              { personal.userInfo.phone ?
                <View style={ { float: "right" } }>
                  <Input name="phone" type='text' style={ { color: "#595959", fontSize: "16px" } } placeholderStyle="font-size:14px" placeholder='手机号' value={ personal.userInfo.phone || "" } />
                </View>
                :
                <View style={ { float: "right" } }>
                  { u_infomation.userPhoneNumber ?
                    <Input name="phone" type='text' style={ { color: "#595959", fontSize: "16px" } } placeholderStyle="font-size:14px" placeholder='手机号' value={ u_infomation.userPhoneNumber || "" } />
                    :
                    <Button className="phone-number-btn" openType="getPhoneNumber" onGetPhoneNumber={ getphonenumber } style={ { fontSize: "10px" } }  >获取手机号</Button>
                  }
                </View>
              }
            </View>
            {/* 群体 */ }
            <View className="info-form-item">
              <View style={ { float: "left" } }>
                <Text className="item-label">群体</Text>
              </View>
              <View style={ { float: "right" } }>
                <Input name="group" style={ { color: "#595959", fontSize: "16px" } } placeholderStyle="font-size:14px" type='text' placeholder='例如：学生' value={ personal.userInfo.group || "" } />
              </View>
            </View>
            {/* 了解渠道 */ }
            <View className="info-form-item">
              <View style={ { float: "left", } }>
                <Text className="item-label">了解渠道</Text>
              </View>
              <View style={ { float: "right" } }>
                <Input name="understand_channel" style={ { color: "#595959", fontSize: "16px" } } placeholderStyle="font-size:14px" type='text' placeholder='例如：互联网' value={ personal.userInfo.understand_channel || "" } />
              </View>
            </View>
            {/* 自习目的 */ }
            <View className="info-form-item">
              <View style={ { float: "left" } }>
                <Text className="item-label">自习目的</Text>
              </View>
              <View style={ { float: "right" } }>
                <Input name="target" type='text' style={ { color: "#595959", fontSize: "16px" } } placeholderStyle="font-size:14px" placeholder='例如：考试' value={ personal.userInfo.target || "" } />
              </View>
            </View>
          </View>
          {/* 备考计划 */ }
          <View style={ { background: "#ffffff", borderRadius: "10px", padding: "5px 10px", marginTop: "10px" } }>
            <View style={ { overflow: "hidden", marginBottom: "30px", } }>
              <View style={ { float: "left", marginBottom: "10px" } }>
                <Text className="item-label">自习目的</Text>
              </View>
              <Textarea
                placeholderStyle="font-size:12px"
                style={ { color: "#595959", background: "#fafafa", width: "100%", borderRadius: "10px", paddingTop: "10px", paddingLeft: "10px", fontSize: "16px", marginRight: "10px" } }
                name="plan"
                placeholder="请输入您的备考计划"
                value={ personal.userInfo.plan || "" } />
            </View>
          </View>
          <View className="info-form-item">
            <Button className="info-form-btn" formType="submit">提交</Button>
          </View>
        </Form>
      </View >
    </View >
  );
}
U_infomation.config = {
  navigationBarTitleText: '我的信息'
};
export default connect( ( { u_infomation, personal } ) => ( {
  u_infomation, personal
} ) )( U_infomation );
