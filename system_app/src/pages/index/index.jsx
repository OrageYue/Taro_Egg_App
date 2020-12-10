import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.less';


class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps ( nextProps ) {
    // console.log( this.props, nextProps );
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handlePushFile = () => {
    Taro.navigateTo( { url: "../../pages/pushFile/pushFile" } );
  };
  render () {
    return (
      <View className='index'>

      </View>
    );
  }
}

export default Index;
