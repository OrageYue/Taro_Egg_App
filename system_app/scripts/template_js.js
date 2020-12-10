/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}

//页面模板
const indexTep = `
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import './${dirName}.scss'
// import { } from '../../components'

function ${capPirName} () {

    return (
      <View className='${dirName}-wrap'>
          
      </View>
    )
}
${capPirName}.config={
     navigationBarTitleText: '标题自定义'
}
export default  connect(({ ${dirName} }) => ({
    ...${dirName},
 }))(${capPirName})
`

// scss文件模版
const scssTep = `
${dirName}-wrap {
    width: 100%;
    min-height: 100vh;
}
`

// config 接口地址配置模板
const configTep = `
export default {
  test: '/wechat/perfect-info', //xxx接口
}
`
// 接口请求模板
const serviceTep = `
import Api from '../../utils/request'

export const testApi = data => Api.test(
  data
)
`

//model模板

const modelTep = `
// import Taro from '@tarojs/taro';
import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {
  },

  effects: {},

  reducers: {}

}
`



fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.jsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('config.js', configTep); // config
fs.writeFileSync('service.js', serviceTep); // service
fs.writeFileSync('model.js', modelTep); // model
process.exit(0);