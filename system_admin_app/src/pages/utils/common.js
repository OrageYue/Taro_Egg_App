/*
 * @Author: yuncheng
 * @Date: 2020-07-11 21:31:16
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-11 21:31:31
 * @FilePath: /admin_taro_app/src/pages/utils/common.js
 */ 
/*
 * @Author: yuncheng
 * @Date: 2020-05-29 09:02:46
 * @LastEditors: yuncheng
 * @LastEditTime: 2020-07-09 10:28:54
 * @FilePath: /cp_taro/src/utils/common.js
 */ 
/** 时间格式的转换 */
export const formatTime = time => {
 `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`
}

// 星期转大写
export  const handle_get_date = ( aa ) => {
    var date1 = new Date();
    var date2 = new Date( date1 );
    date2.setDate( date1.getDate() + aa );
    // 获取当前日期
    var time2 = date2.getFullYear() + "." + ( date2.getMonth() + 1 ) + "." + date2.getDate();
    // 获取当前星期
    let nowDay = '';
    switch ( date2.getDay() )
    {
      case 0:
        nowDay = '日';
        break;
      case 1:
        nowDay = '一';
        break;
      case 2:
        nowDay = '二';
        break;
      case 3:
        nowDay = '三';
        break;
      case 4:
        nowDay = '四';
        break;
      case 5:
        nowDay = '五';
        break;
      case 6:
        nowDay = '六';
        break;
    }
    // 组合数据对象{日期，星期}
    let dateObj = {
      date: time2,
      day: nowDay,
      short_date: time2.substring( 5, time2.length ),
      time_standard: date2.toLocaleDateString()
    };
    return dateObj;
};
  
// 返回时长卡边框颜色
export const handle_study_card_color = ( type ) => {
  let color = ""
  let background = ""
  let font_color = ''
  let background_image = ""
    //根据类型判别
    switch ( type )
    {
        case 'hour_card':
        color = "#40A9FF";
        background = "#6DD8D940";
        font_color = "#6DD8D9";
        background_image = "url('https://booking-system-resource.oss-cn-beijing.aliyuncs.com/%E8%93%9D%E8%89%B2%E5%8D%A1%E7%89%87%E8%83%8C%E6%99%AF.png')"
            break;
        case 'day_card':
        color = "#FF9C6E";
        background = "#9486F150";
        font_color = "#9486F1";
        background_image =  "url('https://booking-system-resource.oss-cn-beijing.aliyuncs.com/%E9%BB%84%E8%89%B2%E5%8D%A1%E7%89%87%E8%83%8C%E6%99%AF.png')"
            break;
        case 'mouth_card':
        color = "#52C41A";
        background = "#9486F150";
        font_color = "#6DD8D9";
        background_image = "url('https://booking-system-resource.oss-cn-beijing.aliyuncs.com/%E7%BA%A2%E8%89%B2%E5%8D%A1%E7%89%87%E8%83%8C%E6%99%AF.png')"
            break;
        default:
            break;
    }
   
  return {
    color: `3px ${ color } solid`,
    background: background,
    font_color: font_color,
     background_image: background_image
  }
}

export const date_stimap = (time) => {
  let date = new Date(parseInt(time) );
  let y = date.getFullYear(); 
  let m = date.getMonth() + 1; 
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate(); 
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes(); 
  let second = date.getSeconds(); 
  minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second; 
  // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second) 
  let dates = y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
  return dates
}
export var globalData = {} // 全局公共变量