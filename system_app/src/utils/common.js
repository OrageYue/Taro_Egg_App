/**
 * 时间格式转换函数
 * @param {*} time  时间
 */
export const formatTime = time => {
 `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`
}

/**
 * 大写星期+日期 组合输出
 * @param {*} aa  第几天参数
 */
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

/**
 * 时间戳转换日期
 * @param {*} time  时间参数
 */
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
  let dates = y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
  return dates
}

var chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]

/**
 * 生成随机字符串
 * @param {*} n 字符串位数
 */
export const generateMixed = ( n ) => {
  var res = ''
  for ( let i = 0; i < n; i++ )
  {
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
  }
  return res
}

export var globalData = {} // 全局公共变量