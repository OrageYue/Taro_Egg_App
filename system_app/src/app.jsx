import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import { globalData } from "./utils/common";
import Index from './pages/index';
import dva from './utils/dva';
import models from './models/index';
import 'taro-ui/dist/style/index.scss';
import "@tarojs/async-await";
import './app.css';
import './style.scss';

const dvaApp = dva.createApp( {
  initialState: {},
  models: models,
} );
const store = dvaApp.getStore();

//  getStore是一个函数！！！要执行！！！


class App extends Component {

  config = {
    pages: [
      // 一级页面
      // |-----首页
      'pages/main/main',
      // |-----预定管理
      'pages/appointment/appointment',
      // |-----活动预定
      'pages/activity/activity',
      // |-----个人中心
      'pages/personal/personal',
      // // 二级页面
      // |-----提交预约
      'pages/submitAppointment/submitAppointment',
      // 充值
      'pages/recharge/recharge',
      // |-----学习排行
      'pages/u_ranking/u_ranking',
      // |-----我的信息
      'pages/u_infomation/u_infomation',
      // |-----推广中心
      'pages/u_extension/u_extension',
      // |-----关于我们
      'pages/u_about/u_about',
      // |-----帮助客服
      'pages/u_customService/u_customService',
      // |-----充值记录
      'pages/rechargeRecord/rechargeRecord',
      // |-----用户二维码
      'pages/qrcode/qrcode'
    ],
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于地图数据获取"
      },
    },
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      backgroundColor: "#ffffff",
      color: '#BFBFBF',
      selectedColor: '#00D0C7',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/main/main',
          text: '首页',
          iconPath: 'assets/images/main_unselected.png',
          selectedIconPath: 'assets/images/main_selected.png'
        },
        {
          pagePath: 'pages/appointment/appointment',
          text: '我的预约',
          iconPath: 'assets/images/appoint_unselected.png',
          selectedIconPath: 'assets/images/appoint_selected.png'
        },
        {
          pagePath: 'pages/activity/activity',
          text: "活动预定",
          iconPath: 'assets/images/activity_unselected.png',
          selectedIconPath: 'assets/images/activity_selected.png'
        },
        {
          pagePath: 'pages/personal/personal',
          text: '我的',
          iconPath: 'assets/images/user_unselected.png',
          selectedIconPath: 'assets/images/user_selected.png',
        },
      ]
    },

  };
  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   * @memberof App
   */
  async componentDidMount () {
    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo;
    const query = this.$router.params.query;
    !globalData.extraData && ( globalData.extraData = {} );
    if ( referrerInfo && referrerInfo.extraData )
    {
      globalData.extraData = referrerInfo.extraData;
    }
    if ( query )
    {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }

    // // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && ( globalData.systemInfo = sys );

    // console.log( globalData );
  }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={ store }>
        <Index />
      </Provider>
    );
  }
}

Taro.render( <App />, document.getElementById( 'app' ) );
